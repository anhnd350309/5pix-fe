// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { getToken } from 'next-auth/jwt'

// export  async function middleware (req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
//   console.log('token', token)
//   if (req.nextUrl.pathname.startsWith('/admin')) {
//     if (!token) {
//       return NextResponse.redirect(new URL('/auth/login', req.url))
//     }
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/admin/:path*'],
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  // Lấy token từ cookie
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Lấy hostname và subdomain
  const hostname = req.headers.get('host') || ''
  const subdomain = hostname.split('.')[0]
  const url = req.nextUrl.clone()
  const isAuthenticated = !!token

  console.log(`Middleware processing: ${req.nextUrl.pathname} on ${hostname}`)

  // Chuyển hướng nếu chưa đăng nhập
  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login')
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // Kiểm tra phân quyền dựa trên subdomain
  if (subdomain === 'admin') {
    console.log(`Admin subdomain detected, user role: ${token.role}`)
    // Chỉ cho phép role admin truy cập subdomain admin
    if (token.role !== 'admin') {
      console.log('User not admin, redirecting to unauthorized')
      url.pathname = '/unauthorized'
      return NextResponse.redirect(url)
    }

    // Chuyển hướng đến trang admin
    if (req.nextUrl.pathname === '/') {
      console.log('Redirecting to admin home')
      url.pathname = '/admin/home'
      return NextResponse.redirect(url)
    }

    // Đảm bảo các đường dẫn trên subdomain admin đều được map đến /admin/...
    if (!req.nextUrl.pathname.startsWith('/admin')) {
      // Chỉ áp dụng cho các đường dẫn có nghĩa, không phải static files
      if (!req.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)) {
        console.log(`Passing control to rewrites for: ${req.nextUrl.pathname}`)
        return NextResponse.next()
      }
    }
  } else if (subdomain === 'merchant') {
    console.log(`Merchant subdomain detected, user role: ${token.role}`)
    // Chỉ cho phép role merchant truy cập subdomain merchant
    if (token.role !== 'merchant') {
      console.log('User not merchant, redirecting to unauthorized')
      url.pathname = '/unauthorized'
      return NextResponse.redirect(url)
    }

    // Chuyển hướng đến trang merchant
    if (req.nextUrl.pathname === '/') {
      console.log('Redirecting to merchant home')
      url.pathname = '/merchant/home'
      return NextResponse.redirect(url)
    }

    // Nếu URL không bắt đầu bằng /merchant, thì để rewrites xử lý
    if (!req.nextUrl.pathname.startsWith('/merchant')) {
      // Loại trừ các static assets
      if (!req.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)) {
        // Xử lý một số route cụ thể
        if (req.nextUrl.pathname === '/orders') {
          console.log('Merchant orders route detected')
          url.pathname = '/merchant/orders'
          return NextResponse.rewrite(url)
        }

        console.log(`Passing control to rewrites for: ${req.nextUrl.pathname}`)
        return NextResponse.next()
      }
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
    '/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)',
  ],
}
