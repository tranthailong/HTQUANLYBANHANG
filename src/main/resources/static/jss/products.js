let allProducts = [];

document.addEventListener("DOMContentLoaded", function () {
    loadProducts();

    // Lọc tìm kiếm sản phẩm trực tiếp khi gõ
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", function (e) {
            const keyword = e.target.value.toLowerCase();
            const filtered = allProducts.filter(p =>
                (p.name && p.name.toLowerCase().includes(keyword)) ||
                (p.categoryName && p.categoryName.toLowerCase().includes(keyword)) ||
                (p.category && (typeof p.category === 'string' ? p.category : p.category.name).toLowerCase().includes(keyword))
            );
            renderTable(filtered);
        });
    }
});

// Gọi API lấy danh sách sản phẩm từ Backend
async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        if (response.ok) {
            const json = await response.json();
            // Xử lý tùy theo cấu trúc ApiResponse trả về từ Controller
            allProducts = Array.isArray(json) ? json : (json.data || json.result || []);
            renderTable(allProducts);
        } else {
            document.getElementById("products-table-body").innerHTML = `<tr><td colspan="5" class="py-8 text-center text-red-400">Không thể tải dữ liệu từ server!</td></tr>`;
        }
    } catch (error) {
        console.error("Lỗi kết nối API:", error);
        document.getElementById("products-table-body").innerHTML = `<tr><td colspan="5" class="py-8 text-center text-red-400">Lỗi kết nối đến Backend.</td></tr>`;
    }
}

// Đổ dữ liệu sản phẩm vào bảng HTML
function renderTable(products) {
    const tbody = document.getElementById("products-table-body");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-gray-500">Chưa có sản phẩm nào trong cơ sở dữ liệu</td></tr>`;
        return;
    }

    products.forEach(p => {
        let catName = 'Chưa phân loại';
        if (p.categoryName) {
            catName = p.categoryName;
        } else if (p.category) {
            catName = typeof p.category === 'string' ? p.category : (p.category.name || 'Chưa phân loại');
        }

        let priceFormatted = (p.price || 0).toLocaleString('vi-VN') + 'đ';
        let stockQty = p.quantity !== undefined ? p.quantity : (p.stock || 0);

        let row = `
            <tr class="hover:bg-gray-800/40 transition">
                <td class="py-4 px-6 font-medium text-white">${p.name || ''}</td>
                <td class="py-4 px-6 text-gray-300">
                    <span class="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-full text-xs font-medium">${catName}</span>
                </td>
                <td class="py-4 px-6 font-semibold text-emerald-400">${priceFormatted}</td>
                <td class="py-4 px-6 text-gray-300">${stockQty}</td>
                <td class="py-4 px-6 text-center">
                    <div class="flex items-center justify-center gap-2">
                        <button onclick="editProduct('${p.id}')" class="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-lg text-xs font-medium transition">Sửa</button>
                        <button onclick="deleteProduct('${p.id}')" class="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-medium transition">Xóa</button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Mở Modal thêm mới
function openAddModal() {
    document.getElementById("modal-title").innerText = "Thêm sản phẩm mới";
    document.getElementById("product-form").reset();
    document.getElementById("product-id").value = "";
    document.getElementById("product-modal").classList.remove("hidden");
    document.getElementById("product-modal").classList.add("flex");
}

// Đóng Modal
function closeModal() {
    document.getElementById("product-modal").classList.remove("flex");
    document.getElementById("product-modal").classList.add("hidden");
}

// Lưu sản phẩm (Gửi đúng chuẩn ProductRequest lên Controller)
async function saveProduct(event) {
    event.preventDefault();
    const id = document.getElementById("product-id").value;
    const name = document.getElementById("product-name").value;
    const categoryInput = document.getElementById("product-category").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const quantity = parseInt(document.getElementById("product-stock").value);

    // Thông thường ProductRequest sẽ chứa các trường như: name, price, quantity, categoryId (hoặc category)
    // Tùy thuộc vào ProductRequest của b, ta truyền linh hoạt các key phổ biến:
    const payload = {
        name: name,
        price: price,
        quantity: quantity,
        categoryId: isNaN(categoryInput) ? 1 : parseInt(categoryInput), // Thường request dùng categoryId
        category: isNaN(categoryInput) ? categoryInput : parseInt(categoryInput) // Phòng hờ nếu request dùng trường category dạng ID
    };

    let url = '/api/products';
    let method = 'POST';

    if (id) {
        url = `/api/products/${id}`;
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
            loadProducts();
        } else {
            const errJson = await res.json().catch(() => ({}));
            console.error("Lỗi từ server:", errJson);
            alert("Lưu sản phẩm thất bại từ server! (Kiểm tra lại định dạng ProductRequest ở Backend)");
        }
    } catch (err) {
        console.error("Lỗi khi lưu sản phẩm:", err);
        alert("Lỗi kết nối đến máy chủ.");
    }
}

// Xóa sản phẩm
async function deleteProduct(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;

    try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (res.ok) {
            loadProducts();
        } else {
            alert("Xóa sản phẩm thất bại!");
        }
    } catch (err) {
        console.error("Lỗi xóa sản phẩm:", err);
    }
}

// Điền dữ liệu vào form để Sửa sản phẩm
function editProduct(id) {
    const p = allProducts.find(item => item.id == id);
    if (!p) return;

    document.getElementById("modal-title").innerText = "Cập nhật sản phẩm";
    document.getElementById("product-id").value = p.id;
    document.getElementById("product-name").value = p.name || '';

    let catVal = '';
    if (p.categoryId) {
        catVal = p.categoryId;
    } else if (p.category) {
        catVal = typeof p.category === 'object' ? (p.category.id || '') : p.category;
    }
    document.getElementById("product-category").value = catVal;
    document.getElementById("product-price").value = p.price || 0;
    document.getElementById("product-stock").value = p.quantity !== undefined ? p.quantity : (p.stock || 0);

    document.getElementById("product-modal").classList.remove("hidden");
    document.getElementById("product-modal").classList.add("flex");
}