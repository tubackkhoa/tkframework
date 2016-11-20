import { GraphQLScalarType } from 'graphql'
import { GraphQLError } from 'graphql/error'
import { Kind } from 'graphql/language'


export const GraphQLBuffer = new GraphQLScalarType({
  name: 'Buffer',
  serialize: value => {
    if (!(value instanceof Buffer)) {
      throw new TypeError('Field error: value is not an instance of Buffer')
    }
    // only return string to client, because no way to return Buffer via json
    return value.toString()

  },
  parseValue: value => {
    if (!(value instanceof Buffer)) {
      throw new TypeError('Field error: value is not an instance of Buffer')
    }
    // nothing to parse
    return value
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Query error: Can only parse strings to buffers but got a: ${ast.kind}`, [ast])
    }

    const result = new Buffer(ast.value)

    if (ast.value !== result.toString()) {
      throw new GraphQLError('Query error: Invalid buffer encoding', [ast])
    }

    // return correct buffer
    return result
  }
})