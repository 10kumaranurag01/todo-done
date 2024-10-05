import { NextResponse } from 'next/server'

export function middleware(request) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/auth/login' || path === '/auth/register';

    const token = request.cookies.get('token')?.value;

//prevent authenticated users to access public routes
    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

}
 
// "Matching Paths"
export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/auth/login',
    '/auth/register',
  ],
}