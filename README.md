# C2C E-commerce Website

A complete Consumer-to-Consumer (C2C) e-commerce platform with separate user and admin interfaces.

## Features

### User Site Features
- **Homepage**: Browse all active products with search and category filtering
- **Product Listings**: View detailed product information with seller details
- **User Authentication**: Register and login functionality
- **Sell Items**: List products for sale (subject to admin approval)
- **User Dashboard**: 
  - Manage your listings
  - View your purchases
  - Track your sales
  - Edit or delete your products

### Admin Site Features
- **Dashboard**: Overview of platform statistics
- **User Management**: View and manage user roles
- **Product Moderation**: Approve or reject pending product listings
- **Product Management**: View all products by status (active, pending, sold, rejected)
- **Order Management**: View all transactions on the platform

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)
- **UI Framework**: Bootstrap 5.3.3
- **Icons**: Font Awesome 6.4.0
- **Backend**: PHP
- **Database**: MySQL

## Installation

### Prerequisites
- PHP 7.4 or higher
- **MySQL 5.7 or higher** (Required!)
- Web server (Apache/Nginx) or PHP built-in server

### Setup Instructions

1. **Install MySQL** (if not already installed)
   
   **macOS with Homebrew:**
   ```bash
   brew install mysql
   brew services start mysql
   ```
   
   **Or use MAMP:** Download from https://www.mamp.info (includes MySQL + phpMyAdmin)

2. **Database Setup**
   
   **Option A: Command Line**
   ```bash
   # Create the database and tables
   mysql -u root -p < database.sql
   ```
   
   **Option B: Using setup script**
   ```bash
   bash setup_database.sh
   ```
   
   **Option C: phpMyAdmin (if using MAMP)**
   - Open phpMyAdmin
   - Go to SQL tab
   - Copy and paste contents of `database.sql`
   - Click "Go"

2. **Configure Database Connection**
   Edit `backend.php` and update the database credentials if needed:
   ```php
   $host = 'localhost';
   $dbname = 'c2c_ecommerce';
   $username = 'root';
   $password = '';
   ```

3. **Start the Server**
   
   **Option A: PHP Built-in Server**
   ```bash
   php -S localhost:8000
   ```
   
   **Option B: XAMPP/WAMP**
   - Copy all files to `htdocs` or `www` directory
   - Access via `http://localhost/Website/`

## Usage

### Accessing the Sites

1. **User Site**: Open `index.html` in your browser
   - Homepage: Browse and search products
   - Register/Login: Create an account or sign in
   - Sell: List your items for sale
   - Dashboard: Manage your listings and view transactions

2. **Admin Site**: Navigate to `admin.html`
   - **Default Admin Credentials**:
     - Email: `admin@example.com`
     - Password: `admin123`

### User Workflow

1. **Register** a new account
2. **Login** with your credentials
3. **Browse** products on the homepage
4. **Click** on a product to view details
5. **Purchase** an item (if logged in)
6. **Sell** your own items via the "Sell Item" page
7. **Manage** your listings in the Dashboard

### Admin Workflow

1. **Login** with admin credentials
2. **Review** pending product listings
3. **Approve or Reject** products
4. **Manage** users and their roles
5. **Monitor** all orders and transactions
6. **View** platform statistics

## Product Status Flow

1. **Pending**: Product is submitted and awaiting admin approval
2. **Active**: Product is approved and visible to buyers
3. **Sold**: Product has been purchased
4. **Rejected**: Product was rejected by admin

## API Endpoints

The backend provides the following API endpoints in `backend.php`:

### Authentication
- `?action=login` - User login
- `?action=register` - User registration

### Products
- `?action=get_products` - Get products (with filters)
- `?action=get_product&id={id}` - Get single product
- `?action=create_product` - Create new product
- `?action=update_product` - Update product
- `?action=delete_product&id={id}` - Delete product
- `?action=moderate_product` - Approve/reject product (Admin)
- `?action=get_user_products&user_id={id}` - Get user's products

### Orders
- `?action=create_order` - Create new order
- `?action=get_orders&user_id={id}&type={type}` - Get orders

### Admin
- `?action=get_users` - Get all users
- `?action=update_user_role` - Update user role
- `?action=get_stats` - Get platform statistics

## File Structure

```
Website/
├── index.html          # Homepage/marketplace
├── sell.html           # List new item page
├── dashboard.html      # User dashboard
├── product.html        # Product detail page
├── admin.html          # Admin panel
├── app.js              # Frontend JavaScript
├── styles.css          # Custom styles
├── backend.php         # Backend API
├── database.sql        # Database schema
└── README.md           # This file
```

## Security Notes

- Passwords are hashed using PHP's `password_hash()` function
- Admin access is role-based
- Input validation should be enhanced for production use
- Consider adding CSRF protection
- Implement file upload validation for product images
- Add rate limiting for API endpoints

## Future Enhancements

- Image upload functionality
- Payment gateway integration
- Rating and review system
- Messaging system between buyers and sellers
- Email notifications
- Advanced search and filters
- Product categories management
- Wishlist functionality
- Order tracking system
- Analytics dashboard

## Support

For issues or questions, please contact the development team.

## License

This project is for educational purposes.
