document.addEventListener("DOMContentLoaded", function () {
    loadDashboardData();
});

async function loadDashboardData() {
    try {
        // 1. Lấy số lượng Products
        const prodRes = await fetch('/api/products');
        if (prodRes.ok) {
            const json = await prodRes.json();
            const products = Array.isArray(json) ? json : (json.result || json.data || []);
            const el = document.getElementById("stat-products");
            if (el) el.innerText = products.length.toLocaleString('vi-VN');
        }

        // 2. Lấy số lượng Customers
        const cusRes = await fetch('/api/customers');
        if (cusRes.ok) {
            const json = await cusRes.json();
            const customers = Array.isArray(json) ? json : (json.result || json.data || []);
            const el = document.getElementById("stat-customers");
            if (el) el.innerText = customers.length.toLocaleString('vi-VN');
        }

        // 3. Lấy Orders -> Tự tính toán số liệu & Vẽ biểu đồ hoàn toàn bằng Front-end
        const orderRes = await fetch('/api/orders');
        if (orderRes.ok) {
            const json = await orderRes.json();
            const orders = Array.isArray(json) ? json : (json.result || json.data || []);

            // Hiển thị tổng số đơn hàng
            const elOrders = document.getElementById("stat-orders");
            if (elOrders) elOrders.innerText = orders.length.toLocaleString('vi-VN');

            // Tính tổng doanh thu thực tế
            let totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || order.total || 0), 0);
            const elRev = document.getElementById("stat-revenue");
            if (elRev) elRev.innerText = totalRevenue.toLocaleString('vi-VN') + 'đ';

            // Đổ dữ liệu vào bảng đơn hàng gần đây
            const tableBody = document.getElementById("recent-orders-table");
            if (tableBody) {
                tableBody.innerHTML = "";
                if (orders.length === 0) {
                    tableBody.innerHTML = `<tr><td colspan="4" class="py-4 text-center text-gray-500">Chưa có đơn hàng nào trong hệ thống</td></tr>`;
                } else {
                    orders.slice(0, 5).forEach(order => {
                        let customerName = order.customerName || (order.customer ? order.customer.name : 'Khách lẻ');
                        let amount = (order.totalAmount || order.total || 0).toLocaleString('vi-VN') + 'đ';

                        let row = `
                            <tr class="hover:bg-gray-800/40 transition">
                                <td class="py-3.5 px-4 font-medium text-indigo-400">#${order.id || ''}</td>
                                <td class="py-3.5 px-4 text-gray-200">${customerName}</td>
                                <td class="py-3.5 px-4 font-semibold text-gray-100">${amount}</td>
                                <td class="py-3.5 px-4">
                                    <span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-xs font-medium">Completed</span>
                                </td>
                            </tr>
                        `;
                        tableBody.innerHTML += row;
                    });
                }
            }

            // --- TỰ ĐỘNG GOM NHÓM DOANH THU THEO THÁNG NGAY TRÊN TRÌNH DUYỆT ---
            const monthlyRevenue = new Array(12).fill(0);
            orders.forEach(order => {
                // Lấy ngày tháng từ đơn hàng (hỗ trợ nhiều tên trường khác nhau của Backend)
                const dateStr = order.orderDate || order.createdAt || order.date;
                if (dateStr) {
                    const date = new Date(dateStr);
                    const month = date.getMonth(); // 0 = Tháng 1, 11 = Tháng 12
                    if (!isNaN(month) && month >= 0 && month < 12) {
                        monthlyRevenue[month] += (order.totalAmount || order.total || 0);
                    }
                }
            });

            // Gọi hàm vẽ biểu đồ với dữ liệu vừa xử lý
            renderRevenueChart(monthlyRevenue);
        }
    } catch (error) {
        console.error("Lỗi tải dữ liệu Dashboard:", error);
    }
}

// Hàm vẽ biểu đồ sử dụng Chart.js
function renderRevenueChart(monthlyRevenue) {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            datasets: [{
                label: 'Doanh thu (VNĐ)',
                data: monthlyRevenue,
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } },
                y: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } }
            }
        }
    });
}