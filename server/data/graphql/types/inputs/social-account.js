import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from 'graphql'

export const socialAccountInputType = new GraphQLInputObjectType({
  name: 'SocialAccountInput',
  fields: {
    id: { type: GraphQLInt },
    url: { type: new GraphQLNonNull(GraphQLString) },
    account_type: { type: GraphQLInt },
    author_id: { type: GraphQLInt },
  }
})

