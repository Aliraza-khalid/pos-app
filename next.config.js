/** @type {import('next').NextConfig} */
const nextConfig = {
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
