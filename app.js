// Configuration
const API_URL = 'backend.php';

// Global state
let currentUser = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    initPage();
});

// Check authentication
function checkAuth() {
    const user = localStorage.getItem('user');
    if (user) {
        currentUser = JSON.parse(user);
        updateNavigation();
    }
}

// Update navigation based on auth status
function updateNavigation() {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    const adminLink = document.getElementById('adminLink');
    
    if (currentUser) {
        if (loginBtn) loginBtn.classList.add('d-none');
        if (userMenu) userMenu.classList.remove('d-none');
        if (userName) userName.textContent = currentUser.name;
        if (adminLink && currentUser.role === 'admin') {
            adminLink.style.display = 'block';
        }
    } else {
        if (loginBtn) loginBtn.classList.remove('d-none');
        if (userMenu) userMenu.classList.add('d-none');
    }
}

// Initialize page-specific functions
function initPage() {
    const path = window.location.pathname;
    
    if (path.includes('index.html') || path.endsWith('/')) {
        loadProducts();
        setupLoginForm();
        setupRegisterForm();
    } else if (path.includes('sell.html')) {
        checkAuthRedirect();
        setupSellForm();
    } else if (path.includes('dashboard.html')) {
        checkAuthRedirect();
        loadUserDashboard();
    } else if (path.includes('product.html')) {
        loadProductDetail();
    } else if (path.includes('admin.html')) {
        checkAdminAccess();
        loadAdminDashboard();
    }
}

// Check if user is logged in, redirect if not
function checkAuthRedirect() {
    if (!currentUser) {
        alert('Please login first');
        window.location.href = 'index.html';
    }
}

// Check admin access
function checkAdminAccess() {
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Access denied');
        window.location.href = 'index.html';
    }
}

// Login form
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            try {
                const response = await fetch(`${API_URL}?action=login`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email, password})
                });
                
                const data = await response.json();
                
                if (data.success) {
                    currentUser = data.user;
                    localStorage.setItem('user', JSON.stringify(data.user));
                    alert('Login successful!');
                    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
                    updateNavigation();
                    location.reload();
                } else {
                    alert(data.message || 'Login failed');
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });
    }
}

// Register form
function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            
            try {
                const response = await fetch(`${API_URL}?action=register`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({name, email, password})
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert('Registration successful! Please login.');
                    bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
                    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                    loginModal.show();
                    registerForm.reset();
                } else {
                    alert(data.message || 'Registration failed');
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });
    }
}

// Logout
function logout() {
    localStorage.removeItem('user');
    currentUser = null;
    window.location.href = 'index.html';
}

// Load products
async function loadProducts(category = '', search = '') {
    try {
        let url = `${API_URL}?action=get_products&status=active`;
        if (category) url += `&category=${category}`;
        if (search) url += `&search=${search}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
            displayProducts(data.products);
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Display products
function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<div class="col-12"><p class="text-center text-muted">No products found</p></div>';
        return;
    }
    
    productsGrid.innerHTML = products.map(product => `
        <div class="col-md-3 mb-4">
            <div class="card h-100">
                <img src="${product.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}" class="card-img-top" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text text-truncate">${product.description}</p>
                    <p class="text-primary fw-bold">$${parseFloat(product.price).toFixed(2)}</p>
                    <span class="badge bg-secondary">${product.category}</span>
                    <p class="text-muted small mt-2">Seller: ${product.seller_name}</p>
                </div>
                <div class="card-footer">
                    <a href="product.html?id=${product.id}" class="btn btn-primary w-100">View Details</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter by category
function filterCategory(category) {
    loadProducts(category, '');
}

// Search products
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        loadProducts('', searchInput.value);
    }
}

// Sell form
function setupSellForm() {
    const sellForm = document.getElementById('sellForm');
    if (sellForm) {
        sellForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const productData = {
                seller_id: currentUser.id,
                title: document.getElementById('productTitle').value,
                description: document.getElementById('productDescription').value,
                price: document.getElementById('productPrice').value,
                category: document.getElementById('productCategory').value,
                image_url: document.getElementById('productImage').value || 'https://via.placeholder.com/300x200?text=No+Image'
            };
            
            try {
                const response = await fetch(`${API_URL}?action=create_product`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(productData)
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert('Product listed successfully! It will be reviewed by our team.');
                    sellForm.reset();
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Error listing product');
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });
    }
}

// Load user dashboard
async function loadUserDashboard() {
    // Load user products
    try {
        const response = await fetch(`${API_URL}?action=get_user_products&user_id=${currentUser.id}`);
        const data = await response.json();
        
        if (data.success) {
            displayUserProducts(data.products);
        }
    } catch (error) {
        console.error('Error loading user products:', error);
    }
    
    // Load purchases
    loadUserOrders('buyer');
    
    // Load sales
    loadUserOrders('seller');
}

// Display user products
function displayUserProducts(products) {
    const container = document.getElementById('userProducts');
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="text-muted">You haven\'t listed any products yet.</p></div>';
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="col-md-4 mb-3">
            <div class="card">
                <img src="${product.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}" class="card-img-top" style="height: 150px; object-fit: cover;">
                <div class="card-body">
                    <h6 class="card-title">${product.title}</h6>
                    <p class="text-primary fw-bold">$${parseFloat(product.price).toFixed(2)}</p>
                    <span class="badge bg-${getStatusColor(product.status)}">${product.status}</span>
                    <div class="mt-2">
                        <button class="btn btn-sm btn-outline-primary" onclick="editProduct(${product.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Get status color
function getStatusColor(status) {
    const colors = {
        'pending': 'warning',
        'active': 'success',
        'sold': 'info',
        'rejected': 'danger'
    };
    return colors[status] || 'secondary';
}

// Edit product
async function editProduct(productId) {
    try {
        const response = await fetch(`${API_URL}?action=get_product&id=${productId}`);
        const data = await response.json();
        
        if (data.success && data.product) {
            const product = data.product;
            document.getElementById('editProductId').value = product.id;
            document.getElementById('editProductTitle').value = product.title;
            document.getElementById('editProductDescription').value = product.description;
            document.getElementById('editProductPrice').value = product.price;
            document.getElementById('editProductCategory').value = product.category;
            document.getElementById('editProductImage').value = product.image_url;
            
            const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
            modal.show();
            
            setupEditForm();
        }
    } catch (error) {
        alert('Error loading product: ' + error.message);
    }
}

// Setup edit form
function setupEditForm() {
    const editForm = document.getElementById('editProductForm');
    if (editForm && !editForm.dataset.initialized) {
        editForm.dataset.initialized = 'true';
        editForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const productData = {
                id: document.getElementById('editProductId').value,
                title: document.getElementById('editProductTitle').value,
                description: document.getElementById('editProductDescription').value,
                price: document.getElementById('editProductPrice').value,
                category: document.getElementById('editProductCategory').value,
                image_url: document.getElementById('editProductImage').value
            };
            
            try {
                const response = await fetch(`${API_URL}?action=update_product`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(productData)
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert('Product updated successfully!');
                    bootstrap.Modal.getInstance(document.getElementById('editProductModal')).hide();
                    loadUserDashboard();
                } else {
                    alert('Error updating product');
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });
    }
}

// Delete product
async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
        const response = await fetch(`${API_URL}?action=delete_product&id=${productId}`);
        const data = await response.json();
        
        if (data.success) {
            alert('Product deleted successfully!');
            loadUserDashboard();
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Load user orders
async function loadUserOrders(type) {
    try {
        const response = await fetch(`${API_URL}?action=get_orders&user_id=${currentUser.id}&type=${type}`);
        const data = await response.json();
        
        if (data.success) {
            if (type === 'buyer') {
                displayOrders(data.orders, 'userPurchases');
            } else {
                displayOrders(data.orders, 'userSales');
            }
        }
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

// Display orders
function displayOrders(orders, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (orders.length === 0) {
        container.innerHTML = '<p class="text-muted">No orders yet.</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Product</th>
                        <th>${containerId === 'userPurchases' ? 'Seller' : 'Buyer'}</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => `
                        <tr>
                            <td>#${order.id}</td>
                            <td>${order.product_title}</td>
                            <td>${containerId === 'userPurchases' ? order.seller_name : order.buyer_name}</td>
                            <td>$${parseFloat(order.amount).toFixed(2)}</td>
                            <td><span class="badge bg-${getStatusColor(order.status)}">${order.status}</span></td>
                            <td>${new Date(order.created_at).toLocaleDateString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Load product detail
async function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        window.location.href = 'index.html';
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}?action=get_product&id=${productId}`);
        const data = await response.json();
        
        if (data.success && data.product) {
            displayProductDetail(data.product);
        } else {
            alert('Product not found');
            window.location.href = 'index.html';
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Display product detail
function displayProductDetail(product) {
    const container = document.getElementById('productDetail');
    if (!container) return;
    
    const canBuy = currentUser && currentUser.id != product.seller_id && product.status === 'active';
    
    container.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${product.image_url || 'https://via.placeholder.com/600x400?text=No+Image'}" class="img-fluid rounded" alt="${product.title}">
            </div>
            <div class="col-md-6">
                <h2>${product.title}</h2>
                <p class="text-muted">Category: ${product.category}</p>
                <h3 class="text-primary">$${parseFloat(product.price).toFixed(2)}</h3>
                <span class="badge bg-${getStatusColor(product.status)} mb-3">${product.status}</span>
                
                <h5>Description</h5>
                <p>${product.description}</p>
                
                <div class="card bg-light mb-3">
                    <div class="card-body">
                        <h6>Seller Information</h6>
                        <p class="mb-1"><strong>Name:</strong> ${product.seller_name}</p>
                        <p class="mb-0"><strong>Email:</strong> ${product.seller_email}</p>
                    </div>
                </div>
                
                ${canBuy ? `
                    <button class="btn btn-primary btn-lg w-100" onclick="initiatePurchase(${product.id}, ${product.seller_id}, ${product.price})">
                        <i class="fas fa-shopping-cart"></i> Buy Now
                    </button>
                ` : product.status !== 'active' ? `
                    <div class="alert alert-warning">This item is no longer available</div>
                ` : !currentUser ? `
                    <div class="alert alert-info">Please login to purchase this item</div>
                ` : `
                    <div class="alert alert-info">You cannot buy your own item</div>
                `}
            </div>
        </div>
    `;
}

// Initiate purchase
function initiateurchase(productId, sellerId, price) {
    if (!currentUser) {
        alert('Please login first');
        return;
    }
    
    document.getElementById('confirmPrice').textContent = parseFloat(price).toFixed(2);
    
    // Store purchase data for confirmation
    window.purchaseData = {productId, sellerId, price};
    
    const modal = new bootstrap.Modal(document.getElementById('purchaseModal'));
    modal.show();
}

// Confirm purchase
async function confirmPurchase() {
    const {productId, sellerId, price} = window.purchaseData;
    
    try {
        const response = await fetch(`${API_URL}?action=create_order`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                product_id: productId,
                buyer_id: currentUser.id,
                seller_id: sellerId,
                amount: price
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Purchase successful! Check your dashboard for order details.');
            bootstrap.Modal.getInstance(document.getElementById('purchaseModal')).hide();
            window.location.href = 'dashboard.html';
        } else {
            alert('Error processing purchase');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Admin Dashboard
async function loadAdminDashboard() {
    loadStats();
    loadAllUsers();
    loadAllProducts('active');
    loadAllOrders();
    loadPendingProducts();
}

// Load stats
async function loadStats() {
    try {
        const response = await fetch(`${API_URL}?action=get_stats`);
        const data = await response.json();
        
        if (data.success) {
            displayStats(data.stats);
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Display stats
function displayStats(stats) {
    const container = document.getElementById('statsCards');
    if (!container) return;
    
    container.innerHTML = `
        <div class="col-md-3">
            <div class="card bg-primary text-white">
                <div class="card-body">
                    <h3>${stats.total_users}</h3>
                    <p>Total Users</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card bg-success text-white">
                <div class="card-body">
                    <h3>${stats.total_products}</h3>
                    <p>Total Products</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card bg-warning text-white">
                <div class="card-body">
                    <h3>${stats.pending_products}</h3>
                    <p>Pending Approval</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card bg-info text-white">
                <div class="card-body">
                    <h3>$${parseFloat(stats.total_revenue).toFixed(2)}</h3>
                    <p>Total Revenue</p>
                </div>
            </div>
        </div>
    `;
}

// Load all users
async function loadAllUsers() {
    try {
        const response = await fetch(`${API_URL}?action=get_users`);
        const data = await response.json();
        
        if (data.success) {
            displayUsers(data.users);
        }
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Display users
function displayUsers(users) {
    const tbody = document.getElementById('usersTable');
    if (!tbody) return;
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="badge bg-${user.role === 'admin' ? 'danger' : 'primary'}">${user.role}</span></td>
            <td>${new Date(user.created_at).toLocaleDateString()}</td>
            <td>
                <select class="form-select form-select-sm" onchange="updateUserRole(${user.id}, this.value)">
                    <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                </select>
            </td>
        </tr>
    `).join('');
}

// Update user role
async function updateUserRole(userId, role) {
    try {
        const response = await fetch(`${API_URL}?action=update_user_role`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: userId, role})
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('User role updated successfully!');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Load all products (admin)
async function loadAllProducts(status) {
    try {
        const response = await fetch(`${API_URL}?action=get_products&status=${status}`);
        const data = await response.json();
        
        if (data.success) {
            displayAdminProducts(data.products);
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Display admin products
function displayAdminProducts(products) {
    const container = document.getElementById('allProductsGrid');
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="text-muted">No products found</p></div>';
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="col-md-3 mb-3">
            <div class="card">
                <img src="${product.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}" class="card-img-top" style="height: 150px; object-fit: cover;">
                <div class="card-body">
                    <h6 class="card-title text-truncate">${product.title}</h6>
                    <p class="text-primary">$${parseFloat(product.price).toFixed(2)}</p>
                    <span class="badge bg-${getStatusColor(product.status)}">${product.status}</span>
                    <p class="small text-muted mt-2">By: ${product.seller_name}</p>
                    <button class="btn btn-sm btn-danger w-100" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Load all orders
async function loadAllOrders() {
    try {
        const response = await fetch(`${API_URL}?action=get_orders&type=all`);
        const data = await response.json();
        
        if (data.success) {
            displayAllOrders(data.orders);
        }
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

// Display all orders
function displayAllOrders(orders) {
    const tbody = document.getElementById('ordersTable');
    if (!tbody) return;
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No orders yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.product_title}</td>
            <td>${order.buyer_name}</td>
            <td>${order.seller_name}</td>
            <td>$${parseFloat(order.amount).toFixed(2)}</td>
            <td><span class="badge bg-${getStatusColor(order.status)}">${order.status}</span></td>
            <td>${new Date(order.created_at).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

// Load pending products
async function loadPendingProducts() {
    try {
        const response = await fetch(`${API_URL}?action=get_products&status=pending`);
        const data = await response.json();
        
        if (data.success) {
            displayPendingProducts(data.products);
        }
    } catch (error) {
        console.error('Error loading pending products:', error);
    }
}

// Display pending products
function displayPendingProducts(products) {
    const container = document.getElementById('pendingProducts');
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="text-muted">No pending products</p></div>';
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="col-md-4 mb-3">
            <div class="card">
                <img src="${product.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}" class="card-img-top" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="text-primary fw-bold">$${parseFloat(product.price).toFixed(2)}</p>
                    <p class="text-muted small">Seller: ${product.seller_name}</p>
                    <p class="text-muted small">Category: ${product.category}</p>
                    <div class="btn-group w-100">
                        <button class="btn btn-success" onclick="moderateProduct(${product.id}, 'active')">
                            <i class="fas fa-check"></i> Approve
                        </button>
                        <button class="btn btn-danger" onclick="moderateProduct(${product.id}, 'rejected')">
                            <i class="fas fa-times"></i> Reject
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Moderate product
async function moderateProduct(productId, status) {
    try {
        const response = await fetch(`${API_URL}?action=moderate_product`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: productId, status})
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert(`Product ${status === 'active' ? 'approved' : 'rejected'} successfully!`);
            loadPendingProducts();
            loadStats();
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}