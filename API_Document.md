
# API document

## Route authentication

- signin - Đăng ký
    -  Method: *POST*
    -  URL: `/api/auth/signup `
    - request body:
    ```
    {
        "username":"Ten hien thi, duoc phep trung",
        "account":"Tai khoan dung de dan g nhajp",
        "description":"mo ta",
        "password":"mat khau",
    }
    ```
- login - Đăng nhập
    -  Method: *POST*
    -  URL: `/api/auth/login`
    - request body:
    ```
    {
        "account":"Tai khoan dung de dan g nhajp",
        "password":"mat khau"
    }
    ```
-----------------
## Route user
- Lấy thông tn người dùng hiện tại
    -  Method: *GET*
    -  URL: `/api/user/info `
    - request body: **none**

- Lấy danh sách người dùng trừ người dùng hiện tại
    -  Method: *GET*
    -  Điều kiện: đã đăng nhập
    -  URL: `/api/user/all `
    - request body: **none**
    - query: **rows** - Lấy (25 x 1 lần), bỏ qua (25 x (rows - 1))
-----------------
## Route room

- Lấy danh sách các phòng 1 1
    -  Method: *GET*
    -  URL: `/api/room/private `
    - request body: **none**
    - query: **rows** - Lấy (25 tin nhắn 1 lần), bỏ qua (25 tin nhắn x (rows - 1))
    > Lấy không có query là 25 tin nhắn mới nhất, rows = 1 ==> lấy 25 tin nhắn kế tiếp theo thứ tự thời gian

- Bắt đầu nhắn tin ~ tạo phòng 1 1
    -  Method: *POST*
    -  URL: `/api/room/private `
    - request body:
    ```
    {
        targetId:"id nguoi nhan"
    }
    ```
    - *Không thể tạo mới nếu đã nhắn tin từ trước đó*
    - *Tạo phòng nhưng không nhắn tin sẽ tạo lỗi*
- Lấy danh sách tin nhắn nhóm
    -  Method: *GET*
    -  URL: `/api/room/group `
    - request body: **none**
    - query: **rows** - Lấy (25 tin nhắn 1 lần), bỏ qua (25 tin nhắn x (rows - 1))
    > Lấy không có query là 25 tin nhắn mới nhất, rows = 1 ==> lấy 25 tin nhắn kế tiếp theo thứ tự thời gian
- Tạo phòng nhóm
    -  Method: *POST*
    -  URL: `/api/room/group `
    - request body:
    ```
    {
        groupname: ten group, co the null,
        desciption: mo ta, co the null
    }
    ```
    - *Sẽ báo lỗi nếu tạo phòng đã tồn tại*
- Thêm user vào nhóm
    -  Method: *POST*
    -  URL: `/api/room/group/add `
    - request body:
    ```
    {
        groupid: id cua group,
        targetId: id cua nguoi muon cho vao
    }
    ```
    - *Sẽ báo lỗi nếu thêm người đã trong phòng*

- Đá user khỏi nhóm
    -  Method: *PUT*
    -  URL: `/api/room/group/kick `
    - request body:
    ```
    {
        groupid: id cua group,
        targetId: id cua nguoi muon da
    }
    ```
    - *Sẽ báo lỗi nếu đá người không trong phòng*
    - *Phải là owner của nhóm*

- Rời khỏi nhóm
    -  Method: *PUT*
    -  URL: `/api/room/group/left `
    - request body:
    ```
    {
        groupid: id cua group,
    }
    ```
    - *Sẽ báo lỗi nếu user không trong phòng*


------------------------------------
## Route message
### Private

- Lấy danh sách tin nhắn trong phòng 1 1
    -  Method: *GET*
    -  URL: `/api/message/private/:targetId`
    > **Điều kiện**: targetId: id người mà user đã nhắn tin từ trước đó
    - request body: **none**
    - query: **rows** - Lấy (25 tin nhắn 1 lần), bỏ qua (25 tin nhắn x (rows - 1))
    > Lấy không có query là 25 tin nhắn mới nhất, rows = 1 ==> lấy 25 tin nhắn kế tiếp theo thứ tự thời gian
    - *Báo lỗi nếu chưa nhắn tin từ trước đó hoặc phòng đã tạo nhưng không có tin nhắn*
- Gửi tin nhắn 1 1
    -  Method: *POST*
    -  URL: `/api/message/private`
    - request body:
    ```
    {
        targetId: id nguoi nhan,
        message: noi dung tin nhan
    }
    ```
 ### Group
- Lấy danh sách tin nhắn trong phòng nhóm
    -  Method: *GET*
    -  URL: `/api/message/group/:groupId`
    > **Điều kiện**: groupId: id nhóm
    - request body: **none**
    - query: **rows** - Lấy (25 tin nhắn 1 lần), bỏ qua (25 tin nhắn x (rows - 1))
    > Lấy không có query là 25 tin nhắn mới nhất, rows = 1 ==> lấy 25 tin nhắn kế tiếp theo thứ tự thời gian
    - *Báo lỗi nếu chưa nhắn tin từ trước đó, không trong phòng hoặc phòng*
- Gửi tin nhắn nhóm
    -  Method: *POST*
    -  URL: `/api/message/group`
    - request body:
    ```
    {
        groupId: id cua group,
        message: noi dung tin nhan
    }

----------------------
## SoketIO Event Cheatsheet
| Tên sự kiện | Emitter | Mô tả |
| --- | ----------- | -- |
| connection | 1 | Có 1 client kết nối tới server |
| disconnected | 1 | 1 client ngắt kết nối khỏi server |
| userOnline | 1 | 1 client Online |
| userJoinPrivateRoom | 1 | 1 client bấm chọn 1 đoạn hội thoại, join socket của user vào socketRoom |
| sendPrivateMessage | 1 | client gửi tin nhắn tới đoạn hội thoại chỉ có 2 người |
| want4Call | 1 | client muốn thực hiện 1 cuộc gọi |
| ok2Call | 1 | client sẵn sàng gọi |
| newPrivateMessage | 0 | 1 client emit sự kiện ***sendPrivateMessage***, server thông báo đến tất cả người dùng trong phòng đó (chat room và socket room) có tin nhắn mới |
| ready4Call | 0 | client emit sự kiện ***want4Call***, server thông báo đến client thứ 2 client 1 muốn gọi |
| canCall | 0 | client thứ 2 emit sự kiện ***ok2Call***,  server cho broadcast 2 bên đồng ý gọi |


