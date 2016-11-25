export default function authorize (request) {
  // as long as user has role to access more resources
  if (request.user && request.user.role) {
    return request.user.role
  }
  throw new Error('Unauthorized')
}
