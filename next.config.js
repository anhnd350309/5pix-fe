/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const withTM = require('next-transpile-modules')(['rc-cascader', '@babel/runtime'])

const nextConfig = {
  reactStrictMode: true,
  i18n,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: [
      'source.unsplash.com',
      'images.unsplash.com',
      'preview.colorlib.com',
      'music.youtube.com',
      'encrypted-tbn0.gstatic.com',
      'rjp-v2-prod.s3.ap-southeast-1.amazonaws.com',
      '5pix-dev-original-image.s3.ap-southeast-1.amazonaws.com',
      'de8xjpkclpdv9.cloudfront.net',
      'd2bdqtxx47uj31.cloudfront.net',
      'd206ocdtskenxb.cloudfront.net',
      '5pix-dev-thumbnail-image.s3.ap-southeast-1.amazonaws.com',
      'd6cffu4vfbu1e.cloudfront.net',
      '5pix-thumbnail-image.s3.ap-southeast-1.amazonaws.com',
      'cdn.5pix.org',
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    })

    return config
  },
  async rewrites() {
    const domain = process.env.NEXT_PUBLIC_DOMAIN || 'localhost:9999'
    const adminDomain = process.env.NEXT_PUBLIC_ADMIN_DOMAIN || 'admin.localhost:9999'
    const merchantDomain = process.env.NEXT_PUBLIC_MERCHANT_DOMAIN || 'merchant.localhost:9999'

    return [
      // Admin subdomain - cấu hình cụ thể cho các route phổ biến
      {
        source: '/home',
        destination: '/admin/home',
        has: [
          {
            type: 'host',
            value: adminDomain,
          },
        ],
      },
      {
        source: '/users',
        destination: '/admin/users',
        has: [
          {
            type: 'host',
            value: adminDomain,
          },
        ],
      },
      {
        source: '/orders',
        destination: '/admin/orders',
        has: [
          {
            type: 'host',
            value: adminDomain,
          },
        ],
      },
      {
        source: '/events',
        destination: '/admin/events',
        has: [
          {
            type: 'host',
            value: adminDomain,
          },
        ],
      },
      // Merchant subdomain - cấu hình cụ thể cho các route phổ biến
      {
        source: '/home',
        destination: '/merchant/home',
        has: [
          {
            type: 'host',
            value: merchantDomain,
          },
        ],
      },
      {
        source: '/orders',
        destination: '/merchant/orders',
        has: [
          {
            type: 'host',
            value: merchantDomain,
          },
        ],
      },
      {
        source: '/events',
        destination: '/merchant/events',
        has: [
          {
            type: 'host',
            value: merchantDomain,
          },
        ],
      },
      {
        source: '/dashboard',
        destination: '/merchant/dashboard',
        has: [
          {
            type: 'host',
            value: merchantDomain,
          },
        ],
      },
      // Pattern chung cho admin
      {
        source: '/:path*',
        destination: '/admin/:path*',
        has: [
          {
            type: 'host',
            value: adminDomain,
          },
        ],
      },
      // Pattern chung cho merchant
      {
        source: '/:path*',
        destination: '/merchant/:path*',
        has: [
          {
            type: 'host',
            value: merchantDomain,
          },
        ],
      },
      // Domain chính - luôn để cuối cùng
      {
        source: '/:path*',
        destination: '/:path*',
        has: [
          {
            type: 'host',
            value: domain,
          },
        ],
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ]
  },
}

module.exports = withTM(nextConfig)
