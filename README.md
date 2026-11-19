# Student Management REST API

A REST API built with Node.js and Express.js. Student records are stored in MongoDB using Mongoose. The API keeps the original assignment's CRUD routes, JSON response format, validation, request logger, and Postman collection, while replacing the in-memory array with persistent database storage.

## Requirements

- Node.js 18 or newer
- MongoDB local installation or a MongoDB Atlas cluster

## Run the project

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your environment file by copying `.env.example` to `.env`.

   **Windows PowerShell:**
   ```powershell
   Copy-Item .env.example .env
   ```

   **macOS/Linux:**
   ```bash
   cp .env.example .env
   ```

3. Set `MONGODB_URI` in `.env` to your local MongoDB URL or Atlas connection string. Example:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/student_management
   ```

4. Start MongoDB (if using a local installation), then run:

   ```bash
   npm start
   ```

   For development with Node's watch mode:
   ```bash
   npm run dev
   ```

The server runs at `http://localhost:3000`. It will not start until MongoDB connects successfully.

## API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get a student by ID |
| POST | `/students` | Add a student |
| PUT | `/students/:id` | Update a student |
| DELETE | `/students/:id` | Delete a student |

For POST and PUT, send JSON with both `name` and `course`:

```json
{
  "name": "Aarav Sharma",
  "course": "BCA"
}
```

Student IDs are positive integers, matching the original assignment's API. On the first run against an empty database, the three original sample students (Rahul, Priya, and Amit) are inserted. New IDs are generated using a MongoDB counter, and student records persist across server restarts.

## Test with Postman

Import `postman/Student_Management_API.postman_collection.json` into Postman. Start the server and run the collection. The collection covers CRUD operations, invalid student data, and a missing student.

## Project structure

```text
Student-Management-REST-API/
├── data/
│   ├── db.js
│   └── students.js
├── middleware/
│   └── logger.js
├── postman/
│   └── Student_Management_API.postman_collection.json
├── routes/
│   └── studentRoutes.js
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## Git

The `.env` file and `node_modules/` are ignored by Git. Commit `.env.example`, not your real database credentials.
