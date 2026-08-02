package vn.edu.student.htquanlybanhang.service;

import vn.edu.student.htquanlybanhang.dto.request.OrderDetailRequest;
import vn.edu.student.htquanlybanhang.dto.response.OrderDetailResponse;

import java.util.List;

public interface OrderDetailService {
    List<OrderDetailResponse> getAllOrderDetails();
    OrderDetailResponse getOrderDetailById(Long id);
    List<OrderDetailResponse> getOrderDetailsByOrderId(Long orderId);

    // Bổ sung các phương thức CRUD độc lập
    OrderDetailResponse createOrderDetail( Long orderid, OrderDetailRequest request);
    OrderDetailResponse updateOrderDetail(Long id, OrderDetailRequest request);
    void deleteOrderDetail(Long id);
}