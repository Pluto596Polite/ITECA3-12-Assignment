<?php
// Database configuration
$host = 'localhost';
$dbname = 'c2c_ecommerce';
$username = 'root';
$password = '';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Database connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
    exit();
}

// Get request method and action
$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

// User Authentication
if ($action === 'login') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];
    $password = $data['password'];
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($password, $user['password'])) {
        unset($user['password']);
        echo json_encode(['success' => true, 'user' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    }
}

// User Registration
elseif ($action === 'register') {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    $role = isset($data['role']) ? $data['role'] : 'user';
    
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())");
    try {
        $stmt->execute([$name, $email, $password, $role]);
        echo json_encode(['success' => true, 'message' => 'User registered successfully']);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Email already exists']);
    }
}

// Get all products
elseif ($action === 'get_products') {
    $category = isset($_GET['category']) ? $_GET['category'] : '';
    $search = isset($_GET['search']) ? $_GET['search'] : '';
    $status = isset($_GET['status']) ? $_GET['status'] : 'active';
    
    $sql = "SELECT p.*, u.name as seller_name FROM products p JOIN users u ON p.seller_id = u.id WHERE p.status = ?";
    $params = [$status];
    
    if ($category) {
        $sql .= " AND p.category = ?";
        $params[] = $category;
    }
    
    if ($search) {
        $sql .= " AND (p.title LIKE ? OR p.description LIKE ?)";
        $params[] = "%$search%";
        $params[] = "%$search%";
    }
    
    $sql .= " ORDER BY p.created_at DESC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['success' => true, 'products' => $products]);
}

// Get single product
elseif ($action === 'get_product') {
    $id = isset($_GET['id']) ? $_GET['id'] : 0;
    
    $stmt = $pdo->prepare("SELECT p.*, u.name as seller_name, u.email as seller_email FROM products p JOIN users u ON p.seller_id = u.id WHERE p.id = ?");
    $stmt->execute([$id]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode(['success' => true, 'product' => $product]);
}

// Create product
elseif ($action === 'create_product') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("INSERT INTO products (seller_id, title, description, price, category, image_url, status, created_at) VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW())");
    $stmt->execute([
        $data['seller_id'],
        $data['title'],
        $data['description'],
        $data['price'],
        $data['category'],
        $data['image_url']
    ]);
    
    echo json_encode(['success' => true, 'message' => 'Product created successfully', 'product_id' => $pdo->lastInsertId()]);
}

// Update product
elseif ($action === 'update_product') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("UPDATE products SET title = ?, description = ?, price = ?, category = ?, image_url = ? WHERE id = ?");
    $stmt->execute([
        $data['title'],
        $data['description'],
        $data['price'],
        $data['category'],
        $data['image_url'],
        $data['id']
    ]);
    
    echo json_encode(['success' => true, 'message' => 'Product updated successfully']);
}

// Delete product
elseif ($action === 'delete_product') {
    $id = isset($_GET['id']) ? $_GET['id'] : 0;
    
    $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$id]);
    
    echo json_encode(['success' => true, 'message' => 'Product deleted successfully']);
}

// Approve/Reject product (Admin)
elseif ($action === 'moderate_product') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("UPDATE products SET status = ? WHERE id = ?");
    $stmt->execute([$data['status'], $data['id']]);
    
    echo json_encode(['success' => true, 'message' => 'Product status updated']);
}

// Get all users (Admin)
elseif ($action === 'get_users') {
    $stmt = $pdo->query("SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['success' => true, 'users' => $users]);
}

// Update user role (Admin)
elseif ($action === 'update_user_role') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("UPDATE users SET role = ? WHERE id = ?");
    $stmt->execute([$data['role'], $data['id']]);
    
    echo json_encode(['success' => true, 'message' => 'User role updated']);
}

// Get user products
elseif ($action === 'get_user_products') {
    $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : 0;
    
    $stmt = $pdo->prepare("SELECT * FROM products WHERE seller_id = ? ORDER BY created_at DESC");
    $stmt->execute([$user_id]);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['success' => true, 'products' => $products]);
}

// Create order
elseif ($action === 'create_order') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("INSERT INTO orders (product_id, buyer_id, seller_id, amount, status, created_at) VALUES (?, ?, ?, ?, 'pending', NOW())");
    $stmt->execute([
        $data['product_id'],
        $data['buyer_id'],
        $data['seller_id'],
        $data['amount']
    ]);
    
    echo json_encode(['success' => true, 'message' => 'Order created successfully', 'order_id' => $pdo->lastInsertId()]);
}

// Get orders
elseif ($action === 'get_orders') {
    $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : 0;
    $type = isset($_GET['type']) ? $_GET['type'] : 'all'; // 'buyer', 'seller', or 'all'
    
    if ($type === 'buyer') {
        $sql = "SELECT o.*, p.title as product_title, p.image_url, u.name as seller_name 
                FROM orders o 
                JOIN products p ON o.product_id = p.id 
                JOIN users u ON o.seller_id = u.id 
                WHERE o.buyer_id = ? 
                ORDER BY o.created_at DESC";
    } elseif ($type === 'seller') {
        $sql = "SELECT o.*, p.title as product_title, p.image_url, u.name as buyer_name 
                FROM orders o 
                JOIN products p ON o.product_id = p.id 
                JOIN users u ON o.buyer_id = u.id 
                WHERE o.seller_id = ? 
                ORDER BY o.created_at DESC";
    } else {
        $sql = "SELECT o.*, p.title as product_title, p.image_url, 
                u1.name as buyer_name, u2.name as seller_name 
                FROM orders o 
                JOIN products p ON o.product_id = p.id 
                JOIN users u1 ON o.buyer_id = u1.id 
                JOIN users u2 ON o.seller_id = u2.id 
                ORDER BY o.created_at DESC";
    }
    
    $stmt = $pdo->prepare($sql);
    if ($type !== 'all') {
        $stmt->execute([$user_id]);
    } else {
        $stmt->execute();
    }
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['success' => true, 'orders' => $orders]);
}

// Get dashboard stats (Admin)
elseif ($action === 'get_stats') {
    $stats = [];
    
    // Total users
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
    $stats['total_users'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    // Total products
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM products");
    $stats['total_products'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    // Pending products
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM products WHERE status = 'pending'");
    $stats['pending_products'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    // Total orders
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM orders");
    $stats['total_orders'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    // Total revenue
    $stmt = $pdo->query("SELECT SUM(amount) as total FROM orders WHERE status = 'completed'");
    $stats['total_revenue'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;
    
    echo json_encode(['success' => true, 'stats' => $stats]);
}

else {
    echo json_encode(['error' => 'Invalid action']);
}
?>