export const decodeBase64Image = (dataString) => {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  const response = {}

  if (matches.length === 3) {
    // from base64, image by default is png
    response.mimetype = matches[1]
    response.buffer = new Buffer(matches[2], 'base64')
  }
  
  return response
}
