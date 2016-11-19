import models from 'models' 

export const getAuthorDetail = async (id, graphFields) => {

  const {social_accounts: socialAccountsGraphFields, ...authorGraphFields} = graphFields
  const authorAttributes = Object.keys(authorGraphFields)
  const author = typeof id === 'object' 
    ? await models.authors.findOne({ 
        where: id,
        attributes: authorAttributes, 
      })
    : await models.authors.findById(id, { 
        attributes: authorAttributes, 
      })

  // guard code
  if(!author)
    return author

  if(socialAccountsGraphFields) {
    if(!socialAccountsGraphFields.author_id) {
      // by default we will use author_id from author
      socialAccountsGraphFields.author_id = authorGraphFields.id
    }
    // with async it can handle promise.map by apply yield return to generator
    author.social_accounts = await author.getSocialAccounts(Object.keys(socialAccountsGraphFields))
  }

  // return item
  return author
}