/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_URL: 'http://localhost:5000',
  },
  redirects: () => [{
    source: '/',
    destination: '/dashboard',
    permanent: true,
  }],
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
