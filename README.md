# 📚 Ecommerce Bookstore Application

A comprehensive full-stack ecommerce bookstore application built with **Spring Boot** backend and **React** frontend, featuring modern UI, complete shopping functionality, and robust backend architecture.

![Homepage](https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)

## 🌟 Project Overview

This is a production-ready ecommerce platform specifically designed for online bookstores, featuring:
- **Modern React Frontend** with Material-UI components
- **Robust Spring Boot Backend** with comprehensive API
- **Complete Shopping Experience** from browsing to checkout
- **Advanced Search & Filtering** capabilities
- **Secure Authentication** with JWT tokens
- **Responsive Design** for all devices

---

## 🎯 Frontend Features (React)

### 🔐 **Authentication System**
- ✅ User Registration with validation
- ✅ User Login with JWT tokens
- ✅ Persistent sessions across page refreshes
- ✅ Protected routes and role-based access
- ✅ Mock authentication fallback for development

### 🏠 **Homepage & UI**
- ✅ Beautiful hero section with background images
- ✅ Animated floating elements and smooth transitions
- ✅ Featured books carousel
- ✅ Statistics section with counters
- ✅ Category showcase with navigation
- ✅ Customer testimonials
- ✅ Responsive design for all screen sizes

### 📚 **Product Management**
- ✅ Product catalog with 18+ diverse books
- ✅ Advanced search functionality
- ✅ Multi-filter system (category, price, author, rating)
- ✅ Sorting options (title, price, rating)
- ✅ Pagination for large catalogs
- ✅ Product detail pages with full information
- ✅ High-quality book images with fallbacks

### 🛒 **Shopping Cart System**
- ✅ Add to cart functionality
- ✅ Live cart count in navbar
- ✅ Full cart management (add, remove, update quantities)
- ✅ Cart persistence per user
- ✅ Professional cart page with totals
- ✅ Clear cart option

### 👤 **User Experience**
- ✅ User profile management
- ✅ About Us page with company information
- ✅ Clean navigation with breadcrumbs
- ✅ Loading states and error handling
- ✅ Professional footer with links

### 🎨 **Design & Styling**
- ✅ Material-UI (MUI) component library
- ✅ Custom theme with consistent colors
- ✅ Responsive grid layouts
- ✅ Smooth animations and transitions
- ✅ Professional typography and spacing
- ✅ Mobile-first responsive design

---

## 🔧 Backend Features (Spring Boot)

### 🔐 **Authentication & Security (4 Features)**
1. **JWT Authentication** - Token-based security system
2. **User Registration** - `/auth/signup` endpoint with validation
3. **User Login** - `/auth/signin` with credential verification
4. **Password Encryption** - BCrypt hashing for security

### 👤 **User Management (3 Features)**
1. **User Profile Management** - CRUD operations for user data
2. **User Service Layer** - Business logic for user operations
3. **Role-based Access Control** - Customer/Admin role management

### 📚 **Product Management (5 Features)**
1. **Product CRUD Operations** - Create, Read, Update, Delete products
2. **Category Management** - Organize products by categories
3. **Advanced Search & Filtering** - Filter by category, price, discount
4. **Pagination Support** - Efficient handling of large product catalogs
5. **Product Details API** - Comprehensive product information

### 🛒 **Shopping Cart System (4 Features)**
1. **Cart Management** - User-specific shopping carts
2. **Cart Item Operations** - Add, remove, update item quantities
3. **Cart Persistence** - Database storage of cart data
4. **Cart Calculations** - Automatic total and discount calculations

### 📦 **Order Management (3 Features)**
1. **Order Creation** - Convert shopping carts to orders
2. **Order History** - Track and retrieve user order history
3. **Order Items Management** - Detailed line items for each order

### ⭐ **Reviews & Ratings (4 Features)**
1. **Product Reviews** - User-generated product reviews
2. **Rating System** - 5-star rating functionality
3. **Review Management** - CRUD operations for reviews
4. **Rating Aggregation** - Calculate average product ratings

### 💳 **Payment Integration (2 Features)**
1. **Payment Controller** - Ready for payment gateway integration
2. **Payment Details Storage** - Secure payment information handling

### 🏠 **Address Management (1 Feature)**
1. **User Addresses** - Shipping and billing address management

### 🛡️ **Exception Handling (4 Features)**
1. **Custom Exception Classes** - UserException, ProductException, etc.
2. **Structured Error Responses** - Consistent API error formatting
3. **Input Validation** - Request validation with proper error messages
4. **Security Exception Handling** - Authentication/authorization errors

### 🗄️ **Database Integration (6 Features)**
1. **JPA/Hibernate ORM** - Object-relational mapping
2. **Repository Pattern** - Clean data access layer
3. **Entity Relationships** - Proper database relationships
4. **Custom Query Methods** - Optimized database queries
5. **Transaction Management** - ACID compliance
6. **Multi-Database Support** - H2 for development, Oracle for production

---

## 🚀 API Documentation

### 🔐 Authentication Endpoints
```http
POST /auth/signup
Content-Type: application/json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}

POST /auth/signin
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 📚 Product Endpoints
```http
GET /api/products/products?category=fiction&minPrice=100&maxPrice=500&pageNumber=0&pageSize=12
GET /api/products/products/id/{productId}
```

### 🛒 Cart Endpoints
```http
GET /api/cart/
Authorization: Bearer {jwt_token}

PUT /api/cart/add
Authorization: Bearer {jwt_token}
Content-Type: application/json
{
  "productId": 1,
  "quantity": 2
}
```

### 👤 User Endpoints
```http
GET /api/users/profile
Authorization: Bearer {jwt_token}
```

### ⭐ Reviews & Ratings
```http
POST /api/reviews
POST /api/ratings
GET /api/products/{id}/reviews
```

---

## 💻 Technology Stack

### 🔙 Backend Technologies
- **Framework**: Spring Boot 3.5.5
- **Security**: Spring Security with JWT
- **Database**: H2 (development) / Oracle (production)
- **ORM**: Hibernate/JPA
- **Build Tool**: Maven 3.9+
- **Java Version**: 17+

### 🎨 Frontend Technologies
- **Framework**: React 18.2.0
- **UI Library**: Material-UI (MUI) 5.13.0
- **Routing**: React Router DOM 6.11.0
- **HTTP Client**: Axios 1.4.0
- **State Management**: React Context API
- **Build Tool**: Create React App
- **Node Version**: 16+

---

## 🚀 Getting Started (Windows)

### 📋 Prerequisites
```bash
# Check if you have the required versions
java -version    # Should be 17 or higher
node -v         # Should be 16 or higher
npm -v          # Should be 8 or higher
mvn -version    # Should be 3.6 or higher
```

### 📥 Installation Steps

#### 1. **Clone the Repository**
```bash
git clone <repository-url>
cd ecommerce
```

#### 2. **Backend Setup (Spring Boot)**
```bash
# Navigate to project root
cd ecommerce

# Clean and compile the project
mvn clean compile

# Run the Spring Boot application
mvn spring-boot:run

# Alternative: Build and run JAR
mvn clean package -DskipTests
java -jar target/ecommerce-0.0.1-SNAPSHOT.jar
```
**Backend will start on**: `http://localhost:5454`

#### 3. **Frontend Setup (React)**
```bash
# Open new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Alternative: Build for production
npm run build
```
**Frontend will start on**: `http://localhost:3000`

### 🔧 Development Commands

#### Backend Commands
```bash
# Run with specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Run tests
mvn test

# Generate JAR without tests
mvn clean package -DskipTests

# Run with debug mode
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"
```

#### Frontend Commands
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (not recommended)
npm run eject
```

---

## 🗄️ Database Configuration

### 🔧 H2 Database (Development)
```properties
# Default configuration in application.properties
server.port=5454
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.h2.console.enabled=true
```
**H2 Console**: `http://localhost:5454/h2-console`

### 🏢 Oracle Database (Production)
```properties
# Update application.properties for production
spring.datasource.url=jdbc:oracle:thin:@localhost:1521/XEPDB1
spring.datasource.username=BOOKSTORE
spring.datasource.password=your_password
spring.datasource.driver-class-name=oracle.jdbc.driver.OracleDriver
spring.jpa.database-platform=org.hibernate.dialect.Oracle12cDialect
```

---

## 🎯 Usage Guide

### 🔐 **Authentication**
1. **Sign Up**: Create account with any valid credentials
2. **Login**: Use `test@example.com` / `password123` for demo
3. **Features unlock**: Cart, profile, and protected pages become available

### 🛒 **Shopping Experience**
1. **Browse Products**: Visit `/products` to see the catalog
2. **Search & Filter**: Use advanced filters for category, price, author
3. **Add to Cart**: Click cart icons on product cards (login required)
4. **Manage Cart**: View, edit quantities, remove items
5. **Checkout**: Complete purchase flow (ready for payment integration)

### 👤 **User Management**
1. **Profile**: Access user profile and settings
2. **Order History**: View past orders and details
3. **Reviews**: Write and manage product reviews

---

## 🔧 Troubleshooting

### Common Issues

#### Backend Issues
```bash
# Port already in use
netstat -ano | findstr :5454
taskkill /PID <PID> /F

# Java version issues
java -version
# Update JAVA_HOME if needed

# Maven issues
mvn clean install -U
```

#### Frontend Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rmdir /s node_modules
npm install

# Port issues
# Change port in package.json or use:
set PORT=3001 && npm start
```

---

## 📊 Project Statistics

- **Total Backend Features**: 36
- **API Endpoints**: 15+
- **Frontend Components**: 25+
- **Database Entities**: 12
- **Lines of Code**: 5000+
- **Test Coverage**: Ready for implementation

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For questions, issues, or contributions:
- **Email**: [your-email@example.com]
- **GitHub Issues**: [Create an issue](../../issues)
- **Documentation**: Check this README for comprehensive guides

---

## 🎉 Acknowledgments

- **Spring Boot** team for the excellent framework
- **React** team for the powerful frontend library
- **Material-UI** for beautiful components
- **Unsplash** for high-quality images
- **Community** for inspiration and support

---

**Built with ❤️ for the love of books and technology** 📚💻

## Testing the Application

1. **Start the backend** on port 5454
2. **Start the frontend** on port 3000
3. **Open your browser** and navigate to `http://localhost:3000`
4. **Create an account** using the signup page
5. **Browse products** and test the cart functionality
6. **Add reviews and ratings** for products
7. **Manage your profile** and payment information

## Features Implemented

✅ **Database Migration**: Oracle to H2  
✅ **Authentication System**: JWT-based login/signup  
✅ **Product Catalog**: Browse and search books  
✅ **Shopping Cart**: Add, remove, update cart items  
✅ **Review System**: Write and view product reviews  
✅ **Rating System**: Rate products with star ratings  
✅ **Payment Management**: Add and manage payment methods  
✅ **Responsive Frontend**: Modern React UI with Material-UI  
✅ **Protected Routes**: Secure authentication-required pages  
✅ **Error Handling**: Comprehensive error handling and validation  

## Troubleshooting

### Backend Issues
- **Port 5454 already in use**: Kill the process or change the port in `application.properties`
- **Database connection errors**: Ensure H2 configuration is correct
- **JWT errors**: Check that the SECRET_KEY is properly configured

### Frontend Issues
- **Module not found errors**: Run `npm install` to install dependencies
- **Webpack dev server issues**: Try setting `DANGEROUSLY_DISABLE_HOST_CHECK=true`
- **CORS errors**: Ensure the backend is running on port 5454

### Common Solutions
- **Clear browser cache** if experiencing authentication issues
- **Restart both servers** if encountering connection problems
- **Check console logs** for detailed error messages

## Future Enhancements

- **Order Management**: Complete checkout and order tracking
- **Admin Panel**: Product and user management
- **Email Notifications**: Order confirmations and updates
- **Advanced Search**: Filters by author, category, price range
- **Wishlist**: Save products for later
- **Social Features**: Share reviews and recommendations
- **Mobile App**: React Native mobile application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.