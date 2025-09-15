# 📚 StudyHub

> A Full Stack Online Learning Platform built with the MERN stack, enabling instructors to create and manage courses, and learners to access quality education from anywhere.

---

## 📝 Project Description

StudyHub is a fully functional ed-tech platform that enables instructors to create, manage, and deliver courses, and allows students to browse, enroll, and track their learning journey. The platform is built using the MERN stack (MongoDB, Express, React, Node.js) and aims to provide:

- A seamless and interactive learning experience for students, making education more accessible and engaging.
- A platform for instructors to showcase their expertise and connect with learners across the globe.

In the following sections, we will cover the technical details of the platform, including:

1. **System Architecture**: High-level overview of the platform's components.
2. **Front-end**: Description of the front-end architecture, UI design, features, frameworks, and tools.
3. **Back-end**: Description of the back-end architecture, features, frameworks, libraries, tools, data models, and database schema.
4. **API Design**: List of API endpoints, their functionalities, and sample requests and responses.
5. **Deployment**: Overview of the deployment process, hosting environment, and infrastructure.
6. **Testing**: Testing process, types, frameworks, and tools used.
7. **Future Enhancements**: Potential future improvements to the platform.

---

## 🏗️ System Architecture

StudyHub follows a client-server architecture, consisting of the following components:

### Front-end
The platform's frontend is built using React.js, providing a dynamic and responsive user interface. It communicates with the back end via RESTful APIs to handle user actions such as course browsing and enrollment.

### Back-end
Built with Node.js and Express.js, the back end serves APIs for functionalities such as user authentication, course management, and content delivery. The server logic handles the processing and storing of course data and user information.

### Database
MongoDB stores unstructured and semi-structured data, including course content (videos, PDFs, images) and user data. Its flexibility allows for easy scalability and efficient management of dynamic content.

### Architecture Diagram
Here is a high-level diagram that illustrates the architecture of the StudyHub ed-tech platform:
![Architecture Diagram](https://res.cloudinary.com/dvpulu3cc/image/upload/v1699036870/Screenshot_2023-11-04_000952_argzj8.jpg)

---

## 🌐 Live Demo

[🔗 Deployed Link](https://studyhub-frontend-woad.vercel.app)

---

## ✨ Features

### 👨‍🏫 Instructor Features
- Instructor Registration/Login
- Course creation with title, description, and video content
- Video uploads using Cloudinary
- Dashboard to manage courses and view enrolled students

### 👩‍🎓 Learner Features
- Student Registration/Login
- Browse and enroll in courses
- Stream course videos
- View enrolled courses and track progress

### 🔐 Common Features
- JWT-based authentication
- Role-based access control (Instructor & Student)
- Responsive and clean UI using Tailwind CSS
- Modular and scalable codebase

---

## 🛠️ Tech Stack

| Layer              | Technology                                                                 |
|--------------------|----------------------------------------------------------------------------|
| **Frontend**       | [React.js](https://reactjs.org/), [Redux Toolkit](https://redux-toolkit.js.org/), [Tailwind CSS](https://tailwindcss.com/), [Axios](https://axios-http.com/) |
| **Backend**        | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [Mongoose](https://mongoosejs.com/) |
| **Database**       | [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud-hosted NoSQL DB)     |
| **Authentication** | [JWT](https://jwt.io/), [bcrypt.js](https://github.com/kelektiv/node.bcrypt.js), Google OAuth 2.0 |
| **Cloud Storage**  | [Cloudinary](https://cloudinary.com/)                                     |
| **Payments**       | [Razorpay](https://razorpay.com/)                                          |
| **Email Service**  | [Nodemailer](https://nodemailer.com/) with SMTP (e.g., Gmail)   |
| **Dev Tools**      | [Postman](https://www.postman.com/), [VS Code](https://code.visualstudio.com/), [GitHub](https://github.com/), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/) |
| **Environment Config** | [dotenv](https://github.com/motdotla/dotenv)                         |
| **Build & Deploy** | [Vite](https://vitejs.dev/) (Frontend), [Vercel](https://vercel.com/) (Frontend Hosting), [Vercel](https://vercel.com/) (Backend Hosting) |


## 📁 Folder Structure

```
StudyHub/
├── Client/                           # Frontend React app
│   ├── .env                          # Frontend environment variables
│   ├── index.html                    # Main HTML file
│   ├── package.json                  # Frontend dependencies and scripts
│   ├── vite.config.js                # Vite config for frontend build
│   ├── public/                       # Static assets
│   └── src/                          # Source code
│       ├── App.jsx                   # App root component
│       ├── main.jsx                  # Entry point
│       ├── index.css                 # Global styles
│       ├── assets/                   # Images, icons, banners, logos
│       ├── components/               # Reusable UI components
│       │   ├── Authentication/       # Login, signup, Google button, etc.
│       │   ├── Common/               # Shared UI elements (Navbar, Footer, etc.)
│       │   ├── Core/                 # Course-related views and logic
│       │   ├── Dashboard/            # Student & Instructor dashboards
│       │   └── Home/                 # Homepage sections
│       ├── data/                     # JSON/static mock data
│       ├── pages/                    # Route-based pages (Home, Login, Signup, etc.)
│       ├── redux/                    # Redux store and feature slices
│       ├── services/                 # API connectors and operations
│       └── utils/                    # Utility functions
│
├── Server/                           # Backend Express app
│   ├── .env                          # Backend environment variables
│   ├── server.js                     # Server entry point
│   ├── package.json                  # Backend dependencies and scripts
│   ├── Configurations/              # DB, Cloudinary, Razorpay setup
│   ├── Controllers/                 # API logic and route handlers
│   ├── Extra/                       # File upload handling, additional logic
│   ├── Middlewares/                # Custom middleware
│   │   ├── Authentication/          # JWT auth middleware
│   │   └── Authorization/           # Role-based access control
│   ├── Models/                      # MongoDB models/schemas
│   ├── Routes/                      # Route definitions
│   ├── Templates/                  # Email templates and assets
│   │   ├── Controllers/             # Mail preview images
│   │   └── Mails/                   # Email HTML/JS templates
│   └── utils/                       # Utility functions (e.g., fileUploader, mailSender)
│
├── LICENSE                          # License file
└── README.md                        # Main documentation file
```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/aayanofficial5/StudyHub.git
cd StudyHub
```

---

### 2. Install Dependencies

```bash
# For frontend
cd Client
npm install

# For backend
cd Server
npm install
```

---

### 3. Set up Environment Variables

#### For the Backend:
Create a `.env` file inside the `/Server` folder with the following configuration:

```env
# Server Configuration
PORT=4000
BACKEND_URL=<your_backend_url_here>/api/v1   # (e.g., http://localhost:4000/api/v1)
FRONTEND_URL=<your_frontend_url_here> # (e.g., http://localhost:5173)
DATABASE_URL=<your_database_connection_url_here>

# JWT Secret for Authentication
JWT_SECRET=<your_jwt_secret_here>

# Cloud Storage (e.g., Cloudinary) Configuration
CLOUD_NAME=<your_cloud_name_here>
API_KEY=<your_api_key_here>
API_SECRET=<your_api_secret_here>
FOLDER_NAME=<your_folder_name_here>

# Mail Service Configuration
MAIL_HOST=<your_mail_host_here>
MAIL_USER=<your_mail_user_here>
MAIL_PASS=<your_mail_password_here>

# Razorpay Payment Gateway Configuration
RAZORPAY_ID=<your_razorpay_id_here>
RAZORPAY_SECRET=<your_razorpay_secret_here>

# Google Signup/Login Configurations
GOOGLE_CLIENT_ID = <your_google_client_id>
GOOGLE_CLIENT_SECRET = <your_google_client_secret>
```

#### For the Frontend:
Create a `.env` file inside the `/Client` folder with the following configuration:

```env
# Vite API URL (to connect with the backend API)
VITE_API_URL=<your_backend_url_here>/api/v1   # (e.g., http://localhost:4000/api/v1)

# Razorpay Payment Gateway Configuration
VITE_RAZORPAY_ID=<your_razorpay_id_here>

# Google Signup/Login Configurations
VITE_GOOGLE_CLIENT_ID = <your_google_client_id>
```

---

### 4. Run the App

```bash
# Start backend in a terminal with the following commands:
cd Server
npm run dev

# Start frontend in another terminal with the following commands:
cd Client
npm run dev
```

---

## 💡 Future Improvements

- Chat or forum feature for learners
- Admin dashboard for platform management

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/aayanofficial5/KnowGeek/issues).

---

## 📧 Contact

Developed with ❤️ by [**Aayan Patel**](https://github.com/aayanofficial5)  
📬 Email: *aayanofficial5@gmail.com*

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
