package vn.edu.student.htquanlybanhang.service;

import vn.edu.student.htquanlybanhang.dto.request.CategoryRequest;
import vn.edu.student.htquanlybanhang.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAllCategories();
    CategoryResponse getCategoryById(Long id);
    CategoryResponse createCategory(CategoryRequest request);
    CategoryResponse updateCategory(Long id, CategoryRequest request);
    void deleteCategory(Long id);
}