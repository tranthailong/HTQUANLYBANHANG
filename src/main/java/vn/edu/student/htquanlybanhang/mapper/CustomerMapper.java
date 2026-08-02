package vn.edu.student.htquanlybanhang.mapper;

import org.springframework.stereotype.Component;
import vn.edu.student.htquanlybanhang.dto.request.CustomerRequest;
import vn.edu.student.htquanlybanhang.dto.response.CustomerResponse;
import vn.edu.student.htquanlybanhang.entity.Customer;

@Component
public class CustomerMapper {

    /**
     * Customer Entity -> CustomerResponse
     */
    public CustomerResponse toResponse(Customer customer) {

        if (customer == null) {
            return null;
        }

        CustomerResponse response = new CustomerResponse();

        response.setId(customer.getId());
        response.setName(customer.getName());
        response.setEmail(customer.getEmail());
        response.setPhone(customer.getPhone());
        response.setAddress(customer.getAddress());

        return response;
    }

    /**
     * CustomerRequest -> Customer Entity
     */
    public Customer toEntity(CustomerRequest request) {

        if (request == null) {
            return null;
        }

        Customer customer = new Customer();

        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());

        return customer;
    }

    /**
     * Cập nhật Customer Entity từ CustomerRequest
     */
    public void updateEntity(
            Customer customer,
            CustomerRequest request
    ) {

        if (customer == null || request == null) {
            return;
        }

        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
    }
}

