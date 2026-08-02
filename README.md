# 🛒 HỆ THỐNG QUẢN LÝ BÁN HÀNG

Backend + giao diện quản trị cho hệ thống quản lý bán hàng, được xây dựng bằng **Java Spring Boot**, **Spring Data JPA/Hibernate**, **MySQL**, **Thymeleaf/HTML/CSS/JavaScript** và cung cấp **RESTful API** để quản lý danh mục, sản phẩm, khách hàng, đơn hàng và chi tiết đơn hàng.

> **Repository:** https://github.com/tranthailong/HTQUANLYBANHANG

---

## 1. 📌 Giới thiệu

Dự án **HTQUANLYBANHANG** là hệ thống quản lý bán hàng phục vụ mục đích học tập và thực hành phát triển ứng dụng web với Spring Boot.

Hệ thống hiện có:

- Quản lý danh mục sản phẩm.
- Quản lý sản phẩm.
- Quản lý khách hàng.
- Quản lý đơn hàng.
- Quản lý chi tiết đơn hàng.
- Giao diện quản trị trên trình duyệt.
- REST API CRUD.
- Swagger/OpenAPI để kiểm thử API.
- Xử lý lỗi tập trung.
- Kiểm tra tồn kho khi xử lý nghiệp vụ đơn hàng.
- Kết nối MySQL bằng Spring Data JPA/Hibernate.
- Dockerfile và Docker Compose cho môi trường triển khai.

---

## 2. 🎯 Mục tiêu

Dự án được thực hiện nhằm:

- Thực hành Java và Spring Boot.
- Xây dựng REST API.
- Sử dụng Spring Data JPA và Hibernate.
- Thiết kế và thao tác với cơ sở dữ liệu quan hệ MySQL.
- Áp dụng kiến trúc nhiều tầng.
- Sử dụng Entity, DTO, Mapper, Repository và Service.
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
| Spring Web | REST API |
| Spring Data JPA | Truy cập Database |
| Hibernate | ORM |
| MySQL 8 | Cơ sở dữ liệu |
| Maven | Quản lý dependency và build |
| Thymeleaf | Render trang web |
| HTML/CSS/JavaScript | Giao diện |
| Lombok | Giảm code Java lặp |
| Spring Validation | Validation dữ liệu |
| SpringDoc OpenAPI | Swagger |
| Docker | Đóng gói ứng dụng |
| Docker Compose | Quản lý nhiều container |
| Git/GitHub | Quản lý source code |
| IntelliJ IDEA | Môi trường phát triển |

---

## 4. 🏗️ Kiến trúc hệ thống

Dự án áp dụng kiến trúc nhiều tầng:

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
              │ Business     │
              │ Logic        │
              └──────┬───────┘
                     │
                     ▼
                 MAPPER
             Entity ↔ DTO
                     │
                     ▼
              ┌──────────────┐
              │ REPOSITORY   │
              │ Spring Data  │
              │ JPA          │
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
Service
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
Service
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

## 5. 📁 Cấu trúc thư mục

Cấu trúc thực tế của project:

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
│   │   │   └── HtquanlybanhangApplication.java
│   │   │
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── css/
│   │       │   └── jss/
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
│
├── Dockerfile
├── docker-compose.yml
├── pom.xml
├── mvnw
├── mvnw.cmd
└── .gitignore
```

---

## 6. 🗄️ Thiết kế cơ sở dữ liệu

### Database

```text
sale_management
```

Database gồm 5 bảng chính:

```text
categories
products
customers
orders
order_details
```

### Quan hệ

```text
categories 1 ───────── N products

customers  1 ───────── N orders

orders     1 ───────── N order_details

products   1 ───────── N order_details
```

### Sơ đồ

```text
┌──────────────────┐
│    categories    │
├──────────────────┤
│ PK id            │
│ name             │
│ description      │
└────────┬─────────┘
         │ 1
         │
         │ N
         ▼
┌──────────────────┐
│     products     │
├──────────────────┤
│ PK id            │
│ name             │
│ big              │
│ quantity         │
│ description      │
│ image            │
│ FK category_id   │
└────────┬─────────┘
         │
         │ 1
         │
         │ N
         ▼
┌──────────────────┐
│  order_details   │
├──────────────────┤
│ PK id            │
│ quantity         │
│ price            │
│ FK order_id      │
│ FK product_id    │
└────────┬─────────┘
         │ N
         │
         │ 1
         ▼
┌──────────────────┐
│      orders      │
├──────────────────┤
│ PK id            │
│ order_date       │
│ total_amount     │
│ FK customer_id   │
└────────┬─────────┘
         │ N
         │
         │ 1
         ▼
┌──────────────────┐
│    customers     │
├──────────────────┤
│ PK id            │
│ name             │
│ email            │
│ phone            │
│ address          │
└──────────────────┘
```

### Lưu ý về cột `big`

Trong code Java và SQL hiện tại của project, trường giá sản phẩm đang có tên:

```text
Product.big
```

và database sử dụng:

```sql
big DOUBLE NOT NULL
```

Không phải `price` như một số phiên bản README cũ.

---

## 7. 📊 Dữ liệu mẫu

File SQL nằm tại:

```text
database/sale_management.sql
```

Dữ liệu mẫu hiện có:

- 10 danh mục.
- 31 sản phẩm.
- 13 khách hàng.
- 15 đơn hàng.
- 21 chi tiết đơn hàng.

Có thể chạy SQL để tạo database và dữ liệu mẫu.

> **Lưu ý:** file SQL hiện tại có phần kiểm tra/xóa bảng ở cuối file. Nếu muốn tạo database sạch từ đầu, nên chạy phần tạo bảng và INSERT trước; không chạy phần DROP `products`/`order_details` cuối file sau khi đã import dữ liệu, trừ khi có mục đích sửa schema.

---

## 8. 🔌 REST API

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

### Order Detail

```text
GET     /api/order-details
GET     /api/order-details/{id}
POST    /api/order-details
PUT     /api/order-details/{id}
DELETE  /api/order-details/{id}
```

---

## 9. 🖥️ Giao diện Web

Project có giao diện quản trị được phục vụ trực tiếp từ Spring Boot.

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

Frontend sử dụng:

- HTML
- CSS
- JavaScript
- Thymeleaf
- REST API của Spring Boot

Các module JavaScript:

```text
dashboard.js
products.js
categories.js
customers.js
orders.js
order-details.js
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

Mapper đảm nhiệm chuyển đổi giữa:

```text
Request DTO → Entity
Entity → Response DTO
```

Việc sử dụng DTO giúp hạn chế việc expose trực tiếp Entity ra API.

---

## 11. ⚠️ Exception Handling

Project có xử lý exception tập trung thông qua:

```text
GlobalExceptionHandler
```

Các exception chính:

```text
ResourceNotFoundException
InsufficientStockException
```

Mục đích:

- Xử lý dữ liệu không tồn tại.
- Kiểm tra lỗi tồn kho.
- Chuẩn hóa response lỗi.
- Giảm code xử lý lỗi lặp lại trong Controller.

---

## 12. 📚 Swagger / OpenAPI

Project sử dụng SpringDoc OpenAPI.

Sau khi chạy ứng dụng:

```text
http://localhost:8080/swagger-ui/index.html
```

Swagger hỗ trợ:

- Xem danh sách API.
- Xem Request/Response.
- Gửi request trực tiếp.
- Kiểm thử CRUD.
- Kiểm tra lỗi API.

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

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

server.port=8080
```

### ⚠️ Bảo mật

Không nên commit password database thật lên repository công khai.

Trong môi trường thực tế nên dùng:

- Environment Variables.
- `.env`.
- Secret Manager.
- Docker Secrets hoặc hệ thống quản lý secrets phù hợp.

---

## 14. 🚀 Chạy project trên Local

### Bước 1: Clone project

```bash
git clone https://github.com/tranthailong/HTQUANLYBANHANG.git
cd HTQUANLYBANHANG
```

### Bước 2: Chuẩn bị

Cần có:

- JDK 21
- Maven hoặc Maven Wrapper
- MySQL 8.x
- IntelliJ IDEA hoặc IDE tương đương

### Bước 3: Tạo database

Mở MySQL và chạy:

```sql
CREATE DATABASE sale_management
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

Sau đó chạy file:

```text
database/sale_management.sql
```

### Bước 4: Cấu hình username/password

Mở:

```text
src/main/resources/application.properties
```

và sửa:

```properties
spring.datasource.username=root
spring.datasource.password=root123
```

thành thông tin MySQL trên máy của bạn.

### Bước 5: Build

Có thể sử dụng Maven Wrapper:

Windows:

```powershell
.\mvnw.cmd clean package
```

Hoặc Maven:

```bash
mvn clean package
```

### Bước 6: Chạy ứng dụng

Trong IntelliJ chạy:

```text
HtquanlybanhangApplication.java
```

Hoặc:

```bash
.\mvnw.cmd spring-boot:run
```

### Bước 7: Mở giao diện

```text
http://localhost:8080/
```

### Bước 8: Mở Swagger

```text
http://localhost:8080/swagger-ui/index.html
```

---

## 15. 🐳 Docker

Project hiện có:

```text
Dockerfile
docker-compose.yml
```

Dockerfile sử dụng:

```text
Eclipse Temurin JDK 17 Alpine
```

và ứng dụng chạy port:

```text
8080
```

### Build JAR trước

```bash
mvn clean package
```

Sau đó:

```bash
docker compose up --build
```

Kiểm tra:

```bash
docker ps
```

Dừng:

```bash
docker compose down
```

### ⚠️ Lưu ý Docker hiện tại

Cấu hình Docker Compose trong source hiện sử dụng database:

```text
htquanlybanhang
```

trong khi cấu hình local và file SQL sử dụng:

```text
sale_management
```

Vì vậy **không nên xem Docker Compose là môi trường đã đồng bộ hoàn toàn với Local** cho đến khi thống nhất tên database và kiểm thử end-to-end.

Nếu chạy Docker, cần đồng bộ:

```text
MYSQL_DATABASE
SPRING_DATASOURCE_URL
database/schema
```

về cùng một database.

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
- Kiểm tra tồn kho.

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
- Xóa.
- Kiểm tra customer.
- Kiểm tra nghiệp vụ tồn kho khi có liên quan.

### Order Detail

- Thêm chi tiết.
- Xem danh sách.
- Xem theo ID.
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

Quan hệ:

```text
Order
  │
  └── OrderDetail
        ├── Product
        └── Quantity + Price
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
| Dashboard | Tổng quan hệ thống |
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
- Docker hoàn chỉnh với database đồng bộ.
- Triển khai Cloud.

---

## 20. 📌 Trạng thái dự án

| Hạng mục | Trạng thái |
|---|---|
| Spring Boot Backend | ✅ |
| Entity | ✅ |
| Repository | ✅ |
| Service | ✅ |
| Controller | ✅ |
| DTO Request | ✅ |
| DTO Response | ✅ |
| Mapper | ✅ |
| Exception Handler | ✅ |
| REST API CRUD | ✅ |
| MySQL | ✅ |
| Giao diện Web | ✅ |
| Swagger/OpenAPI | ✅ |
| Git/GitHub | ✅ |
| Dockerfile | ✅ Có file |
| Docker Compose | ⚠️ Cần đồng bộ DB và kiểm thử |
| Kiểm thử toàn bộ hệ thống | 🔄 Đang hoàn thiện |

> Trạng thái nên được cập nhật lại trước khi nộp dự án dựa trên kết quả kiểm thử thực tế.

---

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
