// app/api/test/route.js
export function GET() {
    return Response.json({
      google_id: process.env.AUTH_GOOGLE_ID,
      google_secret: process.env.AUTH_GOOGLE_SECRET,
    });
  }
  