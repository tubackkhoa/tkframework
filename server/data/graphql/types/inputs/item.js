import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'

import { itemTextInputType } from './item-text'
import { itemTwitterInputType } from './item-twitter'
import { itemImageInputType } from './item-image'

export const itemInputType = new GraphQLInputObjectType({
  name: 'ItemInput',
  fields: {
    // id is from relay, maybe inserted for null
    id: { type: GraphQLID },
    target_type: { type: new GraphQLNonNull(GraphQLID) },
    sort_rank: { type: GraphQLInt },
    text: { type: itemTextInputType },
    twitter: { type: itemTwitterInputType },
    image: { type: itemImageInputType },
  }
})

