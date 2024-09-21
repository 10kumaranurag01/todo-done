# Todo Done

A modern task management app that uses a Kanban-style board to help users organize and track their tasks. Built with Next.js, it offers drag-and-drop functionality for an intuitive user experience.

## Table of Contents

- [Todo Done](#todo-done)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Environment Variables](#environment-variables)
  - [API Endpoints](#api-endpoints)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)
  - [Backend Repository Link](#backend-repository-link)

---

## Features

- **Create, Edit, Delete Todos**: Add tasks, edit them as needed, and remove completed or obsolete tasks.
- **Drag-and-Drop Kanban Board**: Seamlessly move tasks between columns like "To Do", "In Progress", and "Done" using DnD Kit.
- **Real-Time Updates**: Task statuses are updated dynamically across the UI.
- **Responsive Design**: Optimized for mobile and desktop views using Tailwind CSS.
- **Dialog Components**: Easy form interactions with dialog boxes built using ShadCN.
- **Authentication**: Secure login with JWT and bcrypt.

---

## Tech Stack

- **Next.js 14**: Latest features for server-side rendering and dynamic routing.
- **Tailwind CSS**: For responsive and customizable UI.
- **DnD Kit**: Drag-and-drop library for smooth task movement.
- **ShadCN**: UI components for dialogs, notifications, and more.
- **Redux**: State management for storing todos across user sessions.

---

## Installation

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

## API Endpoints

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| GET    | `/api/todos`   | Fetch all todos          |
| POST   | `/api/todos`   | Add a new todo           |
| PUT    | `/api/todos/:id`| Update an existing todo |
| DELETE | `/api/todos/:id`| Delete a todo           |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any inquiries, please contact [kumarkas1515@gmail.com](kumarkas1515@gmail.com).

---

## Backend Repository Link

[https://github.com/10kumaranurag01/todo-done-express](https://github.com/10kumaranurag01/todo-done-express).