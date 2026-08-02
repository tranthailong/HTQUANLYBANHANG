package vn.edu.student.htquanlybanhang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.student.htquanlybanhang.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

        boolean existsByCustomerId(Long customerId);
}

