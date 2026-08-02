package vn.edu.student.htquanlybanhang.service;

import vn.edu.student.htquanlybanhang.dto.request.OrderRequest;
import vn.edu.student.htquanlybanhang.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {
    List<OrderResponse> getAllOrders();
    OrderResponse getOrderById(Long id);
    OrderResponse createOrder(OrderRequest request);
    OrderResponse updateOrder(Long id, OrderRequest request); // Đã đổi thành updateOrder cho khớp với Impl
    void deleteOrder(Long id);
}