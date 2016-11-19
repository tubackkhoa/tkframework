import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from 'graphql'

export const socialAccountInputType = new GraphQLInputObjectType({
  name: 'SettingInput',
  fields: {
    id: { type: GraphQLInt },
    url: { type: new GraphQLNonNull(GraphQLString) },
  }
})

