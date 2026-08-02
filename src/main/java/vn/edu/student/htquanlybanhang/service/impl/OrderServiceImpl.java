package vn.edu.student.htquanlybanhang.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.student.htquanlybanhang.dto.request.OrderDetailRequest;
import vn.edu.student.htquanlybanhang.dto.request.OrderRequest;
import vn.edu.student.htquanlybanhang.dto.response.OrderResponse;
import vn.edu.student.htquanlybanhang.entity.Customer;
import vn.edu.student.htquanlybanhang.entity.Order;
import vn.edu.student.htquanlybanhang.entity.OrderDetail;
import vn.edu.student.htquanlybanhang.entity.Product;
import vn.edu.student.htquanlybanhang.mapper.OrderDetailMapper;
import vn.edu.student.htquanlybanhang.mapper.OrderMapper;
import vn.edu.student.htquanlybanhang.repository.CustomerRepository;
import vn.edu.student.htquanlybanhang.repository.OrderDetailRepository;
import vn.edu.student.htquanlybanhang.repository.OrderRepository;
import vn.edu.student.htquanlybanhang.repository.ProductRepository;
import vn.edu.student.htquanlybanhang.service.OrderService;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final OrderDetailRepository orderDetailRepository;

    private final OrderMapper orderMapper;
    private final OrderDetailMapper orderDetailMapper;

    @Override
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toResponse)
                .toList();
    }

    @Override
    public OrderResponse getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return orderMapper.toResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + request.getCustomerId()));

        Order order = orderMapper.toEntity(request, customer);
        Order savedOrder = orderRepository.save(order);

        BigDecimal totalAmount = BigDecimal.ZERO;

        if (request.getItems() != null && !request.getItems().isEmpty()) {
            for (OrderDetailRequest detailRequest : request.getItems()) {
                Product product = productRepository.findById(detailRequest.getProductId())
                        .orElseThrow(() -> new RuntimeException("Product not found with id: " + detailRequest.getProductId()));

                // Kiểm tra tồn kho
                if (product.getQuantity() < detailRequest.getQuantity()) {
                    throw new RuntimeException("Insufficient stock for product: " + product.getName());
                }

                // Trừ số lượng tồn kho của sản phẩm
                product.setQuantity(product.getQuantity() - detailRequest.getQuantity());
                productRepository.save(product);

                // Tạo OrderDetail
                OrderDetail orderDetail = orderDetailMapper.toEntity(detailRequest, savedOrder, product);
                orderDetailRepository.save(orderDetail);

                // Tính tổng tiền đơn hàng
                BigDecimal subTotal = orderDetail.getPrice().multiply(BigDecimal.valueOf(orderDetail.getQuantity()));
                totalAmount = totalAmount.add(subTotal);
            }
        }

        // Cập nhật lại tổng tiền cho Order
        savedOrder.setTotalAmount(totalAmount);
        orderRepository.save(savedOrder);

        return orderMapper.toResponse(savedOrder);
    }

    @Override
    @Transactional
    public OrderResponse updateOrder(Long id, OrderRequest request) {
        // 1. Tìm đơn hàng cũ
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        // 2. Hoàn lại tồn kho của các chi tiết đơn hàng cũ trước khi cập nhật
        List<OrderDetail> oldDetails = orderDetailRepository.findByOrderId(id);
        for (OrderDetail oldDetail : oldDetails) {
            Product product = oldDetail.getProduct();
            if (product != null) {
                product.setQuantity(product.getQuantity() + oldDetail.getQuantity());
                productRepository.save(product);
            }
        }
        // Xóa các chi tiết cũ đi để thay bằng danh sách mới từ request
        orderDetailRepository.deleteAll(oldDetails);

        // 3. Kiểm tra khách hàng mới (nếu có thay đổi)
        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + request.getCustomerId()));
        existingOrder.setCustomer(customer);

        BigDecimal totalAmount = BigDecimal.ZERO;

        // 4. Xử lý danh sách sản phẩm mới trong request và trừ kho lại từ đầu
        if (request.getItems() != null && !request.getItems().isEmpty()) {
            for (OrderDetailRequest detailRequest : request.getItems()) {
                Product product = productRepository.findById(detailRequest.getProductId())
                        .orElseThrow(() -> new RuntimeException("Product not found with id: " + detailRequest.getProductId()));

                // Kiểm tra tồn kho
                if (product.getQuantity() < detailRequest.getQuantity()) {
                    throw new RuntimeException("Insufficient stock for product: " + product.getName());
                }

                // Trừ tồn kho mới
                product.setQuantity(product.getQuantity() - detailRequest.getQuantity());
                productRepository.save(product);

                // Tạo OrderDetail mới
                OrderDetail orderDetail = orderDetailMapper.toEntity(detailRequest, existingOrder, product);
                orderDetailRepository.save(orderDetail);

                // Tính lại tổng tiền
                BigDecimal subTotal = orderDetail.getPrice().multiply(BigDecimal.valueOf(orderDetail.getQuantity()));
                totalAmount = totalAmount.add(subTotal);
            }
        }

        // 5. Cập nhật tổng tiền và lưu đơn hàng
        existingOrder.setTotalAmount(totalAmount);
        Order savedOrder = orderRepository.save(existingOrder);

        return orderMapper.toResponse(savedOrder);
    }

    @Override
    @Transactional
    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        // Hoàn lại số lượng tồn kho trước khi xóa đơn hàng
        List<OrderDetail> details = orderDetailRepository.findByOrderId(id);
        for (OrderDetail detail : details) {
            Product product = detail.getProduct();
            if (product != null) {
                product.setQuantity(product.getQuantity() + detail.getQuantity());
                productRepository.save(product);
            }
        }

        orderDetailRepository.deleteAll(details);
        orderRepository.delete(order);
    }
}