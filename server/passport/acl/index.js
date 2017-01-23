import ACL from 'acl'
// use uppercase to differentiate
// we can use redis persistent for retrieve data faster
const acl = new ACL(new ACL.memoryBackend())

acl.allow([
    {
        roles:['member'],
        allows:[
            {resources:'post', permissions:'view'},            
        ]
    },
    {
        roles:['admin'],
        allows:[            
            {resources:['account', 'deposit'], permissions:['put', 'delete']},
        ]
    }
])

export default acl