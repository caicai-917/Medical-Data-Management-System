
<img width="526" height="558" alt="91" src="https://github.com/user-attachments/assets/fe5ba72a-5828-4c3e-ad29-d2ade28de499" />
<img width="1280" height="762" alt="911" src="https://github.com/user-attachments/assets/2289603f-4485-402c-92da-3bfd8a4d0b48" />
<img width="1280" height="487" alt="912" src="https://github.com/user-attachments/assets/8483a486-020c-4beb-b248-7f0ae8631cea" />

# Medical Data Management System

## Project Introduction
This project is a medical data management system based on **Vue 3 + Node.js + Express + SQL Server**. It enables visualized management of patient information, including user login, patient list display, detailed viewing of patient physical examination indicators, and data visualization analysis (radar chart). The system adopts a front-end and back-end separation architecture.

## Learning Objectives
- Master the development mode of separating front-end and back-end.
- Be proficient in using Vue 3 framework and related technologies (Vue Router, Axios, etc.) for front-end development.
- Learn to build API interfaces with Node.js + Express for back-end development.
- Understand how to connect to and operate SQL Server database for data storage and query.
- Grasp data visualization implementation using ECharts.

## Target Audience
- Front-end developers who want to learn back-end development and practice full-stack development.
- Back-end developers who aim to understand front-end technology stacks.
- Students and enthusiasts interested in medical information management system development.

## Project Structure
```
Medical Data Management System/
├── .vscode/        # VSCode related configuration folder
├── medical-backend/        # Backend project folder
│   ├── node_modules/   # Dependency package directory
│   ├── db.js           # Database connection configuration file
│   ├── app.js          # Main backend file with API definitions
│   └── package.json    # Backend project dependencies and script configuration file
├── medical-frontend/        # Frontend project folder
│   ├── node_modules/   # Dependency package directory
│   ├── public/         # Public static resource directory
│   ├── src/            # Frontend source code directory
│   │   ├── assets/     # Resource directory
│   │   │   └── css/    # CSS style directory
│   │   │       └── tailwind.css  # Tailwind CSS entry style file
│   │   ├── components/ # General component directory
│   │   ├── router/     # Routing configuration directory
│   │   │   └── index.js # Routing configuration file
│   │   ├── views/      # Page component directory
│   │   │   ├── LoginPage.vue     # Login page component
│   │   │   ├── PatientDetail.vue # Patient detail page component
│   │   │   ├── PatientList.vue   # Patient list page component
│   │   │   └── UserProfile.vue   # User profile page component
│   │   ├── App.vue     # Root component
│   │   └── main.js     # Frontend entry file
│   ├── tailwind.config.js # Tailwind CSS configuration file
│   ├── postcss.config.js  # PostCSS configuration file
│   └── package.json    # Frontend project dependencies and script configuration file
├── LICENSE               # License file
├── README.md        # Project description document
└── .git/            # Git version control related file directory
```

## Content Directory
1. **Project Introduction**: Overview of the system and its functions.
2. **Preparation**: Tools required for project development.
3. **Installation Steps**:
   - Install Node.js
   - Set up SQL Server database
   - Build back-end (Node.js + Express)
   - Build front-end (Vue 3 + Tailwind CSS)
4. **Run the Project**: Steps to start front-end and back-end services.
5. **Summary**: Key knowledge and skills covered in the project.

## Usage Guide
1. **Prerequisites**: Ensure VSCode, SQL Server, and Node.js are installed.
2. **Database Setup**: Create database `MedicalDB` and related tables, then insert test data.
3. **Back-end Deployment**:
   - Enter the back-end folder: `cd medical-backend`
   - Install dependencies: `npm install`
   - Start the back-end: `node app.js`
4. **Front-end Deployment**:
   - Enter the front-end folder: `cd medical-frontend`
   - Install dependencies: `npm install`
   - Start the front-end: `npm run serve`
5. **Access the System**: Open browser and visit `http://localhost:8080`, log in with account `admin` and password `123456`.

## Online Reading
For detailed code and step-by-step explanations, please refer to [the online document](https://xcn6367dhjzq.feishu.cn/docx/LmsjdYdquoT587x43rmcubz9nIg).

## License

