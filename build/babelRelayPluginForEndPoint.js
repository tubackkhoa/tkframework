// only use this when we access from remote graphql
// but we can not see what happend

const getBabelRelayPlugin = require('babel-relay-plugin')
const { parse, resolveSchema } = require('graphql-config-parser')
const { loopWhile } = require('deasync')

const fs = require('fs')
const path = require('path')

const config = parse()

module.exports = function (babel) {
  let wait = true
  let schema, error

  resolveSchema(config)
    .then((result) => {
      schema = result
      wait = false
    })
    .catch((err) => {
      error = err
      wait = false
    })

  // TODO find a cleaner way to do this
  loopWhile(() => wait)

  // this error could happen while downloading the schema
  if (error) {
    throw error
  }

  if (schema.errors) {
    throw new Error(schema.errors)
  }

  if (schema.data) {    
    return getBabelRelayPlugin(schema.data)(babel)
  } else {
    return {
      visitor: {}
    }
  }
}