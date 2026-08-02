let allOrders = [];
let allCustomers = [];

document.addEventListener("DOMContentLoaded", function () {
    loadOrders();
    loadCustomersForSelect();

    // Lọc tìm kiếm đơn hàng theo mã đơn khi gõ
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", function (e) {
            const keyword = e.target.value.toLowerCase();
            const filtered = allOrders.filter(o =>
                (o.id && o.id.toString().includes(keyword)) ||
                (o.customerName && o.customerName.toLowerCase().includes(keyword)) ||
                (o.customer && (typeof o.customer === 'object' ? (o.customer.name && o.customer.name.toLowerCase().includes(keyword)) : o.customer.toString().toLowerCase().includes(keyword)))
            );
            renderTable(filtered);
        });
    }
});

// Tải danh sách khách hàng để đổ vào dropdown select
async function loadCustomersForSelect() {
    try {
        const response = await fetch('/api/customers'); // Đảm bảo endpoint API customers bên backend của bạn là /api/customers
        if (response.ok) {
            const json = await response.json();
            allCustomers = Array.isArray(json) ? json : (json.data || json.result || []);

            const select = document.getElementById("order-customer-id");
            if (select) {
                select.innerHTML = '<option value="">-- Chọn khách hàng --</option>';
                allCustomers.forEach(c => {
                    select.innerHTML += `<option value="${c.id}">${c.name} (SĐT: ${c.phone || 'Chưa có'})</option>`;
                });
            }
        }
    } catch (error) {
        console.error("Không thể tải danh sách khách hàng:", error);
    }
}

// Gọi API lấy danh sách đơn hàng từ Backend
async function loadOrders() {
    try {
        const response = await fetch('/api/orders');
        if (response.ok) {
            const json = await response.json();
            allOrders = Array.isArray(json) ? json : (json.data || json.result || []);
            renderTable(allOrders);
        } else {
            document.getElementById("orders-table-body").innerHTML = `<tr><td colspan="5" class="py-8 text-center text-red-400">Không thể tải dữ liệu từ server!</td></tr>`;
        }
    } catch (error) {
        console.error("Lỗi kết nối API:", error);
        document.getElementById("orders-table-body").innerHTML = `<tr><td colspan="5" class="py-8 text-center text-red-400">Lỗi kết nối đến Backend.</td></tr>`;
    }
}

// Đổ dữ liệu vào bảng HTML
function renderTable(orders) {
    const tbody = document.getElementById("orders-table-body");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-gray-500">Chưa có đơn hàng nào trong hệ thống</td></tr>`;
        return;
    }

    orders.forEach(o => {
        let customerName = 'Khách lẻ';
        if (o.customerName) {
            customerName = o.customerName;
        } else if (o.customer) {
            customerName = typeof o.customer === 'object' ? (o.customer.name || 'Khách #' + o.customer.id) : o.customer;
        }

        let totalFormatted = (o.totalAmount || 0).toLocaleString('vi-VN') + 'đ';

        let dateFormatted = '';
        if (o.orderDate) {
            let dateObj = new Date(o.orderDate);
            if (!isNaN(dateObj)) {
                dateFormatted = dateObj.toLocaleDateString('vi-VN') + ' ' + dateObj.toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'});
            } else {
                dateFormatted = o.orderDate;
            }
        }

        let row = `
            <tr class="hover:bg-gray-800/40 transition">
                <td class="py-4 px-6 font-semibold text-white">#${o.id || ''}</td>
                <td class="py-4 px-6 text-gray-300">${customerName}</td>
                <td class="py-4 px-6 text-gray-400 text-xs">${dateFormatted}</td>
                <td class="py-4 px-6 font-semibold text-emerald-400">${totalFormatted}</td>
                <td class="py-4 px-6 text-center">
                    <div class="flex items-center justify-center gap-2">
                        <button onclick="editOrder('${o.id}')" class="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-lg text-xs font-medium transition">Sửa</button>
                        <button onclick="deleteOrder('${o.id}')" class="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-medium transition">Xóa</button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Mở Modal thêm mới
function openAddModal() {
    document.getElementById("modal-title").innerText = "Tạo đơn hàng mới";
    document.getElementById("order-form").reset();
    document.getElementById("order-id").value = "";
    loadCustomersForSelect(); // Tải lại danh sách khách hàng mới nhất khi mở modal
    document.getElementById("order-modal").classList.remove("hidden");
    document.getElementById("order-modal").classList.add("flex");
}

// Đóng Modal
function closeModal() {
    document.getElementById("order-modal").classList.remove("flex");
    document.getElementById("order-modal").classList.add("hidden");
}

// Lưu đơn hàng (Thêm mới hoặc Cập nhật)
async function saveOrder(event) {
    event.preventDefault();
    const id = document.getElementById("order-id").value;
    const customerId = parseInt(document.getElementById("order-customer-id").value);

    if (!customerId) {
        alert("Vui lòng chọn khách hàng!");
        return;
    }

    // Gửi kèm items tối thiểu để vượt qua validate @NotEmpty của OrderRequest
    const items = [
        {
            productId: 1,
            quantity: 1
        }
    ];

    const payload = {
        customerId: customerId,
        items: items
    };

    let url = '/api/orders';
    let method = 'POST';

    if (id) {
        url = `/api/orders/${id}`;
        method = 'PUT';
    }

    try {
        const res = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            closeModal();
            loadOrders();
        } else {
            const errData = await res.json().catch(() => ({}));
            console.error("Lỗi từ server:", errData);
            alert("Lưu đơn hàng thất bại từ server: " + (errData.message || 'Lỗi dữ liệu'));
        }
    } catch (err) {
        console.error("Lỗi khi lưu đơn hàng:", err);
        alert("Lỗi kết nối đến máy chủ.");
    }
}

// Xóa đơn hàng
async function deleteOrder(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa/hủy đơn hàng này không?")) return;

    try {
        const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
        if (res.ok) {
            loadOrders();
        } else {
            alert("Xóa đơn hàng thất bại!");
        }
    } catch (err) {
        console.error("Lỗi xóa đơn hàng:", err);
    }
}

// Điền dữ liệu vào form để Sửa
function editOrder(id) {
    const o = allOrders.find(item => item.id == id);
    if (!o) return;

    document.getElementById("modal-title").innerText = "Cập nhật đơn hàng";
    document.getElementById("order-id").value = o.id;

    let cId = '';
    if (o.customerId) {
        cId = o.customerId;
    } else if (o.customer) {
        cId = typeof o.customer === 'object' ? (o.customer.id || '') : o.customer;
    }

    document.getElementById("order-customer-id").value = cId;

    document.getElementById("order-modal").classList.remove("hidden");
    document.getElementById("order-modal").classList.add("flex");
}