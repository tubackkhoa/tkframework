export default function authorize (request) {
  if (!request.user) {
    throw new Error('Unauthorized')
  }
  return true  
}
