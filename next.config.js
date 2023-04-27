const ContentSecurityPolicy = `
  default-src 'self';
  font-src 'self';
  style-src 'self' 'unsafe-inline';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' hm.baidu.com www.googletagmanager.com;
  img-src * data: blob: img://* weixin://*;
  connect-src 'self' www.google-analytics.com hm.baidu.com;
`;

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control', // @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
];

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
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  }
}

module.exports = nextConfig
