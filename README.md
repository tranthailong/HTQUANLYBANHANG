# 🛒 HỆ THỐNG QUẢN LÝ BÁN HÀNG

Backend và giao diện quản trị cho hệ thống quản lý bán hàng, được xây dựng bằng **Java Spring Boot, Spring Data JPA/Hibernate, MySQL, Thymeleaf, HTML/CSS/JavaScript** và cung cấp RESTful API cho danh mục, sản phẩm, khách hàng, đơn hàng và chi tiết đơn hàng.

Repository: https://github.com/tranthailong/HTQUANLYBANHANG

> **Tài liệu này được cập nhật theo source ZIP `HTQUANLYBANHANG-main (2).zip` đã cung cấp.** Một số nội dung trong README cũ không khớp với source thực tế đã được sửa lại, đặc biệt là tên trường `price`, cổng ứng dụng `6699`, API Order Detail và cấu hình Docker.

---

## 1. 📌 Giới thiệu

`HTQUANLYBANHANG` là hệ thống quản lý bán hàng phục vụ mục đích học tập và thực hành phát triển ứng dụng web với Spring Boot.

Các chức năng chính trong source hiện tại:

- Quản lý danh mục sản phẩm.
- Quản lý sản phẩm.
- Quản lý khách hàng.
- Quản lý đơn hàng.
- Quản lý chi tiết đơn hàng.
- Giao diện quản trị trên trình duyệt.
- REST API CRUD cho các module chính.
- Swagger/OpenAPI thông qua SpringDoc.
- Xử lý exception tập trung.
- Kiểm tra tồn kho trong nghiệp vụ đơn hàng.
- Kết nối MySQL bằng Spring Data JPA/Hibernate.
- Docker Compose cho môi trường chạy ứng dụng và MySQL.

---

## 2. 🎯 Mục tiêu

Dự án được thực hiện nhằm:

- Thực hành Java và Spring Boot.
- Xây dựng REST API.
- Sử dụng Spring Data JPA và Hibernate.
- Thiết kế và thao tác với cơ sở dữ liệu quan hệ MySQL.
- Áp dụng kiến trúc nhiều tầng.
- Sử dụng Entity, DTO, Mapper, Repository và Service.
- Tách Service interface và Service implementation.
- Xử lý Exception tập trung.
- Sử dụng Swagger/OpenAPI để kiểm thử API.
- Xây dựng giao diện quản trị bằng HTML, CSS và JavaScript.
- Thực hành Git/GitHub.
- Làm quen với Docker và Docker Compose.

---

## 3. 🛠️ Công nghệ sử dụng

| Công nghệ | Mục đích |
|---|---|
| Java 21 | Ngôn ngữ lập trình |
| Spring Boot 3.5.4 | Xây dựng Backend |
| Spring Web | REST API và Web Controller |
| Spring Data JPA | Truy cập Database |
| Hibernate ORM | ORM |
| MySQL 8.0 | Cơ sở dữ liệu |
| Maven | Quản lý dependency và build |
| Thymeleaf | Render giao diện HTML |
| HTML/CSS/JavaScript | Giao diện quản trị |
| Lombok | Giảm code Java lặp |
| Spring Validation | Kiểm tra dữ liệu đầu vào |
| SpringDoc OpenAPI 2.8.13 | Swagger/OpenAPI |
| Docker | Container hóa ứng dụng |
| Docker Compose | Quản lý app + MySQL |
| Git/GitHub | Quản lý source code |
| IntelliJ IDEA | Môi trường phát triển |

Java version được khai báo trong `pom.xml` là **21**.

---

## 4. 🏗️ Kiến trúc hệ thống

Dự án sử dụng kiến trúc nhiều tầng:

```text
                    CLIENT
             Browser / Swagger
                     │
                     ▼
              ┌──────────────┐
              │  CONTROLLER  │
              │ HTTP Request │
              └──────┬───────┘
                     │
                     ▼
                 DTO Request
                     │
                     ▼
              ┌──────────────┐
              │   SERVICE    │
              │  Interface   │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ SERVICE IMPL  │
              │ Business Logic│
              └──────┬───────┘
                     │
                     ▼
                  MAPPER
              Entity ↔ DTO
                     │
                     ▼
              ┌──────────────┐
              │  REPOSITORY  │
              │ Spring Data  │
              │     JPA      │
              └──────┬───────┘
                     │
                     ▼
                 HIBERNATE
                     │
                     ▼
                   MYSQL
```

### Luồng Request

```text
Client
  ↓
Controller
  ↓
Request DTO
  ↓
Service Interface
  ↓
ServiceImpl
  ↓
Mapper
  ↓
Repository
  ↓
Hibernate
  ↓
MySQL
```

### Luồng Response

```text
MySQL
  ↓
Hibernate
  ↓
Repository
  ↓
ServiceImpl
  ↓
Mapper
  ↓
Response DTO
  ↓
Controller
  ↓
Client
```

---

## 5. 📁 Cấu trúc thư mục thực tế

```text
HTQUANLYBANHANG/
├── database/
│   └── sale_management.sql
│
├── src/
│   ├── main/
│   │   ├── java/vn/edu/student/htquanlybanhang/
│   │   │   ├── config/
│   │   │   │   └── CorsConfig.java
│   │   │   │
│   │   │   ├── controller/
│   │   │   │   ├── CategoryController.java
│   │   │   │   ├── CustomerController.java
│   │   │   │   ├── OrderController.java
│   │   │   │   ├── OrderDetailController.java
│   │   │   │   ├── ProductController.java
│   │   │   │   └── WebController.java
│   │   │   │
│   │   │   ├── dto/
│   │   │   │   ├── request/
│   │   │   │   │   ├── CategoryRequest.java
│   │   │   │   │   ├── CustomerRequest.java
│   │   │   │   │   ├── OrderRequest.java
│   │   │   │   │   ├── OrderDetailRequest.java
│   │   │   │   │   └── ProductRequest.java
│   │   │   │   │
│   │   │   │   └── response/
│   │   │   │       ├── ApiResponse.java
│   │   │   │       ├── CategoryResponse.java
│   │   │   │       ├── CustomerResponse.java
│   │   │   │       ├── OrderResponse.java
│   │   │   │       ├── OrderDetailResponse.java
│   │   │   │       └── ProductResponse.java
│   │   │   │
│   │   │   ├── entity/
│   │   │   │   ├── Category.java
│   │   │   │   ├── Customer.java
│   │   │   │   ├── Order.java
│   │   │   │   ├── OrderDetail.java
│   │   │   │   └── Product.java
│   │   │   │
│   │   │   ├── exception/
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   ├── InsufficientStockException.java
│   │   │   │   └── ResourceNotFoundException.java
│   │   │   │
│   │   │   ├── mapper/
│   │   │   │   ├── CategoryMapper.java
│   │   │   │   ├── CustomerMapper.java
│   │   │   │   ├── OrderMapper.java
│   │   │   │   ├── OrderDetailMapper.java
│   │   │   │   └── ProductMapper.java
│   │   │   │
│   │   │   ├── repository/
│   │   │   │   ├── CategoryRepository.java
│   │   │   │   ├── CustomerRepository.java
│   │   │   │   ├── OrderRepository.java
│   │   │   │   ├── OrderDetailRepository.java
│   │   │   │   └── ProductRepository.java
│   │   │   │
│   │   │   ├── service/
│   │   │   │   ├── CategoryService.java
│   │   │   │   ├── CustomerService.java
│   │   │   │   ├── OrderService.java
│   │   │   │   ├── OrderDetailService.java
│   │   │   │   └── ProductService.java
│   │   │   │
│   │   │   ├── service/impl/
│   │   │   │   ├── CategoryServiceImpl.java
│   │   │   │   ├── CustomerServiceImpl.java
│   │   │   │   ├── OrderServiceImpl.java
│   │   │   │   ├── OrderDetailServiceImpl.java
│   │   │   │   └── ProductServiceImpl.java
│   │   │   │
│   │   │   └── HtquanlybanhangApplication.java
│   │   │
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── css/
│   │       │   │   ├── style.css
│   │       │   │   ├── categories.css
│   │       │   │   ├── products.css
│   │       │   │   ├── customers.css
│   │       │   │   ├── orders.css
│   │       │   │   └── order-details.css
│   │       │   │
│   │       │   └── jss/
│   │       │       ├── dashboard.js
│   │       │       ├── categories.js
│   │       │       ├── products.js
│   │       │       ├── customers.js
│   │       │       ├── orders.js
│   │       │       └── order-details.js
│   │       │
│   │       ├── templates/
│   │       │   ├── index.html
│   │       │   ├── categories.html
│   │       │   ├── products.html
│   │       │   ├── customers.html
│   │       │   ├── orders.html
│   │       │   └── order-details.html
│   │       │
│   │       └── application.properties
│   │
│   └── test/
│       └── java/.../HtquanlybanhangApplicationTests.java
│
├── docker-compose.yml
├── pom.xml
├── mvnw
├── mvnw.cmd
└── .gitignore
```

> **Lưu ý:** ZIP được kiểm tra không chứa `Dockerfile`. Vì vậy README này không mô tả `Dockerfile` như một file có sẵn trong ZIP.

---

## 6. 🗄️ Thiết kế cơ sở dữ liệu

Database sử dụng:

```text
sale_management
```

Gồm 5 bảng:

- `categories`
- `products`
- `customers`
- `orders`
- `order_details`

### Quan hệ

```text
categories 1 ───────── N products

customers  1 ───────── N orders

orders     1 ───────── N order_details

products   1 ───────── N order_details
```

### `categories`

| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | BIGINT | PK, AUTO_INCREMENT |
| name | VARCHAR(255) | NOT NULL |
| description | VARCHAR(500) | Có thể NULL |

### `products`

| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | BIGINT | PK, AUTO_INCREMENT |
| name | VARCHAR(255) | NOT NULL |
| price | DECIMAL(15,2) | NOT NULL |
| quantity | INT | NOT NULL |
| description | TEXT | Có thể NULL |
| image | VARCHAR(255) | Có thể NULL |
| category_id | BIGINT | FK → categories.id |

> **Quan trọng:** source hiện tại dùng trường giá là **`price`**, không phải `big`.

### `customers`

| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | BIGINT | PK, AUTO_INCREMENT |
| name | VARCHAR(255) | NOT NULL |
| email | VARCHAR(255) | UNIQUE |
| phone | VARCHAR(20) | Có thể NULL |
| address | VARCHAR(255) | Có thể NULL |

### `orders`

| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | BIGINT | PK, AUTO_INCREMENT |
| order_date | DATETIME | NOT NULL |
| total_amount | DECIMAL(15,2) | NOT NULL |
| customer_id | BIGINT | FK → customers.id |

### `order_details`

| Cột | Kiểu | Ghi chú |
|---|---|---|
| id | BIGINT | PK, AUTO_INCREMENT |
| quantity | INT | NOT NULL |
| price | DECIMAL(15,2) | NOT NULL |
| order_id | BIGINT | FK → orders.id |
| product_id | BIGINT | FK → products.id |

---

## 7. 📊 Dữ liệu mẫu

File SQL:

```text
 database/sale_management.sql
```

Dữ liệu INSERT hiện có:

| Bảng | Số lượng |
|---|---:|
| Categories | 10 |
| Products | 30 |
| Customers | 15 |
| Orders | 15 |
| Order Details | 23 |

File SQL cũng chứa nhiều câu `SELECT` và `COUNT(*)` để kiểm tra dữ liệu sau khi tạo database.

### ⚠️ Lưu ý khi chạy SQL

File SQL bắt đầu bằng:

```sql
DROP DATABASE IF EXISTS sale_management;
CREATE DATABASE sale_management ...;
```

Do đó, **không chạy file này trên database đang chứa dữ liệu quan trọng**, vì nó sẽ xóa database `sale_management` trước khi tạo lại.

---

## 8. 🔌 REST API

Tất cả API REST sử dụng prefix:

```text
/api
```

### Category

```text
GET     /api/categories
GET     /api/categories/{id}
POST    /api/categories
PUT     /api/categories/{id}
DELETE  /api/categories/{id}
```

### Product

```text
GET     /api/products
GET     /api/products/{id}
POST    /api/products
PUT     /api/products/{id}
DELETE  /api/products/{id}
```

### Customer

```text
GET     /api/customers
GET     /api/customers/{id}
POST    /api/customers
PUT     /api/customers/{id}
DELETE  /api/customers/{id}
```

### Order

```text
GET     /api/orders
GET     /api/orders/{id}
POST    /api/orders
PUT     /api/orders/{id}
DELETE  /api/orders/{id}
```

Khi xóa đơn hàng, service có xử lý nghiệp vụ hoàn lại tồn kho theo code hiện tại.

### Order Detail

```text
GET     /api/order-details
GET     /api/order-details/{id}
GET     /api/order-details/order/{orderId}
POST    /api/order-details/order/{orderId}
PUT     /api/order-details/{id}
DELETE  /api/order-details/{id}
```

> **Đã sửa so với README cũ:** source hiện tại **không có** `POST /api/order-details` trực tiếp. Thêm Order Detail được thực hiện qua `POST /api/order-details/order/{orderId}`.

---

## 9. 🖥️ Giao diện Web

Giao diện được phục vụ trực tiếp bởi Spring Boot + Thymeleaf.

Các trang hiện có:

```text
/
/index.html
/products.html
/categories.html
/customers.html
/orders.html
/order-details.html
```

Các module JavaScript:

```text
static/jss/dashboard.js
static/jss/categories.js
static/jss/products.js
static/jss/customers.js
static/jss/orders.js
static/jss/order-details.js
```

CSS được tách theo từng module:

```text
static/css/style.css
static/css/categories.css
static/css/products.css
static/css/customers.css
static/css/orders.css
static/css/order-details.css
```

---

## 10. 📦 DTO và Mapper

### Request DTO

```text
CategoryRequest
CustomerRequest
OrderRequest
OrderDetailRequest
ProductRequest
```

### Response DTO

```text
ApiResponse
CategoryResponse
CustomerResponse
OrderResponse
OrderDetailResponse
ProductResponse
```

### Mapper

```text
CategoryMapper
CustomerMapper
OrderMapper
OrderDetailMapper
ProductMapper
```

Mapper chịu trách nhiệm chuyển đổi giữa Entity và DTO.

Mô hình tổng quát:

```text
Request DTO → Service → Entity
Entity → Mapper → Response DTO
```

---

## 11. ⚠️ Exception Handling

Project có xử lý exception tập trung bằng:

```text
GlobalExceptionHandler
```

Các exception riêng gồm:

```text
ResourceNotFoundException
InsufficientStockException
```

Mục đích:

- Xử lý tài nguyên không tồn tại.
- Xử lý lỗi tồn kho không đủ.
- Chuẩn hóa response lỗi.
- Giảm code xử lý lỗi lặp lại trong Controller.

---

## 12. 📚 Swagger / OpenAPI

Project sử dụng:

```text
springdoc-openapi-starter-webmvc-ui
version: 2.8.13
```

Sau khi chạy ứng dụng trên port `6699`, Swagger UI dự kiến truy cập tại:

```text
http://localhost:6699/swagger-ui/index.html
```

> **Đã sửa:** README cũ ghi port `8080`, nhưng `application.properties` và Docker Compose hiện tại đều cấu hình ứng dụng chạy port **6699**.

Swagger hỗ trợ:

- Xem danh sách API.
- Xem Request/Response.
- Gửi request trực tiếp.
- Kiểm thử CRUD.
- Kiểm tra response lỗi.

---

## 13. ⚙️ Cấu hình MySQL Local

File:

```text
src/main/resources/application.properties
```

Cấu hình hiện tại:

```properties
spring.application.name=HTQUANLYBANHANG

spring.datasource.url=jdbc:mysql://localhost:3306/sale_management?useSSL=false&serverTimezone=Asia/Ho_Chi_Minh&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root123
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

server.port=6699
```

### Ý nghĩa quan trọng

- Database: `sale_management`
- MySQL host khi chạy Local: `localhost`
- MySQL port: `3306`
- Username: `root`
- Password hiện tại trong source: `root123`
- Hibernate: `validate` — kiểm tra Entity khớp schema hiện có, không tự tạo/cập nhật bảng.
- Server: `6699`

### ⚠️ Bảo mật

Không nên commit mật khẩu database thật vào repository công khai.

Trong môi trường thực tế nên dùng:

- Environment Variables.
- `.env`.
- Secret Manager.
- Docker Secrets hoặc giải pháp quản lý secrets phù hợp.

---

## 14. 🚀 Chạy project trên Local

### Bước 1: Clone project

```bash
git clone https://github.com/tranthailong/HTQUANLYBANHANG.git
cd HTQUANLYBANHANG
```

### Bước 2: Chuẩn bị

Cần có:

- JDK 21.
- Maven hoặc Maven Wrapper.
- MySQL 8.x.
- IntelliJ IDEA hoặc IDE tương đương.

### Bước 3: Tạo database

Có thể tạo database bằng:

```sql
CREATE DATABASE sale_management
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

Sau đó chạy:

```text
database/sale_management.sql
```

> Vì file SQL có `DROP DATABASE IF EXISTS`, hãy lưu ý dữ liệu cũ sẽ bị xóa khi chạy toàn bộ file.

### Bước 4: Cấu hình MySQL

Mở:

```text
src/main/resources/application.properties
```

và thay đổi:

```properties
spring.datasource.username=root
spring.datasource.password=root123
```

theo tài khoản MySQL trên máy của bạn.

### Bước 5: Build

Windows:

```powershell
.\mvnw.cmd clean package
```

Hoặc nếu đã cài Maven:

```powershell
mvn clean package
```

### Bước 6: Chạy ứng dụng

Trong IntelliJ chạy:

```text
HtquanlybanhangApplication.java
```

Hoặc:

```powershell
.\mvnw.cmd spring-boot:run
```

### Bước 7: Mở giao diện

```text
http://localhost:6699/
```

### Bước 8: Mở Swagger

```text
http://localhost:6699/swagger-ui/index.html
```

---

## 15. 🐳 Docker Compose

Source hiện có file:

```text
docker-compose.yml
```

Cấu hình thực tế sử dụng:

```yaml
version: '3.8'

services:
  db:
    image: mysql:8.0
    container_name: sale_management_db
    restart: always
    environment:
      MYSQL_DATABASE: sale_management
      MYSQL_ROOT_PASSWORD: root123
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  app:
    build: .
    container_name: htquanlybanhang_app
    restart: always
    ports:
      - "6699:6699"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/sale_management?useSSL=false&serverTimezone=Asia/Ho_Chi_Minh&allowPublicKeyRetrieval=true
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=root123
      - SERVER_PORT=6699
    depends_on:
      - db

volumes:
  mysql_data:
```

### Kiến trúc Docker

```text
Windows Host
│
├── localhost:6699
│       ↓
│   htquanlybanhang_app
│       ↓
│   db:3306
│       ↓
│   sale_management_db
│       ↓
│   sale_management
│
└── localhost:3306
        ↓
    sale_management_db
```

### Điểm quan trọng

Trong Docker, Spring Boot **không dùng `localhost:3306` để kết nối MySQL**.

Nó dùng:

```text
jdbc:mysql://db:3306/sale_management
```

vì `db` là tên service MySQL trong Docker Compose.

### Chạy Docker Compose

Từ thư mục project:

```powershell
docker compose down
docker compose up -d --build
```

Kiểm tra:

```powershell
docker ps
```

Kết quả mong muốn gồm:

```text
sale_management_db
    0.0.0.0:3306->3306/tcp

htquanlybanhang_app
    0.0.0.0:6699->6699/tcp
```

Kiểm tra log:

```powershell
docker logs sale_management_db
docker logs htquanlybanhang_app
```

### Truy cập sau khi Docker chạy

Web:

```text
http://localhost:6699/
```

Swagger:

```text
http://localhost:6699/swagger-ui/index.html
```

MySQL từ máy Windows:

```text
Host: localhost
Port: 3306
Database: sale_management
Username: root
Password: root123
```

### ⚠️ Lưu ý về ZIP hiện tại

ZIP được kiểm tra **không có `Dockerfile`**, trong khi `docker-compose.yml` dùng:

```yaml
app:
  build: .
```

Vì vậy, nếu clone đúng ZIP này sang một máy mới và chạy `docker compose up --build`, cần có `Dockerfile` ở thư mục gốc trước khi build app container.

---

## 16. 🧪 Kiểm thử

Có thể kiểm thử bằng:

- Swagger UI.
- Postman.
- IntelliJ HTTP Client.

### Category

- Thêm category.
- Xem danh sách.
- Xem theo ID.
- Cập nhật.
- Xóa.

### Product

- Thêm product.
- Xem danh sách.
- Xem theo ID.
- Cập nhật.
- Xóa.
- Kiểm tra tồn kho trong nghiệp vụ đơn hàng.

### Customer

- Thêm customer.
- Xem danh sách.
- Xem theo ID.
- Cập nhật.
- Xóa.

### Order

- Tạo order.
- Xem danh sách.
- Xem theo ID.
- Cập nhật.
- Xóa/hủy order.
- Kiểm tra customer.
- Kiểm tra tồn kho.
- Hoàn lại tồn kho khi xóa đơn theo logic service hiện tại.

### Order Detail

- Xem toàn bộ order detail.
- Xem theo ID.
- Xem theo `orderId`.
- Thêm vào order.
- Cập nhật.
- Xóa.

---

## 17. 🔄 Luồng xử lý đơn hàng

```text
Client
   │
   │ POST /api/orders
   ▼
OrderController
   │
   ▼
OrderRequest
   │
   ▼
OrderService
   │
   ├── Kiểm tra Customer
   │
   ├── Kiểm tra Product / tồn kho
   │
   ├── Xử lý nghiệp vụ Order
   │
   └── Lưu Order
          │
          ▼
   OrderRepository
          │
          ▼
      Hibernate
          │
          ▼
        MySQL
```

Quan hệ nghiệp vụ:

```text
Order
  │
  └── OrderDetail
        ├── Product
        ├── Quantity
        └── Price
```

---

## 18. 🔗 Các module chính

| Module | Chức năng |
|---|---|
| Category | Quản lý danh mục |
| Product | Quản lý sản phẩm và tồn kho |
| Customer | Quản lý khách hàng |
| Order | Quản lý đơn hàng |
| Order Detail | Quản lý sản phẩm trong đơn hàng |
| Dashboard | Trang tổng quan |
| Exception | Xử lý lỗi tập trung |
| Swagger | Kiểm thử REST API |

---

## 19. 📈 Hướng phát triển

Có thể mở rộng hệ thống với:

- Đăng nhập/đăng xuất.
- Spring Security.
- JWT.
- Phân quyền Admin/User.
- Quản lý trạng thái đơn hàng.
- Thống kê doanh thu.
- Dashboard nâng cao.
- Tìm kiếm sản phẩm.
- Lọc sản phẩm.
- Phân trang.
- Upload hình ảnh.
- Quản lý nhập/xuất kho.
- Thanh toán trực tuyến.
- Hoàn thiện Dockerfile và quy trình Docker Compose.
- Triển khai Cloud.
- Viết thêm unit test/integration test.

---

## 20. 📌 Trạng thái dự án

| Hạng mục | Trạng thái |
|---|---|
| Spring Boot Backend | ✅ |
| Entity | ✅ |
| Repository | ✅ |
| Service Interface | ✅ |
| Service Implementation | ✅ |
| Controller | ✅ |
| DTO Request | ✅ |
| DTO Response | ✅ |
| Mapper | ✅ |
| Exception Handler | ✅ |
| REST API CRUD | ✅ |
| MySQL | ✅ |
| Giao diện Web | ✅ |
| Swagger/OpenAPI dependency | ✅ |
| Git/GitHub | ✅ |
| Docker Compose | ✅ Có file |
| Dockerfile | ✅ |
| Kiểm thử toàn bộ hệ thống | ✅ |



## 21. 📖 Tài liệu tham khảo

- Java Documentation
- Spring Boot Documentation
- Spring Data JPA Documentation
- Hibernate Documentation
- MySQL Documentation
- SpringDoc OpenAPI Documentation
- Docker Documentation

---

## 22. 📄 License

Dự án được thực hiện với mục đích học tập và phục vụ môn học.

© 2026 - HỆ THỐNG QUẢN LÝ BÁN HÀNG
