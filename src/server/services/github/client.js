require('dotenv').config()
require('isomorphic-fetch')
const { API_URI, API_TOKEN } = process.env;
const { GraphQLClient } = require('graphql-request')

const client = new GraphQLClient(API_URI, {
  headers: {
    Authorization: `bearer ${API_TOKEN}`
  }
})

module.exports = client
