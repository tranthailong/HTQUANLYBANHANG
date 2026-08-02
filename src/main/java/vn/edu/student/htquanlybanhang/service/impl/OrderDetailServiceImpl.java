package vn.edu.student.htquanlybanhang.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.student.htquanlybanhang.dto.request.OrderDetailRequest;
import vn.edu.student.htquanlybanhang.dto.response.OrderDetailResponse;
import vn.edu.student.htquanlybanhang.entity.Order;
import vn.edu.student.htquanlybanhang.entity.OrderDetail;
import vn.edu.student.htquanlybanhang.entity.Product;
import vn.edu.student.htquanlybanhang.mapper.OrderDetailMapper;
import vn.edu.student.htquanlybanhang.repository.OrderDetailRepository;
import vn.edu.student.htquanlybanhang.repository.OrderRepository;
import vn.edu.student.htquanlybanhang.repository.ProductRepository;
import vn.edu.student.htquanlybanhang.service.OrderDetailService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderDetailServiceImpl implements OrderDetailService {

    private final OrderDetailRepository orderDetailRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderDetailMapper orderDetailMapper;

    @Override
    public List<OrderDetailResponse> getAllOrderDetails() {
        return orderDetailRepository.findAll().stream()
                .map(orderDetailMapper::toResponse)
                .toList();
    }

    @Override
    public OrderDetailResponse getOrderDetailById(Long id) {
        OrderDetail orderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrderDetail not found with id: " + id));
        return orderDetailMapper.toResponse(orderDetail);
    }

    @Override
    public List<OrderDetailResponse> getOrderDetailsByOrderId(Long orderId) {
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrderId(orderId);
        return orderDetails.stream()
                .map(orderDetailMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public OrderDetailResponse createOrderDetail(Long orderId, OrderDetailRequest request) {
        // Tìm đơn hàng cha từ orderId trên URL
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + request.getProductId()));

        // Kiểm tra tồn kho
        if (product.getQuantity() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock for product: " + product.getName());
        }

        // Trừ tồn kho
        product.setQuantity(product.getQuantity() - request.getQuantity());
        productRepository.save(product);

        // Tạo chi tiết đơn hàng, gán order và lấy giá trực tiếp từ sản phẩm
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setOrder(order);
        orderDetail.setProduct(product);
        orderDetail.setQuantity(request.getQuantity());
        orderDetail.setPrice(product.getPrice());

        OrderDetail savedDetail = orderDetailRepository.save(orderDetail);
        return orderDetailMapper.toResponse(savedDetail);
    }

    @Override
    @Transactional
    public OrderDetailResponse updateOrderDetail(Long id, OrderDetailRequest request) {
        OrderDetail existingDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrderDetail not found with id: " + id));

        Product oldProduct = existingDetail.getProduct();

        // 1. Hoàn lại tồn kho cho sản phẩm cũ trước khi thay đổi
        oldProduct.setQuantity(oldProduct.getQuantity() + existingDetail.getQuantity());
        productRepository.save(oldProduct);

        // 2. Tìm sản phẩm mới từ request (hỗ trợ đổi sang sản phẩm khác)
        Product newProduct = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + request.getProductId()));

        // 3. Kiểm tra tồn kho với số lượng mới của sản phẩm mới
        if (newProduct.getQuantity() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock for product: " + newProduct.getName());
        }

        // 4. Trừ tồn kho của sản phẩm mới
        newProduct.setQuantity(newProduct.getQuantity() - request.getQuantity());
        productRepository.save(newProduct);

        // 5. Cập nhật thông tin chi tiết (gồm sản phẩm mới, số lượng mới và giá mới)
        existingDetail.setProduct(newProduct);
        existingDetail.setQuantity(request.getQuantity());
        existingDetail.setPrice(newProduct.getPrice());

        OrderDetail updatedDetail = orderDetailRepository.save(existingDetail);
        return orderDetailMapper.toResponse(updatedDetail);
    }

    @Override
    @Transactional
    public void deleteOrderDetail(Long id) {
        OrderDetail orderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrderDetail not found with id: " + id));

        Product product = orderDetail.getProduct();
        if (product != null) {
            // Hoàn lại tồn kho khi xóa
            product.setQuantity(product.getQuantity() + orderDetail.getQuantity());
            productRepository.save(product);
        }

        orderDetailRepository.delete(orderDetail);
    }
}