package vn.edu.student.htquanlybanhang.service;

import vn.edu.student.htquanlybanhang.dto.request.ProductRequest;
import vn.edu.student.htquanlybanhang.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {
    List<ProductResponse> getAllProducts();
    ProductResponse getProductById(Long id);
    ProductResponse createProduct(ProductRequest request);
    ProductResponse updateProduct(Long id, ProductRequest request);
    void deleteProduct(Long id);
}