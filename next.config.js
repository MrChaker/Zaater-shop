module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  env:{
    MONGO_URI : 'mongodb://localhost:27017/admin',
    PORT : 'http://localhost:3000'
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
