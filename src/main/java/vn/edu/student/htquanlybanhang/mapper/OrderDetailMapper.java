package vn.edu.student.htquanlybanhang.mapper;

import org.springframework.stereotype.Component;
import vn.edu.student.htquanlybanhang.dto.request.OrderDetailRequest;
import vn.edu.student.htquanlybanhang.dto.response.OrderDetailResponse;
import vn.edu.student.htquanlybanhang.entity.Order;
import vn.edu.student.htquanlybanhang.entity.OrderDetail;
import vn.edu.student.htquanlybanhang.entity.Product;

import java.math.BigDecimal;
import java.util.List;

@Component
public class OrderDetailMapper {

    /**
     * OrderDetail Entity -> OrderDetailResponse
     */
    public OrderDetailResponse toResponse(OrderDetail orderDetail) {

        if (orderDetail == null) {
            return null;
        }

        OrderDetailResponse response = new OrderDetailResponse();

        response.setId(orderDetail.getId());

        if (orderDetail.getProduct() != null) {
            response.setProductId(orderDetail.getProduct().getId());
            response.setProductName(orderDetail.getProduct().getName());
        }

        response.setPrice(orderDetail.getPrice());
        response.setQuantity(orderDetail.getQuantity());

        if (orderDetail.getPrice() != null
                && orderDetail.getQuantity() != null) {

            response.setSubTotal(
                    orderDetail.getPrice()
                            .multiply(BigDecimal.valueOf(orderDetail.getQuantity()))
            );

        } else {
            response.setSubTotal(BigDecimal.ZERO);
        }

        return response;
    }

    /**
     * Danh sách Entity -> Danh sách Response
     */
    public List<OrderDetailResponse> toResponseList(
            List<OrderDetail> orderDetails
    ) {

        if (orderDetails == null) {
            return List.of();
        }

        return orderDetails.stream()
                .map(this::toResponse)
                .toList();
    }

    /**
     * OrderDetailRequest -> OrderDetail Entity
     *
     * Product và Order được Service tìm trước
     * rồi truyền vào Mapper.
     */
    public OrderDetail toEntity(
            OrderDetailRequest request,
            Order order,
            Product product
    ) {

        if (request == null) {
            return null;
        }

        OrderDetail orderDetail = new OrderDetail();

        orderDetail.setOrder(order);
        orderDetail.setProduct(product);
        orderDetail.setQuantity(request.getQuantity());

        /*
         * Giá được lấy từ Product trong Database,
         * KHÔNG lấy giá từ Client.
         */
        if (product != null) {
            orderDetail.setPrice(product.getPrice());
        }

        return orderDetail;
    }

    /**
     * Cập nhật OrderDetail Entity từ Request.
     */
    public void updateEntity(
            OrderDetail orderDetail,
            OrderDetailRequest request,
            Order order,
            Product product
    ) {

        if (orderDetail == null || request == null) {
            return;
        }

        orderDetail.setOrder(order);
        orderDetail.setProduct(product);
        orderDetail.setQuantity(request.getQuantity());

        /*
         * Giá luôn lấy lại từ Product trong Database.
         */
        if (product != null) {
            orderDetail.setPrice(product.getPrice());
        }
    }
}

