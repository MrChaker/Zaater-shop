module.exports = {
  reactStrictMode: true,
  env:{
    MONGO_URI : 'mongodb://localhost:27017/admin'
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
