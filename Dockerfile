# Use an official PHP image with Apache
FROM php:8.2-apache

# Install MySQL extension for your e-commerce DB
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copy your project files to the server directory
COPY . /var/www/html/

# Expose port 80
EXPOSE 80