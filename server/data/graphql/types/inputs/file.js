import { 
  GraphQLNonNull,
  GraphQLString,  
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
    buffer: {
      type: new GraphQLNonNull(GraphQLBuffer),
      description: 'The file buffered in memory', // fs.writeFileSync(filePath, buffer);
    }
  })
})