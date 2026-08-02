package vn.edu.student.htquanlybanhang.mapper;

import org.springframework.stereotype.Component;
import vn.edu.student.htquanlybanhang.dto.request.ProductRequest;
import vn.edu.student.htquanlybanhang.dto.response.ProductResponse;
import vn.edu.student.htquanlybanhang.entity.Category;
import vn.edu.student.htquanlybanhang.entity.Product;

@Component
public class ProductMapper {

    /**
     * Product Entity -> ProductResponse
     */
    public ProductResponse toResponse(Product product) {

        if (product == null) {
            return null;
        }

        ProductResponse response = new ProductResponse();

        response.setId(product.getId());
        response.setName(product.getName());
        response.setPrice(product.getPrice());
        response.setQuantity(product.getQuantity());
        response.setDescription(product.getDescription());
        response.setImage(product.getImage());

        if (product.getCategory() != null) {
            response.setCategoryName(product.getCategory().getName());
        }

        return response;
    }

    /**
     * ProductRequest -> Product Entity
     */
    public Product toEntity(ProductRequest request, Category category) {

        if (request == null) {
            return null;
        }

        Product product = new Product();

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setDescription(request.getDescription());
        product.setImage(request.getImage());
        product.setCategory(category);

        return product;
    }

    /**
     * Cập nhật Product Entity từ ProductRequest
     */
    public void updateEntity(
            Product product,
            ProductRequest request,
            Category category
    ) {

        if (product == null || request == null) {
            return;
        }

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setDescription(request.getDescription());
        product.setImage(request.getImage());
        product.setCategory(category);
    }
}

