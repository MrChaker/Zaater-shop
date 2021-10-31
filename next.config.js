module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: '/',
      },
    ]
  }
}
