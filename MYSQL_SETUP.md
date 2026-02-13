# MySQL Database Configuration

## ✅ This project uses MySQL exclusively!

All database operations use **MySQL** with the following configuration:

### Connection Details (backend.php)
```php
$host = 'localhost';
$dbname = 'c2c_ecommerce';
$username = 'root';
$password = '';

$pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
```

### Database Schema (database.sql)
- MySQL-specific syntax: `INT AUTO_INCREMENT PRIMARY KEY`
- MySQL data types: `VARCHAR`, `TEXT`, `DECIMAL`, `TIMESTAMP`
- MySQL constraints: `FOREIGN KEY`, `ON DELETE CASCADE`
- MySQL enums: `ENUM('user', 'admin')`

## Installation Steps

### 1. Install MySQL on macOS

**Using Homebrew (Recommended):**
```bash
brew install mysql
brew services start mysql
```

**Using MAMP:**
- Download from https://www.mamp.info
- Includes MySQL Server + phpMyAdmin GUI
- Easy one-click start/stop

### 2. Verify MySQL is Running
```bash
# Check if MySQL service is running
brew services list | grep mysql

# Or connect to MySQL
mysql -u root -p
```

### 3. Import Database
```bash
# From terminal
mysql -u root -p < database.sql

# Or use the setup script
bash setup_database.sh
```

### 4. Verify Database Created
```bash
mysql -u root -p
```
```sql
SHOW DATABASES;
USE c2c_ecommerce;
SHOW TABLES;
```

## Troubleshooting

### "mysql: command not found"
- MySQL is not installed
- Run: `brew install mysql`

### "Access denied for user 'root'"
- Update password in `backend.php`
- Or reset MySQL root password

### "Can't connect to MySQL server"
- MySQL service not running
- Run: `brew services start mysql`

### "Database 'c2c_ecommerce' doesn't exist"
- Import database.sql first
- Run: `mysql -u root -p < database.sql`

## Database Structure

### Tables Created:
1. **users** - User accounts (buyers, sellers, admins)
2. **products** - Product listings
3. **orders** - Purchase transactions

### Default Data:
- Admin user: `admin@example.com` / `admin123`
- Password is hashed with PHP's `password_hash()`

## Changing Database Credentials

Edit `backend.php` lines 3-6:
```php
$host = 'localhost';      // Change if MySQL is on different host
$dbname = 'c2c_ecommerce'; // Change database name
$username = 'root';        // Change MySQL username
$password = '';            // Add MySQL password
```

## Production Considerations

For production deployment:
- Create dedicated MySQL user (not root)
- Use strong password
- Enable MySQL SSL connections
- Set up regular backups
- Optimize MySQL configuration
- Use connection pooling

## Alternative: Using MAMP

MAMP provides a complete MySQL environment:
1. Download MAMP from https://www.mamp.info
2. Install and start MAMP
3. MySQL runs on port 3306 (or 8889 for MAMP)
4. Access phpMyAdmin: http://localhost:8888/phpMyAdmin
5. Import database.sql via phpMyAdmin SQL tab

Update `backend.php` if using MAMP's default port:
```php
$host = 'localhost:8889'; // MAMP default MySQL port
```
