package vn.edu.student.htquanlybanhang.controller;
import jakarta.validation.Valid;
import vn.edu.student.htquanlybanhang.dto.request.OrderDetailRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.student.htquanlybanhang.dto.response.ApiResponse;
import vn.edu.student.htquanlybanhang.dto.response.OrderDetailResponse;
import vn.edu.student.htquanlybanhang.service.OrderDetailService;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/order-details")
@CrossOrigin(origins = "*")
public class OrderDetailController {

    private final OrderDetailService orderDetailService;

    public OrderDetailController(OrderDetailService orderDetailService) {
        this.orderDetailService = orderDetailService;
    }

    // 1. Lấy tất cả chi tiết đơn hàng (Trả về List<OrderDetailResponse>)
    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderDetailResponse>>> getAllOrderDetails() {
        List<OrderDetailResponse> details = orderDetailService.getAllOrderDetails();
        return ResponseEntity.ok(ApiResponse.success("Lấy danh sách chi tiết đơn hàng thành công", details));
    }

    // 2. Lấy chi tiết đơn hàng theo ID (Dùng Long id)
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderDetailResponse>> getOrderDetailById(@PathVariable Long id) {
        OrderDetailResponse detail = orderDetailService.getOrderDetailById(id);
        return ResponseEntity.ok(ApiResponse.success("Lấy thông tin chi tiết đơn hàng thành công", detail));
    }

    // 3. Lấy danh sách chi tiết theo mã đơn hàng (orderId)
    @GetMapping("/order/{orderId}")
    public ResponseEntity<ApiResponse<List<OrderDetailResponse>>> getOrderDetailsByOrderId(@PathVariable Long orderId) {
        List<OrderDetailResponse> details = orderDetailService.getOrderDetailsByOrderId(orderId);
        return ResponseEntity.ok(ApiResponse.success("Lấy danh sách chi tiết theo mã đơn hàng thành công", details));
    }
    // Thêm mới chi tiết vào một đơn hàng cụ thể thông qua URL: /api/order-details/order/{orderId}
    @PostMapping("/order/{orderId}")
    public ResponseEntity<ApiResponse<OrderDetailResponse>> createOrderDetail(
            @PathVariable Long orderId,
            @Valid @RequestBody OrderDetailRequest request) {
        OrderDetailResponse response = orderDetailService.createOrderDetail(orderId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Thêm chi tiết đơn hàng thành công", response));
    }

    // Cập nhật chi tiết đơn hàng
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderDetailResponse>> updateOrderDetail(
            @PathVariable Long id,
            @Valid @RequestBody OrderDetailRequest request) {
        OrderDetailResponse response = orderDetailService.updateOrderDetail(id, request);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật chi tiết đơn hàng thành công", response));
    }

    // Xóa chi tiết đơn hàng (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteOrderDetail(@PathVariable Long id) {
        orderDetailService.deleteOrderDetail(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa chi tiết đơn hàng thành công", null));
    }
}