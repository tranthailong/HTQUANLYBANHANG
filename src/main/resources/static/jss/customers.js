let allCustomers = [];

document.addEventListener("DOMContentLoaded", function () {
    loadCustomers();

    // Lọc tìm kiếm khách hàng khi gõ
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", function (e) {
            const keyword = e.target.value.toLowerCase();
            const filtered = allCustomers.filter(c =>
                (c.name && c.name.toLowerCase().includes(keyword)) ||
                (c.phone && c.phone.toLowerCase().includes(keyword)) ||
                (c.email && c.email.toLowerCase().includes(keyword))
            );
            renderTable(filtered);
        });
    }
});

// Gọi API lấy danh sách khách hàng từ Backend
async function loadCustomers() {
    try {
        const response = await fetch('/api/customers'); // Đảm bảo endpoint API bên Backend của b là /api/customers
        if (response.ok) {
            const json = await response.json();
            allCustomers = Array.isArray(json) ? json : (json.data || json.result || []);
            renderTable(allCustomers);
        } else {
            document.getElementById("customers-table-body").innerHTML = `<tr><td colspan="5" class="py-8 text-center text-red-400">Không thể tải dữ liệu từ server!</td></tr>`;
        }
    } catch (error) {
        console.error("Lỗi kết nối API:", error);
        document.getElementById("customers-table-body").innerHTML = `<tr><td colspan="5" class="py-8 text-center text-red-400">Lỗi kết nối đến Backend.</td></tr>`;
    }
}

// Đổ dữ liệu vào bảng HTML
function renderTable(customers) {
    const tbody = document.getElementById("customers-table-body");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (customers.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-gray-500">Chưa có khách hàng nào trong hệ thống</td></tr>`;
        return;
    }

    customers.forEach(c => {
        let row = `
            <tr class="hover:bg-gray-800/40 transition">
                <td class="py-4 px-6 font-medium text-white">${c.name || ''}</td>
                <td class="py-4 px-6 text-gray-300">${c.phone || c.phoneNumber || ''}</td>
                <td class="py-4 px-6 text-gray-300">${c.email || ''}</td>
                <td class="py-4 px-6 text-gray-300">${c.address || ''}</td>
                <td class="py-4 px-6 text-center">
                    <div class="flex items-center justify-center gap-2">
                        <button onclick="editCustomer('${c.id}')" class="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-lg text-xs font-medium transition">Sửa</button>
                        <button onclick="deleteCustomer('${c.id}')" class="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-medium transition">Xóa</button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Mở Modal thêm mới
function openAddModal() {
    document.getElementById("modal-title").innerText = "Thêm khách hàng mới";
    document.getElementById("customer-form").reset();
    document.getElementById("customer-id").value = "";
    document.getElementById("customer-modal").classList.remove("hidden");
    document.getElementById("customer-modal").classList.add("flex");
}

// Đóng Modal
function closeModal() {
    document.getElementById("customer-modal").classList.remove("flex");
    document.getElementById("customer-modal").classList.add("hidden");
}

// Lưu khách hàng (Thêm mới hoặc Cập nhật)
async function saveCustomer(event) {
    event.preventDefault();
    const id = document.getElementById("customer-id").value;
    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;
    const email = document.getElementById("customer-email").value;
    const address = document.getElementById("customer-address").value;

    const payload = { name, phone, email, address };

    let url = '/api/customers';
    let method = 'POST';

    if (id) {
        url = `/api/customers/${id}`;
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
            loadCustomers();
        } else {
            alert("Lưu khách hàng thất bại từ server!");
        }
    } catch (err) {
        console.error("Lỗi khi lưu khách hàng:", err);
        alert("Lỗi kết nối đến máy chủ.");
    }
}

// Xóa khách hàng
async function deleteCustomer(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa khách hàng này không?")) return;

    try {
        const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
        if (res.ok) {
            loadCustomers();
        } else {
            alert("Xóa khách hàng thất bại!");
        }
    } catch (err) {
        console.error("Lỗi xóa khách hàng:", err);
    }
}

// Điền dữ liệu vào form để Sửa
function editCustomer(id) {
    const c = allCustomers.find(item => item.id == id);
    if (!c) return;

    document.getElementById("modal-title").innerText = "Cập nhật thông tin khách hàng";
    document.getElementById("customer-id").value = c.id;
    document.getElementById("customer-name").value = c.name || '';
    document.getElementById("customer-phone").value = c.phone || c.phoneNumber || '';
    document.getElementById("customer-email").value = c.email || '';
    document.getElementById("customer-address").value = c.address || '';

    document.getElementById("customer-modal").classList.remove("hidden");
    document.getElementById("customer-modal").classList.add("flex");
}