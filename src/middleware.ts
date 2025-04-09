import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { signIn } from 'next-auth/react'

export async function middleware(req: NextRequest) {
  console.log('Middleware triggered for:', req.nextUrl.pathname)
  // Lấy token từ cookie
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Lấy hostname và subdomain
  const hostname = req.headers.get('host') || ''
  const subdomain = hostname.split('.')[0]
  const url = req.nextUrl.clone()
  // const isAuthenticated = !!token
  const admin = process.env.NEXT_ENV === 'dev' ? 'admin-dev' : 'admin'
  const merchant = process.env.NEXT_ENV === 'dev' ? 'merchant-dev' : 'merchant'

  // Chuyển hướng nếu chưa đăng nhập
  // if (!isAuthenticated) {
  //   console.log('User not authenticated, redirecting to login')
  //   url.pathname = '/auth/login'
  //   return NextResponse.redirect(url)
  // }

  // Kiểm tra phân quyền dựa trên subdomain
  if (subdomain === admin) {
    console.log(`Admin subdomain detected, user role: ${token?.role}`)
    if (req.nextUrl.pathname === '/') {
      console.log('Redirecting to admin home')
      url.pathname = '/home'
      return NextResponse.redirect(url)
    }
    // Chỉ cho phép role admin truy cập subdomain admin
    if (token?.role !== 'admin') {
      console.log('User not admin, redirecting to unauthorized')
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }

    // Chuyển hướng đến trang admin

    // Đảm bảo các đường dẫn trên subdomain admin đều được map đến /admin/...
    if (!req.nextUrl.pathname.startsWith('/admin') && !req.nextUrl.pathname.endsWith('/login')) {
      console.log(`Rewriting ${req.nextUrl.pathname} to /admin${req.nextUrl.pathname}`)
      url.pathname = `/admin${req.nextUrl.pathname}`
      return NextResponse.rewrite(url) // Rewrite nội bộ
    }
  } else if (subdomain === merchant) {
    console.log(`Merchant subdomain detected, user role: ${token?.role}`)
    if (req.nextUrl.pathname === '/') {
      console.log('Redirecting to merchant home')
      url.pathname = '/home'
      return NextResponse.redirect(url)
    }
    // Chỉ cho phép role merchant truy cập subdomain merchant
    if (!(token?.role === 'merchant' || token?.role === 'admin')) {
      console.log('User not merchant, redirecting to unauthorized')
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }

    // Chuyển hướng đến trang merchant

    // Nếu URL không bắt đầu bằng /merchant, thì để rewrites xử lý
    if (!req.nextUrl.pathname.startsWith('/merchant') && !req.nextUrl.pathname.endsWith('/login')) {
      console.log(`Rewriting ${req.nextUrl.pathname} to /merchant${req.nextUrl.pathname}`)
      url.pathname = `/merchant${req.nextUrl.pathname}`
      return NextResponse.rewrite(url) // Rewrite nội bộ
    }
  }

  // Ngăn chặn truy cập trực tiếp vào các thư mục admin và merchant từ domain chính
  if (!['admin', 'merchant'].includes(subdomain)) {
    if (req.nextUrl.pathname.startsWith('/admin')) {
      console.log('Redirecting admin path to admin subdomain')
      url.hostname = `admin.${hostname.replace(subdomain + '.', '')}`
      url.pathname = req.nextUrl.pathname.replace('/admin', '')
      if (url.pathname === '') url.pathname = '/'
      return NextResponse.redirect(url)
    }
    if (req.nextUrl.pathname.startsWith('/merchant')) {
      console.log('Redirecting merchant path to merchant subdomain')
      url.hostname = `merchant.${hostname.replace(subdomain + '.', '')}`
      url.pathname = req.nextUrl.pathname.replace('/merchant', '')
      if (url.pathname === '') url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside public)
     * 4. /examples (inside public)
     * 5. all root files inside public (e.g. /favicon.ico)
     */
    '/((?!api|_next|fonts|assets|favicon|examples|auth|[\\w-]+\\.\\w+).*)',
  ],
}
