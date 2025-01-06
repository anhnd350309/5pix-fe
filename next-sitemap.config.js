/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://5pix.org',
  generateRobotsTxt: true, // (optional)
  exclude: [/\/admin/],
  // ...other options
}
