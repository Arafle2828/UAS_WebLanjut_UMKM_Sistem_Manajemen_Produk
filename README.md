# UMKM Product Management System

A comprehensive web-based management system for Small and Medium Enterprises (UMKM) to manage products, transactions, and generate reports. This full-stack application provides role-based access for administrators and cashiers with an intuitive interface for daily operations.

## 🚀 Features

### 👨‍💼 Administrator Features
- **Product Management**: Add, edit, delete, and view products with image upload
- **User Management**: Manage cashier accounts and user permissions
- **Transaction Reports**: Generate comprehensive sales reports and analytics
- **UMKM Management**: Manage multiple UMKM businesses within the system

### 👨‍💻 Cashier Features
- **Point of Sale (POS)**: Interactive cashier dashboard for processing transactions
- **Product Selection**: Browse and select products with real-time inventory
- **Shopping Cart**: Add/remove items with quantity management
- **Payment Processing**: Support for multiple payment methods (Cash, QRIS, Transfer)
- **Transaction History**: View personal transaction records

### 🔐 General Features
- **Authentication & Authorization**: Secure login system with JWT tokens
- **Role-based Access Control**: Different interfaces for Admin and Cashier roles
- **Responsive Design**: Mobile-friendly interface
- **Real-time Stock Management**: Automatic inventory updates after transactions
- **Image Upload**: Product image management with file upload support

## 🛠️ Technology Stack

### Frontend
- **React.js** - User interface framework
- **Axios** - HTTP client for API communication
- **CSS3** - Custom styling and responsive design
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MySQL** - Relational database
- **JWT** - Authentication and authorization
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MySQL** (v5.7 or higher)
- **Git**

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Arafle2828/UAS_WebLanjut_UMKM_Sistem_Manajemen_Produk.git
cd UAS_WebLanjut_UMKM_Sistem_Manajemen_Produk
```

### 2. Database Setup
1. Import the database schema:
```bash
mysql -u your_username -p < syntaxsql/multi_umkm_db.sql
```

2. Create a database named `multi_umkm_db` in your MySQL server

### 3. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=multi_umkm_db
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install
```

## 🚀 Running the Application

### Start the Backend Server
```bash
cd backend
npm start
# Backend will run on http://localhost:5000
```

### Start the Frontend Development Server
```bash
cd frontend
npm start
# Frontend will run on http://localhost:3000
```

## 📁 Project Structure

```
UAS_WebLanjut_UMKM_Sistem_Manajemen_Produk/
├── backend/
│   ├── controllers/         # Business logic controllers
│   │   ├── authController.js
│   │   ├── produkController.js
│   │   ├── transaksiController.js
│   │   ├── userController.js
│   │   └── laporanController.js
│   ├── middleware/          # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   ├── models/              # Database models and helpers
│   │   └── queryHelper.js
│   ├── routes/              # API route definitions
│   │   ├── authRoutes.js
│   │   ├── produkRoutes.js
│   │   ├── transaksiRoutes.js
│   │   ├── userRoutes.js
│   │   └── laporanRoutes.js
│   ├── uploads/             # Uploaded product images
│   ├── config/              # Database configuration
│   ├── package.json
│   └── index.js             # Main server file
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.js
│   │   │   └── ProductCard.js
│   │   ├── pages/           # Page components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── DashboardAdmin.js
│   │   │   ├── DashboardKasir.js
│   │   │   ├── ManageKasir.js
│   │   │   ├── Profile.js
│   │   │   ├── ReportPage.js
│   │   │   ├── About.js
│   │   │   └── Home.js
│   │   ├── css/             # Component-specific styles
│   │   ├── services/        # API service functions
│   │   │   └── api.js
│   │   ├── App.js           # Main app component
│   │   ├── AppRoutes.js     # Route definitions
│   │   └── index.js         # App entry point
│   └── package.json
├── syntaxsql/
│   └── multi_umkm_db.sql    # Database schema and sample data
└── README.md
```

## 💾 Database Schema

The system uses 5 main tables:

- **`tabel_user`**: User accounts (Admin/Cashier)
- **`tabel_umkm`**: UMKM business information
- **`tabel_produk`**: Product catalog with images
- **`tabel_transaksi`**: Transaction records
- **`tabel_detail_transaksi`**: Transaction line items

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Products
- `GET /api/produk` - Get all products
- `POST /api/produk` - Create new product
- `PUT /api/produk/:id` - Update product
- `DELETE /api/produk/:id` - Delete product

### Transactions
- `POST /api/transaksi` - Create new transaction
- `GET /api/transaksi` - Get transaction history

### Users
- `GET /api/user` - Get user profile
- `GET /api/user/kasir` - Get cashier list (Admin only)
- `POST /api/user/kasir` - Create cashier account (Admin only)

### Reports
- `GET /api/laporan` - Generate sales reports

## 👥 Default Users

After importing the database, you can use these default accounts:

**Administrator:**
- Email: `admin@umkm.com`
- Password: `admin123`

**Cashier:**
- Email: `kasir@umkm.com`
- Password: `kasir123`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Raflie Aditya**
- GitHub: [@Arafle2828](https://github.com/Arafle2828)

## 🙏 Acknowledgments

- Created as part of the Web Development Advanced (Web Lanjut) final project
- Built with modern web technologies and best practices
- Designed for real-world UMKM business needs

---

For more information or support, please open an issue in the GitHub repository.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### `Konfigurasi .env ` Bapak bisa gunakan .env.example

# Server Configuration
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=multi_umkm_db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Note: Ini hanya untuk contoh .env saja. Bapak bisa import syntax sql ke phpMyAdmin supaya memudahkan.
# Please copy this file to .env and update the values according to your local environment.
