package vn.edu.student.htquanlybanhang.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.student.htquanlybanhang.dto.request.OrderRequest;
import vn.edu.student.htquanlybanhang.dto.response.ApiResponse;
import vn.edu.student.htquanlybanhang.dto.response.OrderResponse;
import vn.edu.student.htquanlybanhang.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // 1. Lấy tất cả đơn hàng (Trả về List<OrderResponse>)
    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getAllOrders() {
        List<OrderResponse> orders = orderService.getAllOrders();
        return ResponseEntity.ok(ApiResponse.success("Lấy danh sách đơn hàng thành công", orders));
    }

    // 2. Lấy đơn hàng theo ID (Dùng Long id)
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderById(@PathVariable Long id) {
        OrderResponse order = orderService.getOrderById(id);
        return ResponseEntity.ok(ApiResponse.success("Lấy thông tin đơn hàng thành công", order));
    }

    // 3. Tạo đơn hàng mới (Dùng OrderRequest và trả về OrderResponse)
    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> createOrder(@Valid @RequestBody OrderRequest request) {
        OrderResponse createdOrder = orderService.createOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Tạo đơn hàng thành công", createdOrder));
    }

    // 4. Xóa/Hủy đơn hàng (Dùng Long id và hoàn lại tồn kho)
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa/Hủy đơn hàng thành công và đã hoàn lại tồn kho", null));
    }
    // 5. Cập nhật đơn hàng
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> updateOrder(@PathVariable Long id, @Valid @RequestBody OrderRequest request) {
        OrderResponse updatedOrder = orderService.updateOrder(id, request);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật đơn hàng thành công", updatedOrder));
    }
}