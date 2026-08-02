package vn.edu.student.htquanlybanhang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.student.htquanlybanhang.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}