import { useSession, signIn, signOut } from "next-auth/react";
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/Waqti') && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/Waqti/:path*'],
};