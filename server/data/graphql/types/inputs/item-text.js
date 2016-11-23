import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql'


export const itemTextInputType = new GraphQLInputObjectType({
  name: 'ItemTextInput',
  fields: {
    // id is from relay, maybe inserted for null
    id: { type: GraphQLID },
    description: { type: GraphQLString },
  }
})

