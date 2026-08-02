package vn.edu.student.htquanlybanhang.mapper;

import org.springframework.stereotype.Component;
import vn.edu.student.htquanlybanhang.dto.request.CategoryRequest;
import vn.edu.student.htquanlybanhang.dto.response.CategoryResponse;
import vn.edu.student.htquanlybanhang.entity.Category;

@Component
public class CategoryMapper {

    /**
     * Category Entity -> CategoryResponse
     */
    public CategoryResponse toResponse(Category category) {

        if (category == null) {
            return null;
        }

        CategoryResponse response = new CategoryResponse();

        response.setId(category.getId());
        response.setName(category.getName());
        response.setDescription(category.getDescription());

        return response;
    }

    /**
     * CategoryRequest -> Category Entity
     */
    public Category toEntity(CategoryRequest request) {

        if (request == null) {
            return null;
        }

        Category category = new Category();

        category.setName(request.getName());
        category.setDescription(request.getDescription());

        return category;
    }

    /**
     * Cập nhật Category Entity từ CategoryRequest
     */
    public void updateEntity(
            Category category,
            CategoryRequest request
    ) {

        if (category == null || request == null) {
            return;
        }

        category.setName(request.getName());
        category.setDescription(request.getDescription());
    }
}
