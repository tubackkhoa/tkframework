const btoa = require('btoa')

function genSalt(seed) {
  var bytes = []

  for (var i = 0, l = seed.length; i < l; i++) {
    bytes.push(seed.charCodeAt(i))
  }

  // Salt must be 16 bytes
  while (bytes.length < 16) {
    bytes.push(0)
  }

  // Convert byte array to base64 string
  const salt = btoa(String.fromCharCode.apply(String, bytes.slice(0, 16)))

  // Adding header for bcrypt. Fake 10 rounds.
  return '$2a$10$' + salt
}

module.exports = {
  genSalt: genSalt
}