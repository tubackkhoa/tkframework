import { getQueryType } from './helpers'
import models from 'models'

export const authorType = getQueryType('Author', models.authors)
 