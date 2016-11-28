import test from 'tape'

test('service point Lat Lng test', async (assert) => {

  const data = {
    lat: 21.233128,
    lng: 105.354980,
  }

  const RAD = Math.PI / 180
  const rad_lat = data.lat * RAD
  const rad_lng = data.lng * RAD
  data.lat_cos = Math.cos(rad_lat)
  data.lng_cos = Math.cos(rad_lng)
  data.lat_sin = Math.sin(rad_lat)
  data.lng_sin = Math.sin(rad_lng)

  assert.deepEqual(
    data, 
    { 
      lat: 21.233128,
      lng: 105.35498,
      lat_cos: 0.9321145567087106,
      lng_cos: -0.2647985002951536,
      lat_sin: 0.3621635723975065,
      lng_sin: 0.9643037665805508 
    },
    'service point lng and lat must be pre-caculate'
  )

  assert.end()
})