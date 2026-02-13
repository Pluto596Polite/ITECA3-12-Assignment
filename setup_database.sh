#!/bin/bash
# Database setup script for C2C E-commerce

echo "Setting up MySQL database for C2C E-commerce..."
echo "Make sure MySQL is installed and running!"
echo ""
echo "Run this script with: bash setup_database.sh"
echo ""

# Check if mysql command exists
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed!"
    echo ""
    echo "Install MySQL with Homebrew:"
    echo "  brew install mysql"
    echo "  brew services start mysql"
    echo ""
    exit 1
fi

# Import the database
echo "Importing database..."
mysql -u root -p < database.sql

if [ $? -eq 0 ]; then
    echo "✅ Database setup complete!"
    echo ""
    echo "Default admin credentials:"
    echo "  Email: admin@example.com"
    echo "  Password: admin123"
else
    echo "❌ Database setup failed!"
    exit 1
fi
