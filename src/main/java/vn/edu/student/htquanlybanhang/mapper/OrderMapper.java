package vn.edu.student.htquanlybanhang.mapper;

import org.springframework.stereotype.Component;
import vn.edu.student.htquanlybanhang.dto.request.OrderRequest;
import vn.edu.student.htquanlybanhang.dto.response.OrderResponse;
import vn.edu.student.htquanlybanhang.entity.Customer;
import vn.edu.student.htquanlybanhang.entity.Order;

@Component
public class OrderMapper {

    /**
     * Order Entity -> OrderResponse
     */
    public OrderResponse toResponse(Order order) {

        if (order == null) {
            return null;
        }

        OrderResponse response = new OrderResponse();

        response.setId(order.getId());
        response.setOrderDate(order.getOrderDate());
        response.setTotalAmount(order.getTotalAmount());

        if (order.getCustomer() != null) {
            response.setCustomerId(order.getCustomer().getId());
            response.setCustomerName(order.getCustomer().getName());
        }

        return response;
    }

    /**
     * OrderRequest -> Order Entity
     *
     * Customer được Service tìm trước rồi truyền vào Mapper.
     */
    public Order toEntity(
            OrderRequest request,
            Customer customer
    ) {

        if (request == null) {
            return null;
        }

        Order order = new Order();

        order.setCustomer(customer);

        return order;
    }

    /**
     * Cập nhật Order Entity từ OrderRequest.
     *
     * Customer được Service kiểm tra và truyền vào.
     */
    public void updateEntity(
            Order order,
            OrderRequest request,
            Customer customer
    ) {

        if (order == null || request == null) {
            return;
        }

        order.setCustomer(customer);
    }
}

