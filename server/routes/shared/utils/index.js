import authorize from 'passport/authorize'

export const getPagingRouter = (model, attributes, where, order) => (req, res)=> {
  const {page=1, limit=10} = req.query  
  const maxLimit = Math.min(+limit, 10)
  const offset = (page-1) * limit
  const options = {
    limit: maxLimit,
    offset,
    attributes,
  }
  if(where){
    options.where = typeof where === 'function' ? where(req) : where
  }
  if(order){
    options.order = typeof order === 'function' ? order(req) : order
  }
  model.findAndCount(options).then(result => {
    res.send({...result, offset})
  })
}

export const getDetailRouter = (model, attributes) => (req, res) => {
  // tag is public
  const {id} = req.params
  model.findById(id,{
    attributes,
  }).then( item => {
    // logout passport to end access token immediately
    // convert back to base64 string
    res.send(item)
  })   
}

export const getDeleteRouter = (model) => (req, res) => {
  authorize(req)
  const {id} = req.params
  model.destroy({
    where:{id}
  })
  .then(deletedNumber => res.send({deletedNumber}))
}
