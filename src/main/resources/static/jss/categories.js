let allCategories = [];
let allProducts = [];

document.addEventListener("DOMContentLoaded", function () {
    loadData();

    // Tìm kiếm động
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", function (e) {
            const keyword = e.target.value.toLowerCase();
            const filtered = allCategories.filter(c =>
                (c.name && c.name.toLowerCase().includes(keyword)) ||
                (c.description && c.description.toLowerCase().includes(keyword)) ||
                (c.id && c.id.toString().includes(keyword))
            );
            renderTable(filtered);
        });
    }
});

// Tải đồng thời Danh mục và Sản phẩm để tính số lượng
async function loadData() {
    try {
        const [catRes, prodRes] = await Promise.all([
            fetch('/api/categories'),
            fetch('/api/products').catch(() => ({ ok: false }))
        ]);

        if (catRes.ok) {
            const catJson = await catRes.json();
            allCategories = Array.isArray(catJson) ? catJson : (catJson.data || catJson.result || []);
        }

        if (prodRes && prodRes.ok) {
            const prodJson = await prodRes.json();
            allProducts = Array.isArray(prodJson) ? prodJson : (prodJson.data || prodJson.result || []);
        }

        renderTable(allCategories);
    } catch (error) {
        console.error("Lỗi kết nối API:", error);
        document.getElementById("categories-table-body").innerHTML = `<tr><td colspan="4" class="py-8 text-center text-red-400">Lỗi kết nối đến Backend.</td></tr>`;
    }
}

// Đổ dữ liệu ra bảng kèm mô tả và số lượng sản phẩm
function renderTable(categories) {
    const tbody = document.getElementById("categories-table-body");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (categories.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="py-8 text-center text-gray-500">Chưa có danh mục nào trong hệ thống</td></tr>`;
        return;
    }

    categories.forEach(c => {
        let productCount = c.productCount || (c.products ? c.products.length : 0);
        if (productCount === 0 && allProducts.length > 0) {
            productCount = allProducts.filter(p => {
                return (p.categoryId == c.id) ||
                    (p.category && p.category.id == c.id) ||
                    (p.categoryName && p.categoryName === c.name);
            }).length;
        }

        let description = c.description ? `<p class="text-xs text-gray-400 mt-0.5 line-clamp-1">${c.description}</p>` : `<p class="text-xs text-gray-600 mt-0.5 italic">Không có mô tả</p>`;

        let row = `
            <tr class="hover:bg-gray-800/40 transition">
                <td class="py-4 px-6 font-semibold text-white">#${c.id}</td>
                <td class="py-4 px-6">
                    <div class="font-medium text-gray-200">${c.name || ''}</div>
                    ${description}
                </td>
                <td class="py-4 px-6 text-indigo-400 font-medium">${productCount}</td>
                <td class="py-4 px-6 text-center">
                    <div class="flex items-center justify-center gap-2">
                        <button onclick="editCategory('${c.id}')" class="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-lg text-xs font-medium transition">Sửa</button>
                        <button onclick="deleteCategory('${c.id}')" class="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-medium transition">Xóa</button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Mở Modal Thêm mới
function openAddModal() {
    document.getElementById("modal-title").innerText = "Thêm danh mục mới";
    document.getElementById("category-form").reset();
    document.getElementById("category-id").value = "";
    document.getElementById("category-modal").classList.remove("hidden");
    document.getElementById("category-modal").classList.add("flex");
}

// Đóng Modal
function closeModal() {
    document.getElementById("category-modal").classList.remove("flex");
    document.getElementById("category-modal").classList.add("hidden");
}

// Lưu dữ liệu (Thêm mới hoặc Cập nhật)
async function saveCategory(event) {
    event.preventDefault();
    const id = document.getElementById("category-id").value;
    const name = document.getElementById("category-name").value;
    const description = document.getElementById("category-description").value;

    const payload = {
        name: name,
        description: description
    };

    let url = '/api/categories';
    let method = 'POST';

    if (id) {
        url = `/api/categories/${id}`;
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
            loadData();
        } else {
            alert("Lưu danh mục thất bại. Vui lòng kiểm tra lại!");
        }
    } catch (err) {
        console.error("Lỗi khi lưu danh mục:", err);
        alert("Lỗi kết nối đến máy chủ.");
    }
}

// Đưa dữ liệu vào form để Sửa
function editCategory(id) {
    const c = allCategories.find(item => item.id == id);
    if (!c) return;

    document.getElementById("modal-title").innerText = "Cập nhật danh mục";
    document.getElementById("category-id").value = c.id;
    document.getElementById("category-name").value = c.name || '';
    document.getElementById("category-description").value = c.description || '';

    document.getElementById("category-modal").classList.remove("hidden");
    document.getElementById("category-modal").classList.add("flex");
}

// Xóa danh mục
async function deleteCategory(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) return;

    try {
        const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
        if (res.ok) {
            loadData();
        } else {
            alert("Xóa danh mục thất bại (danh mục có thể đang chứa sản phẩm)!");
        }
    } catch (err) {
        console.error("Lỗi xóa danh mục:", err);
    }
}