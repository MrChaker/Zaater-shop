module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  env: {
    PORT: '',
  },
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: '/',
      },
    ]
  }
}
