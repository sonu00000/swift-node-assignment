# Node.js Assignment - User, Post, and Comment Management

This project is a REST API built using **Node.js** and **MongoDB** without using frameworks like Express or Mongoose. It manages users, their posts, and comments on those posts. The project uses **TypeScript** for type safety and **MongoDB** for data storage.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [API Endpoints](#api-endpoints)
5. [Database Schema](#database-schema)
6. [Error Handling](#error-handling)

---

## Features

- **User Management**: Create, read, and delete users.
- **Post Management**: Each user can have multiple posts.
- **Comment Management**: Each post can have multiple comments.
- **Schema Validation**: MongoDB schema validation ensures data integrity.
- **Type Safety**: TypeScript is used for type checking and IntelliSense.

---

## Technologies Used

- **Node.js**: Runtime environment for the server.
- **MongoDB**: NoSQL database for storing users, posts, and comments.
- **TypeScript**: Adds type safety to JavaScript.
- **Fetch API**: Used for making HTTP requests to external APIs.
- **MongoDB Native Driver**: Interacts with MongoDB without Mongoose.

---

## Setup Instructions

### Prerequisites

1. **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/).
2. **MongoDB**: Install MongoDB from [mongodb.com](https://www.mongodb.com/).
3. **TypeScript**: Install TypeScript globally using:
   ```bash
   npm install -g typescript
   ```

### Steps to Run the Project

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Start MongoDB**:
   Ensure MongoDB is running on your machine. By default, it runs on `mongodb://127.0.0.1:27017`.

3. **Compile TypeScript**:

   ```bash
   npm run build
   ```

4. **Run the Server**:

   ```bash
   npm start
   ```

5. **Test the API**:
   Use tools like **Postman** or **curl** to test the API endpoints.

---

## API Endpoints

### Users

| HTTP Method | URL              | Description                                   |
| ----------- | ---------------- | --------------------------------------------- |
| `GET`       | `/load`          | Loads 10 users with their posts and comments. |
| `DELETE`    | `/users`         | Deletes all users.                            |
| `DELETE`    | `/users/:userId` | Deletes a specific user by ID.                |
| `GET`       | `/users/:userId` | Retrieves a specific user by ID.              |
| `PUT`       | `/users`         | Creates a new user.                           |

### Posts

Each user has an array of posts. Posts are automatically created when loading users.

### Comments

Each post has an array of comments. Comments are automatically created when loading users.

---

## Database Schema

### Users Collection

```typescript
interface User {
  id: number
  name: string
  username: string
  email: string
  posts: Post[]
}
```

### Posts Collection

```typescript
interface Post {
  id: number
  userId: number
  title: string
  body: string
  comments: Comment[]
}
```

### Comments Collection

```typescript
interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}
```

---

## Error Handling

The API returns appropriate HTTP status codes and error messages for different scenarios:

- **400 Bad Request**: Invalid input data.
- **404 Not Found**: Resource not found.
- **409 Conflict**: Resource already exists.
- **500 Internal Server Error**: Server-side error.

Example error response:

```json
{
  "message": "User not found"
}
```

---
