import http from "http"
import { connectToDatabase } from "./db"
import {
  loadUsers,
  deleteAllUsers,
  deleteUserById,
  getUserById,
  createUser,
} from "./controllers/userController"

const PORT = 3000

async function startServer() {
  await connectToDatabase()

  const server = http.createServer(async (req, res) => {
    const url = req.url
    const method = req.method

    res.setHeader("Content-Type", "application/json")

    if (url === "/load" && method === "GET") {
      await loadUsers(req, res)
    } else if (url === "/users" && method === "DELETE") {
      await deleteAllUsers(req, res)
    } else if (url?.startsWith("/users/") && method === "DELETE") {
      const userId = parseInt(url.split("/")[2], 10)
      await deleteUserById(req, res, userId)
    } else if (url?.startsWith("/users/") && method === "GET") {
      const userId = parseInt(url.split("/")[2], 10)
      await getUserById(req, res, userId)
    } else if (url === "/users" && method === "PUT") {
      await createUser(req, res)
    } else {
      res.statusCode = 404
      res.end(JSON.stringify({ message: "Not Found" }))
    }
  })

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

startServer()
