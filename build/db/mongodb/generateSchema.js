// Modules
import util from 'util'
import Mongoose from 'mongoose'

import { isDate } from './utils'

const getNativeType = (string) => {
  switch (string) {
    case "array":
      return 'Array'

    case "buffer":
      return 'Buffer'

    case "boolean":
      return 'Boolean'

    case "date":
      return 'Date'

    case "number":
      return 'Number'

    case "string":
      return 'String'

    case "objectid":
      return 'ObjectId'

    case "null":
    case "undefined":
    case "regexp":
    default:
      return 'Mixed'
  }
}

const generateSchema = (object) => {

  const output = {}

  for (var key in object) {
    const value = object[key]
    let originalType = null
    let elementType = null
    let type = null

    if (value instanceof Buffer) {
      type = 'buffer'
    }

    if (value != null && typeof value.toString !== 'undefined' && value.toString().match(/^[0-9a-fA-F]{24}$/)) {
      type = 'objectid'
    }

    if (!type) {
      type = value.constructor.name.toLowerCase()
    }

    if (type === 'string' && isDate(value)) {
      type = 'date'
    }

    if (type === 'object') {
      output[key] = generateSchema(object[key])
    } else {
      if (type === 'undefined') {
        type = 'null'
      }

      if (type === 'array' && value.length) {
        originalType = type
        type = undefined

        for (let index = 0, length = value.length; index < length; index++) {
          elementType = value[index].constructor.name.toLowerCase()

          if (type && elementType !== type) {
            type = 'mixed'
            break
          } else {
            type = elementType
          }
        }
      }

      if (originalType && originalType === 'array') {
        output[key] = { type: [getNativeType(type)] }
      } else {
        output[key] = { type: getNativeType(type) }
      }
    }
  }

  return output
}

global.ISODate = Date
global.ObjectId = Mongoose.Types.ObjectId

// 0: node, 1: this script
const model = process.argv[2]
const object = require(`./schema/${model}`).default
const output = generateSchema(object)
// const outputStr = JSON.stringify(output, null, 2)
const outputStr = util.inspect(output, {showHidden: false, depth: null})
const niceOutputStr = outputStr.replace(/'([^']+)'/g, '$1').replace(/^{/,"{\n ").replace(/}$/,"\n}")
console.log(niceOutputStr)
