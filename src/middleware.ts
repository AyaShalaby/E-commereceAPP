import { NextRequest, NextResponse } from "next/server";

const protectedPages = ['/cart', '/wishlist','/allorders'];
const authPages = ['/login', '/register'];

export default async function middleware(request: NextRequest) {
     const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;


     
     if (protectedPages.includes(request.nextUrl.pathname)) {
        if (token) {
          return NextResponse.next();
        }else{
            let redirectUrl = new URL('/login' , process.env.NEXTAUTH_URL)
            redirectUrl.searchParams.set('callback-url', request.nextUrl.pathname)

            return NextResponse.redirect(redirectUrl)
        }
     }

      if (authPages.includes(request.nextUrl.pathname)) {
        if (!token) {
          return NextResponse.next();
        }else{
           const redirectUrl = new URL('/' , process.env.NEXTAUTH_URL)
            return NextResponse.redirect(redirectUrl)
        }
     }

     return NextResponse.next();
}
/**
 import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ['/cart', '/profile','/wishlist','/allorders'];
const authPages = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
     const token = await getToken({req});
     console.log(token);
     
     if (protectedPages.includes(req.nextUrl.pathname)) {
        if (token) {
          return NextResponse.next();
        }else{
            const redirectUrl = new URL('/login' , process.env.NEXTAUTH_URL)
            return NextResponse.redirect(redirectUrl)
        }
     }

      if (authPages.includes(req.nextUrl.pathname)) {
        if (!token) {
          return NextResponse.next();
        }else{
            const redirectUrl = new URL('/' , process.env.NEXTAUTH_URL)
            return NextResponse.redirect(redirectUrl)
        }
     }

     return NextResponse.next();
}
 */