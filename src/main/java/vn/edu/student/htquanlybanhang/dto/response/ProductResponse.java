
        package vn.edu.student.htquanlybanhang.dto.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductResponse {

    private Long id;

    private String name;

    private BigDecimal price;

    private Integer quantity;

    private String description;

    private String image;

    private String categoryName;
}

