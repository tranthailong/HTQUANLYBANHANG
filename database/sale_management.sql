
-- ============================================================
-- HỆ THỐNG QUẢN LÝ BÁN HÀNG
-- DATABASE: sale_management
-- GIAI ĐOẠN 1: DATABASE
-- ============================================================

-- ============================================================
-- 1. XÓA DATABASE CŨ VÀ TẠO DATABASE MỚI
-- ============================================================

DROP DATABASE IF EXISTS sale_management;

CREATE DATABASE sale_management
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE sale_management;


-- ============================================================
-- 2. BẢNG CATEGORIES
-- ============================================================

CREATE TABLE categories (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(255) NOT NULL,
                            description VARCHAR(500)
);


-- ============================================================
-- 3. BẢNG PRODUCTS
-- ============================================================

CREATE TABLE products (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          price DECIMAL(15,2) NOT NULL DEFAULT 0,
                          quantity INT NOT NULL DEFAULT 0,
                          description TEXT,
                          image VARCHAR(255),
                          category_id BIGINT NOT NULL,

                          CONSTRAINT fk_product_category
                              FOREIGN KEY (category_id)
                                  REFERENCES categories(id)
                                  ON UPDATE CASCADE
                                  ON DELETE RESTRICT
);


-- ============================================================
-- 4. BẢNG CUSTOMERS
-- ============================================================

CREATE TABLE customers (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           email VARCHAR(255) UNIQUE,
                           phone VARCHAR(20),
                           address VARCHAR(255)
);


-- ============================================================
-- 5. BẢNG ORDERS
-- ============================================================

CREATE TABLE orders (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        total_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
                        customer_id BIGINT NOT NULL,

                        CONSTRAINT fk_order_customer
                            FOREIGN KEY (customer_id)
                                REFERENCES customers(id)
                                ON UPDATE CASCADE
                                ON DELETE RESTRICT
);


-- ============================================================
-- 6. BẢNG ORDER_DETAILS
-- ============================================================

CREATE TABLE order_details (
                               id BIGINT AUTO_INCREMENT PRIMARY KEY,
                               quantity INT NOT NULL,
                               price DECIMAL(15,2) NOT NULL,
                               order_id BIGINT NOT NULL,
                               product_id BIGINT NOT NULL,

                               CONSTRAINT fk_orderdetail_order
                                   FOREIGN KEY (order_id)
                                       REFERENCES orders(id)
                                       ON UPDATE CASCADE
                                       ON DELETE CASCADE,

                               CONSTRAINT fk_orderdetail_product
                                   FOREIGN KEY (product_id)
                                       REFERENCES products(id)
                                       ON UPDATE CASCADE
                                       ON DELETE RESTRICT
);


-- ============================================================
-- 7. DỮ LIỆU CATEGORIES
-- ============================================================

INSERT INTO categories (name, description) VALUES

                                               ('Điện thoại',
                                                'Các dòng điện thoại thông minh chính hãng'),

                                               ('Laptop',
                                                'Laptop văn phòng, học tập, gaming và đồ họa'),

                                               ('Tablet',
                                                'Máy tính bảng phục vụ học tập và giải trí'),

                                               ('Phụ kiện',
                                                'Tai nghe, cáp sạc, củ sạc và phụ kiện điện thoại'),

                                               ('Smartwatch',
                                                'Đồng hồ thông minh theo dõi sức khỏe và thể thao'),

                                               ('Màn hình',
                                                'Màn hình máy tính văn phòng và gaming'),

                                               ('Bàn phím',
                                                'Bàn phím cơ và bàn phím văn phòng'),

                                               ('Chuột',
                                                'Chuột máy tính văn phòng và gaming'),

                                               ('Sạc dự phòng',
                                                'Pin sạc dự phòng dung lượng cao'),

                                               ('Camera',
                                                'Camera an ninh và camera gia đình');


-- ============================================================
-- 8. DỮ LIỆU PRODUCTS
-- ============================================================

INSERT INTO products
(name, price, quantity, description, image, category_id)
VALUES

-- Điện thoại
('iPhone 16 Pro', 32990000, 20,
 'Apple iPhone 16 Pro chính hãng',
 'iphone16pro.jpg', 1),

('iPhone 16', 25990000, 25,
 'Apple iPhone 16 chính hãng',
 'iphone16.jpg', 1),

('Samsung Galaxy S25 Ultra', 28990000, 15,
 'Flagship cao cấp Samsung',
 's25ultra.jpg', 1),

('Samsung Galaxy S25', 21990000, 18,
 'Điện thoại Samsung Galaxy S25',
 's25.jpg', 1),

('Xiaomi 15', 16990000, 20,
 'Smartphone Xiaomi hiệu năng cao',
 'xiaomi15.jpg', 1),

-- Laptop
('MacBook Pro M4', 55990000, 10,
 'MacBook Pro chip Apple M4',
 'macbookm4.jpg', 2),

('MacBook Air M3', 29990000, 15,
 'MacBook Air chip Apple M3',
 'macbookairm3.jpg', 2),

('ASUS ROG Strix G16', 38990000, 12,
 'Laptop gaming ASUS ROG',
 'rogstrix.jpg', 2),

('Acer Nitro V15', 24990000, 15,
 'Laptop gaming Acer Nitro',
 'acernitro.jpg', 2),

('Lenovo ThinkPad E14', 21990000, 14,
 'Laptop văn phòng Lenovo ThinkPad',
 'thinkpad.jpg', 2),

-- Tablet
('iPad Air M3', 19990000, 18,
 'Máy tính bảng Apple iPad Air M3',
 'ipadair.jpg', 3),

('iPad Gen 10', 10990000, 20,
 'Apple iPad thế hệ 10',
 'ipad10.jpg', 3),

('Samsung Galaxy Tab S10', 18990000, 12,
 'Tablet cao cấp Samsung',
 'tabs10.jpg', 3),

-- Phụ kiện
('AirPods Pro 2', 5990000, 50,
 'Tai nghe không dây chống ồn Apple',
 'airpodspro2.jpg', 4),

('Sony WH-1000XM5', 7990000, 25,
 'Tai nghe chống ồn cao cấp Sony',
 'sonyxm5.jpg', 4),

('Anker USB-C Cable', 450000, 80,
 'Cáp sạc USB-C Anker',
 'anker-cable.jpg', 4),

('Anker 65W Charger', 1290000, 45,
 'Củ sạc nhanh Anker 65W',
 'anker65w.jpg', 4),

-- Smartwatch
('Apple Watch Series 10', 11990000, 20,
 'Đồng hồ thông minh Apple Watch',
 'applewatch10.jpg', 5),

('Samsung Galaxy Watch 7', 7990000, 22,
 'Smartwatch Samsung Galaxy Watch',
 'watch7.jpg', 5),

-- Màn hình
('LG UltraGear 27 inch', 6990000, 18,
 'Màn hình gaming LG 27 inch',
 'lgultragear.jpg', 6),

('Samsung Odyssey G5', 8490000, 15,
 'Màn hình gaming Samsung Odyssey',
 'odysseyg5.jpg', 6),

('Dell UltraSharp 27', 9990000, 10,
 'Màn hình Dell chuyên văn phòng',
 'dellultrasharp.jpg', 6),

-- Bàn phím
('Keychron K2', 2190000, 30,
 'Bàn phím cơ không dây Keychron',
 'keychronk2.jpg', 7),

('Logitech MX Keys', 2490000, 25,
 'Bàn phím văn phòng Logitech',
 'mxkeys.jpg', 7),

-- Chuột
('Logitech G502 Hero', 1290000, 40,
 'Chuột gaming Logitech G502',
 'g502.jpg', 8),

('Logitech MX Master 3S', 2390000, 30,
 'Chuột không dây Logitech MX Master',
 'mxmaster3s.jpg', 8),

-- Sạc dự phòng
('Anker PowerCore 20000', 1590000, 35,
 'Pin sạc dự phòng 20000mAh',
 'powercore20000.jpg', 9),

('Baseus 30000mAh', 1390000, 30,
 'Pin sạc dự phòng Baseus 30000mAh',
 'baseus30000.jpg', 9),

-- Camera
('Xiaomi Camera C300', 1090000, 25,
 'Camera an ninh Xiaomi',
 'xiaomic300.jpg', 10),

('Ezviz C6N', 890000, 30,
 'Camera gia đình Ezviz',
 'ezvizc6n.jpg', 10);


-- ============================================================
-- 9. DỮ LIỆU CUSTOMERS
-- ============================================================

INSERT INTO customers
(name, email, phone, address)
VALUES

    ('Nguyễn Văn An',
     'an.nguyen@gmail.com',
     '0901234567',
     'Quận 1, TP.HCM'),

    ('Trần Thị Bình',
     'binh.tran@gmail.com',
     '0912345678',
     'Quận 3, TP.HCM'),

    ('Lê Hoàng Cường',
     'cuong.le@gmail.com',
     '0988888888',
     'Thủ Đức, TP.HCM'),

    ('Phạm Minh Đức',
     'duc.pham@gmail.com',
     '0905555555',
     'Quận 10, TP.HCM'),

    ('Hoàng Thị Lan',
     'lan.hoang@gmail.com',
     '0916666666',
     'Quận Bình Thạnh, TP.HCM'),

    ('Võ Thành Nam',
     'nam.vo@gmail.com',
     '0977777777',
     'Quận 7, TP.HCM'),

    ('Đặng Ngọc Mai',
     'mai.dang@gmail.com',
     '0908888888',
     'Quận Tân Bình, TP.HCM'),

    ('Bùi Quốc Huy',
     'huy.bui@gmail.com',
     '0939999999',
     'Quận Gò Vấp, TP.HCM'),

    ('Nguyễn Thị Hoa',
     'hoa.nguyen@gmail.com',
     '0961111111',
     'Quận Phú Nhuận, TP.HCM'),

    ('Trần Minh Khang',
     'khang.tran@gmail.com',
     '0942222222',
     'Quận 12, TP.HCM'),

    ('Lê Thanh Tùng',
     'tung.le@gmail.com',
     '0953333333',
     'Quận 6, TP.HCM'),

    ('Phan Gia Bảo',
     'bao.phan@gmail.com',
     '0974444444',
     'Quận 5, TP.HCM'),

    ('Ngô Minh Anh',
     'anh.ngo@gmail.com',
     '0985555555',
     'Quận 8, TP.HCM'),

    ('Đỗ Hoàng Long',
     'long.do@gmail.com',
     '0906666666',
     'Thành phố Thủ Đức, TP.HCM'),

    ('Vũ Khánh Linh',
     'linh.vu@gmail.com',
     '0917777777',
     'Quận 11, TP.HCM');


-- ============================================================
-- 10. DỮ LIỆU ORDERS
-- ============================================================

INSERT INTO orders
(order_date, total_amount, customer_id)
VALUES

    ('2026-07-20 09:30:00', 38990000, 1),

    ('2026-07-21 10:15:00', 34980000, 2),

    ('2026-07-22 14:20:00', 19990000, 3),

    ('2026-07-23 08:45:00', 5990000, 4),

    ('2026-07-24 11:10:00', 41980000, 5),

    ('2026-07-25 13:30:00', 1290000, 6),

    ('2026-07-26 15:00:00', 18990000, 7),

    ('2026-07-27 09:20:00', 10990000, 8),

    ('2026-07-28 16:40:00', 1590000, 9),

    ('2026-07-29 10:05:00', 24990000, 10),

    ('2026-07-30 14:30:00', 7990000, 11),

    ('2026-07-31 09:15:00', 55990000, 12),

    ('2026-08-01 11:45:00', 15480000, 13),

    ('2026-08-01 14:10:00', 10990000, 14),

    ('2026-08-02 09:00:00', 3780000, 15);


-- ============================================================
-- 11. DỮ LIỆU ORDER_DETAILS
-- ============================================================

INSERT INTO order_details
(quantity, price, order_id, product_id)
VALUES

-- Order 1
(1, 38990000, 1, 8),

-- Order 2
(1, 28990000, 2, 3),
(1, 5990000, 2, 14),

-- Order 3
(1, 19990000, 3, 11),

-- Order 4
(1, 5990000, 4, 14),

-- Order 5
(1, 32990000, 5, 1),
(1, 899000, 5, 30),
(1, 450000, 5, 16),
(1, 3490000, 5, 24),

-- Order 6
(1, 1290000, 6, 25),

-- Order 7
(1, 18990000, 7, 13),

-- Order 8
(1, 10990000, 8, 12),

-- Order 9
(1, 1590000, 9, 27),

-- Order 10
(1, 24990000, 10, 9),

-- Order 11
(1, 7990000, 11, 15),

-- Order 12
(1, 55990000, 12, 6),

-- Order 13
(1, 1390000, 13, 28),
(1, 1290000, 13, 17),
(1, 1090000, 13, 29),
(1, 450000, 13, 16),

-- Order 14
(1, 10990000, 14, 12),

-- Order 15
(1, 1290000, 15, 25),
(1, 2490000, 15, 26);


-- ============================================================
-- 12. KIỂM TRA DATABASE
-- ============================================================

SHOW TABLES;

SELECT * FROM categories;

SELECT * FROM products;

SELECT * FROM customers;

SELECT * FROM orders;

SELECT * FROM order_details;


-- ============================================================
-- 13. KIỂM TRA SỐ LƯỢNG DỮ LIỆU
-- ============================================================

SELECT COUNT(*) AS total_categories
FROM categories;

SELECT COUNT(*) AS total_products
FROM products;

SELECT COUNT(*) AS total_customers
FROM customers;

SELECT COUNT(*) AS total_orders
FROM orders;

SELECT COUNT(*) AS total_order_details
FROM order_details;


-- ============================================================
-- 14. KIỂM TRA QUAN HỆ CATEGORY - PRODUCT
-- ============================================================

SELECT
    p.id,
    p.name AS product_name,
    p.price,
    p.quantity,
    c.name AS category_name
FROM products p
         JOIN categories c
              ON p.category_id = c.id
ORDER BY p.id;


-- ============================================================
-- 15. KIỂM TRA ĐƠN HÀNG
-- ============================================================

SELECT
    o.id AS order_id,
    o.order_date,
    c.name AS customer_name,
    o.total_amount
FROM orders o
         JOIN customers c
              ON o.customer_id = c.id
ORDER BY o.id;


-- ============================================================
-- 16. KIỂM TRA CHI TIẾT ĐƠN HÀNG
-- ============================================================

SELECT
    od.id,
    od.order_id,
    p.name AS product_name,
    od.quantity,
    od.price,
    (od.quantity * od.price) AS subtotal
FROM order_details od
         JOIN products p
              ON od.product_id = p.id
ORDER BY od.order_id, od.id;


-- ============================================================
-- 17. KIỂM TRA TỔNG TIỀN ORDER
-- ============================================================

SELECT
    o.id AS order_id,
    o.total_amount AS stored_total,
    SUM(od.quantity * od.price) AS calculated_total
FROM orders o
         JOIN order_details od
              ON o.id = od.order_id
GROUP BY o.id, o.total_amount
ORDER BY o.id;

-- ==========================================
-- 12. KIỂM TRA DATABASE
-- ==========================================

SHOW TABLES;

SELECT * FROM categories;

SELECT * FROM products;

SELECT * FROM customers;

SELECT * FROM orders;

SELECT * FROM order_details;

USE sale_management;

SELECT COUNT(*) FROM categories;
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM customers;
SELECT COUNT(*) FROM orders;
SELECT COUNT(*) FROM order_details;

