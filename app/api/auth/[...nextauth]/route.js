import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/lib/zod"
//import { getUserFromDb } from "@/utils/db";



const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT, 10), // The 10 is to make it a Base10 integer

});




export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    adapter: PostgresAdapter(pool),
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days in seconds (this value is also the default)
      },
      pages: {
        signIn: "/login"},
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }), GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
     //   allowDangerousEmailAccountLinking: true // Allow automatic linking of users table to accounts table in database - not dangerous when used with OAuth providers that already perform email verification (like Google)

      }),
      DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET
      }),
      Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            const { email, password } = credentials;
    
            // Query to find user by email
            const { rows } = await pool.query(
              "SELECT * FROM users WHERE email = $1",
              [email]
            );
    
            let user = rows[0];
    
            if (!user) {
              // If user does not exist, create a new one
              const insertQuery = `
                INSERT INTO users (email, password, name)
                VALUES ($1, $2, $3)
                RETURNING *;
              `;
              const result = await pool.query(insertQuery, [
                email,
                password,
                email.split("@")[0], // Example: Default name is email prefix
              ]);
              user = result.rows[0];
}else {
    // If user exists, verify the password
    const isPasswordValid = password==user.password;
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
  }

  // Return user object
  return { id: user.id, email: user.email, name: user.name };}})
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session?.name !== token.name) {
        token.name = session.name;

        try {
          await setName(token.name);
        } catch (error) {
          console.error("Failed to set user name:", error);
        }
      }

      if (user) {
       // await clearStaleTokens(); // Clear up any stale verification tokens from the database after a successful sign in
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
});

export const { GET, POST } = handlers;