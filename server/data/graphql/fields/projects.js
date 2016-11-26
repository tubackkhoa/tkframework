import { 
  GraphQLInt, 
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'

import {
  fromGlobalId,
} from 'graphql-relay'

import { pageableConnectionArgs, getNumberPagingModel } from 'data/graphql/paging/getPagingModel'
import { projectConnection } from 'data/graphql/connections/project'
import { projectType } from 'data/graphql/types/queries/project'
import getGraphqlFields from 'data/graphql/utils/getGraphqlFields'
import models from 'models'


const resolveProjectTags = (project, tagAttributes) => project.getProjectTags(tagAttributes)

// must validate this before export
// should only use export default directly for const of {}
export const projects = {
  type: projectConnection,
  description: 'A list of projects',
  args: {
    ...pageableConnectionArgs,
    tagId: { 
      type: GraphQLID,
      description: 'Filter project by tag-id', 
    },
  }, 
  resolve: (_, args, {request}, info) => getNumberPagingModel(args, info, models.projects, 
    // resolve graph field
    { tags: resolveProjectTags }, 
    // resolve options
    async (options, resolverAttributes) => {

      // only published item
      options.where = {
        accepted: 1,
      }

      // for sure to get source_image
      const fullImageAttrIndex = options.attributes.indexOf('full_image')
      if (fullImageAttrIndex !== -1){        
        // just replace it and using getter method
        options.attributes[fullImageAttrIndex] = 'image'
      }

      // update options with tag
      if(args.tagId){
        const tagId = fromGlobalId(args.tagId).id
        const projectIDs = await models.taggings.findAll({
          attributes: ['subject_id'],
          distinct: true,
          where: {
            tag_id: tagId,
            subject_type: 'Project',
          }
        }).map(tagging => tagging.subject_id)        

        // filter by tagid from posts
        options.where.id = {
          $in: projectIDs
        }                

      }

      // give back the options for filter
      return options

    }),    
}

export const latestProject = {
  type: projectType,
  description: 'Latest project',
  resolve: (_, args, {request}, info) => {
    // there is no __typename because we will not use node general select
    const {full_image, ...graphFields} = getGraphqlFields(info)
    full_image && (graphFields.image = full_image)
    // by default it will return a promise resolve an object
    return models.projects.findOne({
      where:{accepted:1},
      order:[['updated_at', 'DESC']],
      attributes: Object.keys(graphFields),
    })

  }
}
