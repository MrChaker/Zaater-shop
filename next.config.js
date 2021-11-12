module.exports = {
  swcMinify: false,
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
