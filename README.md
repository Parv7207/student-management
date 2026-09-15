# Student Management REST API
A simple REST API for managing student information using Node.js and Express.js.

## Tech Stack
- Node.js
- Express.js

## How to Run
Install dependencies:
npm install
Start the server:
node server.js
Server runs at:
http://localhost:3000

## API Documentation
| Method | Endpoint | Purpose |
|---|---|---|
| GET | /students | Get all students |
| GET | /students/:id | Get student by ID |
| POST | /students | Add student |
| PUT | /students/:id | Update student |
| DELETE | /students/:id | Delete student |

## POST Request
```json
{
    "name": "Rahul",
    "age": 20,
    "course": "BTech"
}