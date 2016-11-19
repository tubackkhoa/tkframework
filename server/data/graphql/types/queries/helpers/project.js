import models from 'models' 

export const getProjectDetail = async (id, graphFields) => {

  // we only process items when get detail of this project, not for list
  const {tags: tagsGraphFields, full_image, ...projectGraphFields} = graphFields

  if(full_image)
    // resolve full_src, just as image, but we have to create getter method
    projectGraphFields.image = full_image

  const projectAttributes = Object.keys(projectGraphFields)
  const project = typeof id === 'object' 
    ? await models.projects.findOne({ 
        where: id,
        attributes: projectAttributes, 
      })
    : await models.projects.findById(id, { 
        attributes: projectAttributes, 
      })

  // update tags for project  
  if(project && tagsGraphFields) {
    // we connect tag via tagging, so no need to map subject_id to project.id
    // with async it can handle promise.map by apply yield return to generator
    project.tags = await project.getprojectTags(Object.keys(tagsGraphFields))
  }

  // return project
  return project  
}