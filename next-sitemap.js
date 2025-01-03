/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://acme.com',
  generateRobotsTxt: true, // (optional) Generate robots.txt
  // ...other options
}
