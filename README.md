<a id="top"></a>

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-11-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<h1 align="center">Todo Done</h1>
<h3 align="center">    


A modern task management app that uses a Kanban-style board to help users organize and track their tasks. Built with Next.js, it offers drag-and-drop functionality for an intuitive user experience.

</h3>

<hr>

<details>
  <summary><h2>:pushpin:Table of Contents: </h2></summary>

- [:zap: Features](#zap-features)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Test User Credentials](#test-user-credentials)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [API Endpoints](#api-endpoints-1)
  - [Authentication Routes](#authentication-routes)
  - [Task Management Routes](#task-management-routes)
  - [Example API Responses](#example-api-responses)
    - [Register a New User](#register-a-new-user)
    - [Login a User](#login-a-user)
    - [Get All Tasks](#get-all-tasks)
- [Environment Variables](#environment-variables-1)
- [Running the Project in Development](#running-the-project-in-development)
- [Error Handling](#error-handling)
- [Deployment](#deployment)
- [Contributors ✨](#contributors-)
- [✨Contributing](#contributing)
- [Contact](#contact)
- [Backend Repository Link](#backend-repository-link)

</details>
<hr>

## :zap: Features

- **Create, Edit, Delete Todos**: Add tasks, edit them as needed, and remove completed or obsolete tasks.
- **Drag-and-Drop Kanban Board**: Seamlessly move tasks between columns like "To Do", "In Progress", and "Done" using DnD Kit.
- **Real-Time Updates**: Task statuses are updated dynamically across the UI.
- **Responsive Design**: Optimized for mobile and desktop views using Tailwind CSS.
- **Dialog Components**: Easy form interactions with dialog boxes built using ShadCN.
- **Authentication**: Secure login with JWT and bcrypt.

---

<div>
<h2><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/High%20Voltage.png" alt="High Voltage" width="35" height="35" />Tech Stack</h2>
</div>

- **Next.js 14**: Latest features for server-side rendering and dynamic routing.
- **Tailwind CSS**: For responsive and customizable UI.
- **DnD Kit**: Drag-and-drop library for smooth task movement.
- **ShadCN**: UI components for dialogs, notifications, and more.
- **Redux**: State management for storing todos across user sessions.
- **Node.js**: Backend runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing users and tasks.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **JWT**: For authentication and securing API endpoints.
- **Zod**: Schema validation for user input.
- **bcryptjs**: Password hashing.

---

<details>
  <summary><h2> :zap:Installation: </h2></summary>

1. Clone the repository:

   ```bash
   git clone https://github.com/10kumaranurag01/todo-done.git
   ```

2. Navigate to the project directory:

   ```bash
   cd todo-done
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## Usage

1. **Create a Todo**: Click on the "Add Task" button to create a new task.
2. **Edit or Delete**: Use the task options to edit or delete existing tasks.
3. **Drag and Drop**: Move tasks between columns using drag-and-drop functionality.
4. **Authentication**: Log in securely (if implemented) to access personalized todos.

---

## Environment Variables

To run this project, you need to set the following environment variables in a `.env.local` file:

```
NEXT_PUBLIC_BASE_URL=YOUR_BACKEND_API_URL
```

---

## Test User Credentials

To test this project, you can enter the following test credentials:

```
username=testuser1
password=123456
```

---

## API Endpoints

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/todos`     | Fetch all todos         |
| POST   | `/api/todos`     | Add a new todo          |
| PUT    | `/api/todos/:id` | Update an existing todo |
| DELETE | `/api/todos/:id` | Delete a todo           |

---

</details>
<hr>

<details>
  <summary><h2> :zap:Backend: </h2></summary>

This is the backend API for a **Task Management Dashboard** that includes user authentication, task management (CRUD operations), and a Kanban board feature. The backend is built using **Express**, connected to a **MongoDB** database, and uses **JWT** for user authentication. The frontend is built with **Next.js**, and the backend is designed to integrate seamlessly with it.

## Features

- User Authentication (Register/Login) using JWT.
- Protected routes to allow only authenticated users to access tasks.
- Create, Read, Update, and Delete tasks.
- Tasks can be filtered and sorted by status, priority, and due date.
- Tasks have a Kanban-style status with drag-and-drop functionality on the frontend.
- User password encryption with `bcryptjs`.
- Input validation using `Zod`.

## Project Structure

```
task-manager-backend/
├── config/
│   └── db.js            # Database connection setup
├── controllers/
│   ├── authController.js # Handles authentication logic
│   └── taskController.js # Handles task CRUD logic
├── middlewares/
│   └── authMiddleware.js # Authentication middleware to protect routes
├── models/
│   ├── Task.js           # Task model schema
│   └── User.js           # User model schema
├── routes/
│   ├── authRoutes.js     # Routes for user authentication (login/register)
│   └── taskRoutes.js     # Routes for task operations (CRUD)
├── utils/
│   └── validate.js       # Zod validation schemas for input validation
├── .env                  # Environment variables (not included in version control)
├── app.js                # Main application file
├── package.json          # NPM dependencies and scripts
└── README.md             # Project documentation
```

## Requirements

Before starting, ensure you have:

- **Node.js** (version 14 or higher)
- **MongoDB** (local or MongoDB Atlas)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/10kumaranurag01/todo-done-express.git
   cd todo-done-express
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   At the root of the project, create a `.env` file with the following contents:

   ```bash
   MONGO_URI=mongodb://localhost:27017/taskmanager # Update this to your MongoDB URI
   JWT_SECRET=your_jwt_secret                      # Set a strong JWT secret
   ```

4. **Run the server:**

   ```bash
   npm run dev
   ```

   The server will start on **http://localhost:5000**.

## API Endpoints

### Authentication Routes

| Method | Endpoint             | Description             | Protected |
| ------ | -------------------- | ----------------------- | --------- |
| POST   | `/api/auth/register` | Register a new user     | No        |
| POST   | `/api/auth/login`    | Log in an existing user | No        |

### Task Management Routes

| Method | Endpoint         | Description                            | Protected |
| ------ | ---------------- | -------------------------------------- | --------- |
| GET    | `/api/tasks`     | Fetch all tasks for the logged-in user | Yes       |
| POST   | `/api/tasks`     | Create a new task                      | Yes       |
| PUT    | `/api/tasks/:id` | Update an existing task                | Yes       |
| DELETE | `/api/tasks/:id` | Delete a task                          | Yes       |

### Example API Responses

#### Register a New User

- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "username": "JohnDoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "60d1d20d925f3b3f30fc446e",
    "username": "JohnDoe",
    "email": "john@example.com",
    "token": "your-jwt-token"
  }
  ```

#### Login a User

- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "username": "JohnDoe",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "60d1d20d925f3b3f30fc446e",
    "username": "JohnDoe",
    "email": "john@example.com",
    "token": "your-jwt-token"
  }
  ```

#### Get All Tasks

- **Endpoint:** `GET /api/tasks`
- **Response:**
  ```json
  [
    {
      "_id": "60d1e5f9b2d3b6b5d865df36",
      "title": "Build the API",
      "description": "Finish building the backend API",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2023-12-01T00:00:00.000Z",
      "userId": "60d1d20d925f3b3f30fc446e"
    },
    {
      "_id": "60d1e602b2d3b6b5d865df37",
      "title": "Connect to MongoDB",
      "description": "Connect the API to a MongoDB database",
      "status": "To Do",
      "priority": "Medium",
      "dueDate": null,
      "userId": "60d1d20d925f3b3f30fc446e"
    }
  ]
  ```

## Environment Variables

You need to define the following environment variables in your `.env` file:

| Variable     | Description                       |
| ------------ | --------------------------------- |
| `MONGO_URI`  | MongoDB connection string         |
| `JWT_SECRET` | Secret key for signing JWT tokens |

## Running the Project in Development

To start the development server with **nodemon**, use:

```bash
npm run dev
```

This will automatically restart the server when file changes are detected.

## Error Handling

- All request validation errors are handled using **Zod**.
- Invalid JWT tokens return a 401 Unauthorized response.
- MongoDB errors and other server errors return appropriate error responses.

## Deployment

To deploy the backend:

1. Set the environment variables (`MONGO_URI`, `JWT_SECRET`) on your hosting provider (e.g., Heroku, Vercel).
2. Deploy the app on your preferred platform.
3. Ensure the frontend is correctly pointing to the deployed API.

</details>

<hr>

## Contributors ✨

Thanks to these amazing contributors:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://devanshukoli.bio.link/"><img src="https://avatars.githubusercontent.com/u/99028806?v=4?s=100" width="100px;" alt="Devanshukoli"/><br /><sub><b>Devanshukoli</b></sub></a><br /><a href="https://github.com/10kumaranurag01/todo-done/commits?author=Devanshukoli" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/vverma022"><img src="https://avatars.githubusercontent.com/u/109036913?v=4?s=100" width="100px;" alt="Vasu Verma"/><br /><sub><b>Vasu Verma</b></sub></a><br /><a href="https://github.com/10kumaranurag01/todo-done/issues?q=author%3Avverma022" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/shubhagarwal1"><img src="https://avatars.githubusercontent.com/u/105449260?v=4?s=100" width="100px;" alt="Shubh Agarwal"/><br /><sub><b>Shubh Agarwal</b></sub></a><br /><a href="https://github.com/10kumaranurag01/todo-done/commits?author=shubhagarwal1" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Aditijainnn"><img src="https://avatars.githubusercontent.com/u/144632601?v=4?s=100" width="100px;" alt="Aditi"/><br /><sub><b>Aditi</b></sub></a><br /><a href="https://github.com/10kumaranurag01/todo-done/commits?author=Aditijainnn" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://kalevin.dev/"><img src="https://avatars.githubusercontent.com/u/51754037?v=4?s=100" width="100px;" alt="Kevin Muñoz Rengifo"/><br /><sub><b>Kevin Muñoz Rengifo</b></sub></a><br /><a href="https://github.com/10kumaranurag01/todo-done/commits?author=Kalevins" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Abhiraj-Sardar"><img src="https://avatars.githubusercontent.com/u/122967579?v=4?s=100" width="100px;" alt="ABHIRAJ SARDAR"/><br /><sub><b>ABHIRAJ SARDAR</b></sub></a><br /><a href="https://github.com/10kumaranurag01/todo-done/issues?q=author%3AAbhiraj-Sardar" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Villain45"><img src="https://avatars.githubusercontent.com/u/54493047?v=4?s=100" width="100px;" alt="Prateek Hebsur"/><br /><sub><b>Prateek Hebsur</b></sub></a><br /><a href="https://github.com/10kumaranurag01/todo-done/issues?q=author%3AVillain45" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/toufiqfarhan0"><img src="https://avatars.githubusercontent.com/u/144435177?v=4?s=100" width="100px;" alt="Farhan"/><br /><sub><b>Farhan</b></sub></a><br /><a href="https://github.com/10kumaranurag01/todo-done/commits?author=toufiqfarhan0" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/akshatshukla13"><img src="https://avatars.githubusercontent.com/u/103410083?v=4?s=100" width="100px;" alt="Akshat Shukla"/><br /><sub><b>Akshat Shukla</b></sub></a><br /><a href="https://github.com/10kumaranurag01/todo-done/commits?author=akshatshukla13" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AnanteshG"><img src="https://avatars.githubusercontent.com/u/139615557?v=4?s=100" width="100px;" alt="Anantesh G"/><br /><sub><b>Anantesh G</b></sub></a><br /><a href="https://github.com/10kumaranurag01/todo-done/commits?author=AnanteshG" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [All Contributors](https://allcontributors.org/) specification. Contributions of any kind are welcome!

## ✨Contributing

Check out the `CONTRIBUTE.md` file for guidelines on how
to contribute to this project.

---

## Contact

For any inquiries, please contact [kumarkas1515@gmail.com](kumarkas1515@gmail.com).

---

<!-- License -->
<div>
<h2><img src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Page%20with%20Curl.png" width="35" height="35"> License:</h2>
</div>

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)<br>
This project is licensed under the [MIT License](./LICENSE).

<hr>

## Backend Repository Link

[https://github.com/10kumaranurag01/todo-done-express](https://github.com/10kumaranurag01/todo-done-express).

<div>
  <h2><img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f64f_1f3fb/512.webp" width="35" height="35"> Support </h2>
</div>

<div>
  Don't forget to leave a star<img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31f/512.webp" width="35" height="30"> for this project!
</div> <br>

<a href="#top" style="position: fixed; bottom: 20px; right: 20px; background-color: black ; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; font-family: Arial; font-size: 16px;">Go to Top</a>
