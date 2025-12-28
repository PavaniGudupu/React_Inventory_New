Inventory Management System using EJS and PostgreSQL. A full-stack web app with search, filter, pagination, and CRUD operations.


# 📦 React Inventory Management System 

A full-stack **Inventory Management Web Application** built using **Node.js, Express, React, and PostgreSQL**.  
This project focuses on **real-world inventory handling** with **search, filter, pagination, CRUD operations**, and a **clean UI**.

---





## 🚀 Features

### 🧾 Product Management
- Add new products
- View product list
- Edit existing products
- Delete products

### 🔍 Search & Filter
- Search products dynamically
- Filter by:
  - Product Name
  - Category
  - MRP
  - SP
  - CP
  - Classification
  - Size
- Auto-search with debounce (typing-based search)

### 📄 Pagination
- Dynamic pagination
- First / Previous / Next / Last buttons
- Adjustable **limit per page**
- Pagination state preserved during:
  - Search
  - Filter
  - Edit
  - Delete

### 🔐 Validations
- Mandatory field validation
- ID validation (must be integer > 0)
- Price rules:
  - MRP > SP
  - MRP > CP
  - SP ≥ CP
- Duplicate product name prevention

### 🔗 Relational Database
- Products table
- Category table
- Foreign key relationship
- Data fetched using `LEFT JOIN`

---

## 🧠 Tech Stack

| Layer        | Technology |
|--------------|------------|
| Backend      | Node.js, Express.js |
| Frontend     | EJS, HTML, CSS, Bootstrap |
| Database     | PostgreSQL |
| ORM / Driver | pg |
| Validation   | Custom Middleware |
| Environment  | dotenv |

---




Server will start at:

    http://localhost:4000
    
App runs at:

    http://localhost:3000


🌐 Routes Overview

| Route                  | Method | Description                           |
| ---------------------- | ------ | ------------------------------------- |
| `/`                    | GET    | Home page                             |
| `/products`            | POST   | Product list with pagination & search |
| `/products/add`        | GET    | Add product page                      |
| `/products/add`        | POST   | Insert product                        |
| `/products/edit/:id`   | POST   | Edit product page                     |
| `/products/update`     | POST   | Update product                        |
| `/products/delete/:id` | POST   | Delete product                        |


🧪 Key Learning Outcomes

     . PostgreSQL relationships & joins 
     . Pagination logic with POST (no query params)
     . State preservation across CRUD
     . Middleware-based validation
     . EJS form-based navigation
     . Real-world inventory workflows

## 👩‍💻 Author

**G. Pavani**  
🎓 B.Tech – CSE (Data Science), 2025  
📍 Visakhapatnam, Andhra Pradesh  

📧 **Email:** pavani9419@gmail.com  
💼 **LinkedIn:** https://linkedin.com/in/pavani-gudupu-3b795528b  
🐙 **GitHub:** https://github.com/PavaniGudupu  


⭐ Support

If you like this project,
give it a ⭐ on GitHub — it motivates me to build more 🚀
