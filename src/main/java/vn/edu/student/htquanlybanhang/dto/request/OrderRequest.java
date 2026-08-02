package vn.edu.student.htquanlybanhang.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {

    @NotNull(message = "Mã khách hàng không được để trống")
    private Long customerId;

    @NotEmpty(message = "Danh sách sản phẩm mua hàng không được để trống")
    @Valid
    private List<OrderDetailRequest> items;
}

