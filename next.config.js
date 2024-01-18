/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  redirects: () => [{
    source: '/',
    destination: '/dashboard',
    permanent: true,
  }],
  experimental: {
    typedRoutes: true,
  }
}

module.exports = nextConfig
