import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql'


export const itemTwitterInputType = new GraphQLInputObjectType({
  name: 'ItemTwitterInput',
  fields: {
    // id is from relay, maybe inserted for null
    id: { type: GraphQLID },
    twitter_id: { type: GraphQLString },
  }
})

