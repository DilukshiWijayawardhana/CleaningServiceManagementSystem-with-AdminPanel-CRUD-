![image](https://github.com/user-attachments/assets/83d8ea55-23bd-4204-b382-f70b11f4835f)

# 🧹 Cleaning Service Management System with Admin Panel (CRUD)

A full-stack web application that allows users to book cleaning services and manage their bookings. It also includes an **Admin Panel** for overseeing all bookings and managing service offerings. Features include user authentication, role-based access control (Admin & Customer), Joi validation, and secure password handling.


---

## 📌 Project Overview

This project was completed as part of an assignment to build a CRUD-based Cleaning Service Management System in 2 days.

### 👤 Users:
- **Customers** can book, view, update, and cancel their service bookings.
- **Admins** can view all bookings and manage service offerings.

---

## ⚙️ Tech Stack

| Layer       | Technologies                          |
|-------------|----------------------------------------|
| Frontend    | React, Material UI                     |
| Backend     | Node.js, Express.js                    |
| Database    | MySQL (via Prisma ORM)                 |
| Auth        | JWT, Password Hashing (bcrypt)         |
| Validation  | Joi                                    |
| Deployment  | Vercel (Frontend), Docker or Local (Backend) |

---

## ✨ Core Features

### 🧍 User Functionality (Customer Role)
- ✅ Register/Login
- ✅ Book a Cleaning Service
  - Customer Name
  - Address
  - Date & Time
  - Service Type (dropdown: e.g., Deep Cleaning, Carpet Cleaning)
- ✅ View Own Bookings
- ✅ Edit or Cancel Bookings

### 🛠️ Admin Functionality
- ✅ View All Bookings
- ✅ Manage Services (Add, Edit, Delete)

---

## 🔐 Authentication & Authorization

- **JWT-based Authentication**
- **Role-based Access Control**:
  - Admin and Customer have separate privileges.
- **Secure Passwords**: Passwords are hashed using bcrypt before storing in the database.

---

## ✅ Data Validation

All API request payloads are validated using **Joi** to ensure data integrity and prevent malformed input.

---

## 🗄️ Database Schema (Sample)

### `User`
- `id`: Auto-generated
- `username`: Unique
- `password_hash`: Encrypted string
- `role`: Enum (`ADMIN` or `CUSTOMER`)

### `Service`
- `id`: Auto-generated
- `name`: String (required)

### `Booking`
- `id`: Auto-generated
- `customer_name`: String (required)
- `address`: String (required)
- `date_time`: Timestamp (required)
- `service_id`: Foreign key
- `user_id`: Foreign key

---

## 🔧 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/cleaning-service-app.git
cd cleaning-service-app
