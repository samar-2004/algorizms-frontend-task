# Algorizms Frontend Task 

This is a modern, mobile-responsive frontend built for the **Algorizms Summer Internship Task**, simulating the MVP of a digital logistics platform called **Uqaab**.

The app allows users to register or log in and then explore a curated list of freight loads with advanced features like real-time search, smart suggestions, sorting & pagination.

> 🔗 **Live Demo**: [https://algorizms-frontend-task.vercel.app](https://algorizms-frontend-task.vercel.app)

---

## 🌟 Features

### 🔐 Authentication

- Sign Up and Login pages with real-time field validation.
- Password visibility toggle using modern icons.
- Error handling and form UX optimized.

### 🔍 Load Search Page

- **Search by origin or destination**
- **Auto-suggest dropdown** with keyboard navigation support
- **Sorting options** (by date or weight)
- **Paginated results**
- Responsive grid view of load cards


## 🛠 Tech Stack

| Tech             | Purpose                               |
|------------------|----------------------------------------|
| React (Vite)     | Fast, lightweight React tooling        |
| Tailwind CSS     | Utility-first responsive styling       |
| React Router     | Page routing between views             |
| Lucide React     | Beautiful modern icons (eye toggle)    |
| React Hot Toast  | Toast notifications for feedback       |
| Vercel           | Deployment platform                    |

---

## 📁 Folder Structure

src/
├── components/
| |__ ConfirmDialog.jsx   
│ └── LoadCard.jsx # Load display card
├── pages/
│ ├── Login.jsx # Login screen
│ ├── Signup.jsx # Registration screen
│ └── LoadSearch.jsx # Search/sort/paginate loads
├── data/
│ └── mockLoad.js # Mock load data
├── App.jsx # App routes and theme logic
└── main.jsx # Entry point

🧑‍💻 Author
Muhammd Samar Junaid
Frontend Developer – Algorizms Internship Task
📫 Email: samarjunaid1994@example.com