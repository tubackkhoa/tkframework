Kiến trúc Server: Cơ bản:

- theo mô hình MVC / nhưng chỉ có api view và dữ liệu trả về là json
- lớp data dùng để giải mã dữ liệu client ví dụ buffer ảnh, graphql fields, và lớp loader giúp giảm số lượng request và đồng bộ dữ liệu trả về qua việc caching, batching các request rời rạc.
- lớp model hỗ trợ relational database như myysql, postgresql với sequelize, nosql mongo db, đồng bộ từ schema vào database và từ data ra schema, việc cập nhật, validate dữ liệu sẽ nằm ở lớp model
- lớp services chứa các lời gọi đến các dịch vụ ngoài như push notification, hoặc là xử lý background như xử lý ảnh video, nhận về các promise
- lớp passport dùng để xác thực người dùng, sử dụng các strategies như social logic, local login, và api qua access token, keep authorize bằng refresh token, có acl để phân quyền người dùng ( auth -> passport authenticate -> serialize user (update token to db) -> serialize client -> generate access token (expired) -> generate and store refresh token -> respond ) 
- lớp routes chứa các api trả về theo restful api, hoặc graphql/graphql batching, kiểm tra quyền thực thi theo acl trong routes   

Kiến trúc Server: GraphQL:
- Khi hệ thống có số lượng api phát sinh liên tục và cơ sở dữ liệu trở lên phức tạp, thì giải pháp tốt nhất là sử dụng graphql và đồng bộ data-driven với client qua relay. Graph QL có 2 phần chính là queries và mutation. 
- Relay cung cấp các mutation để đồng bộ như sau
- RANGE_DELETE: xóa 1 hoặc nhiều cạnh giữa 2 nodes (parentName, parentID, connectionName,deletedIDFieldName)
- RANGE_ADD: tạo node mới (parentName, parentID, connectionName, edgeName, rangeBehaviors)
- FIELDS_CHANGE: cập nhật 1 node (fieldIDs)
- NODE_DELETE: xóa 1 node trong graph (parentName, parentID, connectionName, deletedIDFieldName )
- REQUIRED_CHILDREN: lấy thông tin con của node mới sau khi quay lại (children)


graphql sẽ gồm 1 node root là viewer, gồm các lớp chính:
- connections: kết nối đến database 
- fields: mô tả các fields trong node
- types: mô tả kiểu dữ liệu của field
- queries: mô tả cách truy vấn graph - phải dựa vào đường đi của graph để lấy dữ liệu từ database, xác thực, giới hạn dữ liệu trả về
- mutations: mô tả cách cập nhật graph - tương tự như queries nhưng thao tác là cập nhật dữ liệu
