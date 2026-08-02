document.addEventListener("DOMContentLoaded", function () {
    loadAllOrdersForSelect();
});

// Tải danh sách tất cả đơn hàng đưa vào thẻ <select> ở đầu trang
async function loadAllOrdersForSelect() {
    try {
        const response = await fetch('/api/orders');
        if (response.ok) {
            const json = await response.json();
            const orders = Array.isArray(json) ? json : (json.data || json.result || []);

            const select = document.getElementById("select-order-dropdown");
            if (select) {
                select.innerHTML = '<option value="">-- Chọn đơn hàng để xem chi tiết --</option>';
                orders.forEach(o => {
                    let custName = o.customerName || (o.customer && typeof o.customer === 'object' ? o.customer.name : 'Khách #' + (o.customer || ''));
                    select.innerHTML += `<option value="${o.id}">Đơn hàng #${o.id} - Khách: ${custName} (${(o.totalAmount || 0).toLocaleString('vi-VN')}đ)</option>`;
                });
            }

            const urlParams = new URLSearchParams(window.location.search);
            const orderIdFromUrl = urlParams.get("id");
            if (orderIdFromUrl) {
                select.value = orderIdFromUrl;
                loadOrderDetail(orderIdFromUrl);
            }
        }
    } catch (error) {
        console.error("Không thể tải danh sách đơn hàng:", error);
    }
}

// Khi người dùng chọn đơn hàng trong dropdown
function onSelectOrderChange(orderId) {
    if (!orderId) {
        resetView();
        return;
    }
    window.history.pushState({}, '', `/order-details.html?id=${orderId}`);
    loadOrderDetail(orderId);
}

// Gọi API lấy thông tin chi tiết một đơn hàng
async function loadOrderDetail(id) {
    try {
        const response = await fetch(`/api/orders/${id}`);
        if (response.ok) {
            const json = await response.json();
            const order = json.data || json;
            renderOrderDetail(order);
        } else {
            document.getElementById("order-items-table-body").innerHTML = `<tr><td colspan="4" class="py-6 text-center text-red-400">Không tìm thấy thông tin đơn hàng #${id}</td></tr>`;
        }
    } catch (error) {
        console.error("Lỗi kết nối API:", error);
        document.getElementById("order-items-table-body").innerHTML = `<tr><td colspan="4" class="py-6 text-center text-red-400">Lỗi kết nối đến máy chủ.</td></tr>`;
    }
}

// Hiển thị dữ liệu lên giao diện
function renderOrderDetail(order) {
    document.getElementById("topbar-title").innerText = `Chi tiết đơn hàng #${order.id}`;

    // Xử lý thông tin khách hàng linh hoạt mọi trường dữ liệu từ backend
    let custName = order.customerName || 'Khách lẻ';
    let custPhone = order.customerPhone || order.phone || 'Chưa có SĐT';
    let custEmail = order.customerEmail || order.email || 'Chưa có Email';
    let custAddress = order.customerAddress || order.address || 'Chưa có Địa chỉ';

    if (order.customer && typeof order.customer === 'object') {
        custName = order.customer.name || custName;
        custPhone = order.customer.phone || custPhone;
        custEmail = order.customer.email || custEmail;
        custAddress = order.customer.address || custAddress;
    }

    document.getElementById("customer-name").innerText = custName;
    document.getElementById("customer-phone").innerText = "SĐT: " + custPhone;
    document.getElementById("customer-email").innerText = "Email: " + custEmail;
    document.getElementById("customer-address").innerText = "Địa chỉ: " + custAddress;

    if (order.status) {
        const statusSelect = document.getElementById("order-status-select");
        if (statusSelect) statusSelect.value = order.status;
    }

    // Danh sách sản phẩm (hỗ trợ các tên biến phổ biến: orderDetails, items, orderItems)
    const items = order.orderDetails || order.items || order.orderItems || [];
    const tbody = document.getElementById("order-items-table-body");
    tbody.innerHTML = "";

    if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="py-6 text-center text-gray-500">Đơn hàng này chưa có sản phẩm nào (hoặc chưa liên kết CSDL order_detail)</td></tr>`;
    } else {
        items.forEach(item => {
            let productName = item.productName || (item.product ? item.product.name : `Sản phẩm #${item.productId || 'N/A'}`);
            let quantity = item.quantity || 0;
            let price = item.price || item.unitPrice || 0;
            let subTotal = quantity * price;

            let row = `
                <tr class="hover:bg-gray-800/40 transition">
                    <td class="py-3 px-4 text-gray-200 font-medium">${productName}</td>
                    <td class="py-3 px-4 text-center text-gray-300">${quantity}</td>
                    <td class="py-3 px-4 text-right text-gray-300">${price.toLocaleString('vi-VN')}đ</td>
                    <td class="py-3 px-4 text-right font-semibold text-emerald-400">${subTotal.toLocaleString('vi-VN')}đ</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    }

    const total = order.totalAmount || 0;
    document.getElementById("order-total-amount").innerText = total.toLocaleString('vi-VN') + 'đ';
}

function resetView() {
    document.getElementById("topbar-title").innerText = "Chi tiết đơn hàng";
    document.getElementById("customer-name").innerText = "Vui lòng chọn đơn hàng...";
    document.getElementById("customer-phone").innerText = "SĐT: ---";
    document.getElementById("customer-email").innerText = "Email: ---";
    document.getElementById("customer-address").innerText = "Địa chỉ: ---";
    document.getElementById("order-items-table-body").innerHTML = `<tr><td colspan="4" class="py-6 text-center text-gray-500">Vui lòng chọn một đơn hàng phía trên</td></tr>`;
    document.getElementById("order-total-amount").innerText = "0đ";
}

async function updateOrderStatus() {
    const select = document.getElementById("select-order-dropdown");
    const orderId = select ? select.value : null;

    if (!orderId) {
        alert("Vui lòng chọn một đơn hàng trước khi cập nhật!");
        return;
    }

    const newStatus = document.getElementById("order-status-select").value;

    try {
        const res = await fetch(`/api/orders/${orderId}/status?status=${newStatus}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
            alert("Cập nhật trạng thái đơn hàng thành công!");
        } else {
            alert("Đã gửi yêu cầu cập nhật trạng thái lên server.");
        }
    } catch (err) {
        console.error("Lỗi cập nhật trạng thái:", err);
    }
}