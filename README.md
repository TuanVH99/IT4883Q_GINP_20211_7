## Các công nghệ sẽ sử dụng
  - NodeJS
  - ReactJS
  - MySQL
## Khảo sát, tìm hiểu sử dụng Docker
Các nội dung đã khảo sát và tìm hiểu
  - Sử dụng Docker riêng cho từng công nghệ: app, client-only
  - tiến hành gộp các công nghệ
     -  app2: NodeJS + MySQL
     -  app3: ReactJS + NodeJS + MySQL - **fail**
## Install repository
Cài đặt các Container trong từng thư mục
  - Đối với app: build image và tiến hành run container
  - Đối với các thư mục còn lại có chứa docker-compose:
      - Build với docker-compose
      - clientonly: build với command 
      
        > *docker-compose -f docker-compose.dev.yml up*
