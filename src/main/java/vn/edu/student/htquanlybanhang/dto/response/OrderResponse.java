
package vn.edu.student.htquanlybanhang.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class OrderResponse {

    private Long id;

    private LocalDateTime orderDate;

    private BigDecimal totalAmount;

    private Long customerId;

    private String customerName;
}

