import {Router} from 'express'
import service_points from 'models/tables/Alop/service-points'
import models from 'models'

const router  = new Router()

const RAD = Math.PI / 180;
const DEGREE = 180 / Math.PI

router.get('/getNearByService', async (req, res) => {
  // tag is public
  const {lat, lon:lng, distance:distance_in_kilometers = 0.1} = req.query

  if (lat && lng) {
      // calculate
      const distance_unit = 111.045
      const rad_lat = lat * RAD
      const rad_lng = lng * RAD
      const lat_cos = Math.cos(rad_lat)
      const lng_cos = Math.cos(rad_lng)
      const lat_sin = Math.sin(rad_lat)
      const lng_sin = Math.sin(rad_lng)

      const sql = `SELECT name, password, address,
acos(${lat_sin} * lat_sin + ${lat_cos} * lat_cos * cos((${lng} - lng) * ${RAD})) * ${DEGREE} * ${distance_unit} AS distance       
FROM wifi_chua
WHERE lat BETWEEN 
  ${lat} - (${distance_in_kilometers} / ${distance_unit}) 
  AND 
  ${lat} + (${distance_in_kilometers} / ${distance_unit})
  AND 
  lng BETWEEN ${lng} - (${distance_in_kilometers} / (${distance_unit} * ${lat_cos})) 
  AND 
  ${lng} + (${distance_in_kilometers} / (${distance_unit} * ${lat_cos}))  
HAVING distance <= ${distance_in_kilometers}  ORDER BY distance LIMIT 10`
     
     
     models.sequelize.query(sql,{ type: models.DataTypes.SELECT})
     .then(items => res.send(items))
     .catch(e =>res.status(400).write('Error'))      
      
   } else {
    res.status(204).end() 
   }   

})


export default router