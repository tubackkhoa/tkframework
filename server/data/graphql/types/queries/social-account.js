import {
  GraphQLString,
} from 'graphql'

import { getQueryType } from './helpers'
import models from 'models'

export const socialAccountType = getQueryType('SocialAccount', models.social_accounts)

