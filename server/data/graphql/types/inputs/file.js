import { 
  GraphQLNonNull,
  GraphQLString,  
  GraphQLInt,
  GraphQLInputObjectType,
} from 'graphql'

import { GraphQLBuffer } from 'data/graphql/types/custom/buffer'

// we can authorize request
export const fileInputType = new GraphQLInputObjectType({
  name: 'File',
  description: 'A file uploaded via multipart/form-data',
  fields: () => ({
    fieldname: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The fieldname used to POST this file.',
    },
    originalname: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The original file name.',
    },
    encoding: {
      type: GraphQLString,
      description: 'The encoding of file.', // 7bit
    },
    mimetype: {
      type: GraphQLString,
      description: 'The mimetype of file.', // "image/png"
    },
    buffer: {
      type: new GraphQLNonNull(GraphQLBuffer),
      description: 'The file buffered in memory', // fs.writeFileSync(filePath, buffer);
    },
    size: {
      type: GraphQLInt,
      description: 'The size of file.', // 96394 bytes
    }
  })
})