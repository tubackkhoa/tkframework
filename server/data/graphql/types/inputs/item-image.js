import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql'

// import { fileInputType } from 'data/graphql/types/inputs/file'

export const itemImageInputType = new GraphQLInputObjectType({
  name: 'ItemImageInput',
  fields: {
    // id is from relay, maybe inserted for null
    id: { type: GraphQLID },
    caption: { type: GraphQLString },
    // image: { type: fileInputType }, // update if there is file uploaded
  }
})

