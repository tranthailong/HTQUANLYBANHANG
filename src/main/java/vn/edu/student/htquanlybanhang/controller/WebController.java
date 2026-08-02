package vn.edu.student.htquanlybanhang.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    // Trang chủ Dashboard
    @GetMapping({"/", "/index.html"})
    public String index() {
        return "index"; // Trỏ tới file index.html trong thư mục templates
    }

    // Trang Quản lý Sản phẩm
    @GetMapping("/products.html")
    public String products() {
        return "products"; // Trỏ tới file products.html trong thư mục templates
    }

    // Trang Quản lý Danh mục
    @GetMapping("/categories.html")
    public String categories() {
        return "categories"; // Trỏ tới file categories.html trong thư mục templates
    }

    // Trang Quản lý Khách hàng
    @GetMapping("/customers.html")
    public String customers() {
        return "customers"; // Trỏ tới file customers.html trong thư mục templates
    }

    // Trang Quản lý Đơn hàng
    @GetMapping("/orders.html")
    public String orders() {
        return "orders"; // Trỏ tới file orders.html trong thư mục templates
    }
    @GetMapping("/order-details.html")
    public String orderDetails() {
        return "order-details";
    }
}
