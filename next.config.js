/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'giveth.io',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'giveth.mypinata.cloud',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'd2jyzh4ah9xf6q.cloudfront.net',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

module.exports = nextConfig
