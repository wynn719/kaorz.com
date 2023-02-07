/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_PATH,
  reactStrictMode: true,
  output: 'standalone',
  compress: false, // Gzip by nginx
  async redirects() {
    return [
      {
        source: '/',
        destination: '/posts',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
