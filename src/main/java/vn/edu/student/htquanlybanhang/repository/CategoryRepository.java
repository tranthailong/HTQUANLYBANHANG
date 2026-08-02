package vn.edu.student.htquanlybanhang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.student.htquanlybanhang.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

}

