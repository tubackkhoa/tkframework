export default function authorize (request, throwError=new Error('Unauthorized')) {
  // as long as user has role to access more resources
  if (request.user && request.user.role) {
    return request.user.role
  }
  if(throwError)
    throw throwError
}
