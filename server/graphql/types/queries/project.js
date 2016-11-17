import { 
  GraphQLList,
  GraphQLString,
} from 'graphql'

import { getQueryType } from './helpers'
import { tagType } from './tag'
import models from 'models'

import { getProjectDetail } from './helpers/project'

export const projectType = getQueryType('Project', models.projects, {
  tags: {
    type: new GraphQLList(tagType),
    description: 'Tags of the project',    
  },
  full_image: {
    type: GraphQLString,
    description: 'Absolute src of image',    
  },
}, getProjectDetail)


