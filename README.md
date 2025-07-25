Sure! Here's a complete, ready-to-copy **`README.md`** for your project:

---

````markdown
# 📊 Excel Analytics Platform

A full-stack MERN application that allows users to upload Excel files, analyze and visualize the data with AI-generated insights, view upload history, and manage user access through an admin panel.

---

## 🚀 Features

- ✅ User authentication (JWT)
- ✅ Upload Excel files (.xls, .xlsx)
- ✅ Parse Excel data with SheetJS
- ✅ Visualize data using Chart.js
- ✅ Get AI-powered insights from OpenAI
- ✅ View and manage upload history
- ✅ Admin dashboard for user management

---

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB, Multer, SheetJS
- **AI**: OpenAI API (GPT-3.5 or GPT-4)
- **Auth**: JWT (JSON Web Tokens)
- **Charting**: Chart.js

---

## ⚙️ Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Diviya23/excel-analytics-platform.git
cd excel-analytics-platform
````

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

Start the backend server:

```bash
npm start
```

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

Frontend will run at: `http://localhost:3000`

---

## 🧪 Folder Structure

```
excel-analytics-platform/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── .env
├── frontend/
│   ├── src/
│   └── public/
└── README.md
```

---

## 🔐 Admin Access

If a user is created with role `"admin"`, they can access the admin panel at:

```
http://localhost:3000/admin
```

---

## 📦 Deployment (optional)

You can deploy the platform using:

* **Frontend**: Vercel or Netlify
* **Backend**: Render, Railway, or Heroku
* **Database**: MongoDB Atlas

---

## 🙋‍♀️ Author

**Diviya Sree**
[GitHub: @Diviya23](https://github.com/Diviya23)

---

## 📄 License

This project is licensed under the **MIT License**.
