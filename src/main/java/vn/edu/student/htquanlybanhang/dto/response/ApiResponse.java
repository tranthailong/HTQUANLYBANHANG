package vn.edu.student.htquanlybanhang.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private int code;
    private String message;
    private T result;

    public ApiResponse() {
    }

    // 1. Hỗ trợApiResponse.success(result) - 1 tham số
    public static <T> ApiResponse<T> success(T result) {
        return ApiResponse.<T>builder()
                .code(1000)
                .message("Success")
                .result(result)
                .build();
    }

    // 2. Hỗ trợ ApiResponse.success(message, result) - 2 tham số (Controller của b đang dùng cái này)
    public static <T> ApiResponse<T> success(String message, T result) {
        return ApiResponse.<T>builder()
                .code(1000)
                .message(message)
                .result(result)
                .build();
    }

    // 3. Hỗ trợ hàm error
    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder()
                .code(9999)
                .message(message)
                .build();
    }

    public static <T> ApiResponse<T> error(int code, String message) {
        return ApiResponse.<T>builder()
                .code(code)
                .message(message)
                .build();
    }

    // 4. Các Constructor phụ trợ nếu có chỗ gọi kiểu new
    public ApiResponse(boolean success, String message, T result) {
        this.code = success ? 1000 : 9999;
        this.message = message;
        this.result = result;
    }

    public ApiResponse(int code, String message, T result) {
        this.code = code;
        this.message = message;
        this.result = result;
    }
}