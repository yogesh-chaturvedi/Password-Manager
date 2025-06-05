![Made with MERN](https://img.shields.io/badge/Stack-MERN-informational?style=flat&logo=javascript)

# 🔐 LockVault - Password Manager

LockVault is a secure and user-friendly password manager built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It allows users to **save**, **view**, **copy**, and **delete** their credentials for various websites—all encrypted securely.

## ✨ Features

- ✅ User Authentication (Sign Up / Login)
- 🔑 Save passwords for multiple websites
- 🔒 AES-256 encryption using Node.js `crypto` module
- 👁️ Decryption support to view/copy passwords
- 🧹 Delete saved passwords
- 📬 Password reset functionality
- 💅 Beautiful and responsive UI using **Tailwind CSS**
- 🔐 JWT-based protected routes
- 🧪 Input validation with Joi

## 🔧 Tech Stack

**Frontend:**
- React
- Tailwind CSS
- Axios (for API calls)
- React Router DOM

**Backend:**
- Node.js
- Express.js
- MongoDB(Atlas) & Mongoose
- JSON Web Tokens (JWT)
- bcrypt for hashing passwords
- `crypto` module for encryption/decryption
- Joi for validation
- dotenv
- CORS

## 🔐 How Encryption Works

When a user saves a website password:
- It is encrypted on the backend using the AES-256-CBC algorithm.
- The encrypted string is stored in MongoDB.
- When the user views their credentials, the password is decrypted and shown securely.

This ensures that your saved passwords remain safe—even if the database is compromised.

## 📁 Project Structure
```
/frontend
├── src
│ ├── components
│ ├── pages
│ └── App.jsx
/backend
├── controllers
├── models
├── routes
├── middlewares
└── main.js
.env

```

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/yogesh-chaturvedi/Password-Manager.git
cd Password-Manager
```
## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Backend Setup

``` bash
cd backend
npm install
# Create a `.env` file with the following:

# MONGO_URI=your_mongodb_connection_string

# SECRET_IS=your_jwt_secret

# PORT=your_port 

# SECRET_KEY=your_secret_crypto_string  # Used for AES encryption

npm run dev
```

## Run Both Frontend & Backend

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

## 👤 Author

- **Name**: Yogesh Chaturvedi  
- **GitHub**: [@yogesh-chaturvedi](https://github.com/yogesh-chaturvedi)

## 🔗 Live Demo

Coming soon...