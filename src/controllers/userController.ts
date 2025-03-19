import { getDb } from "../db"
import { User, Post, Comment } from "../types"
import { fetchData } from "../utils"

export async function loadUsers(req: any, res: any) {
  const db = getDb()
  const usersCollection = db.collection<User>("users")
  const postsCollection = db.collection<Post>("posts")
  const commentsCollection = db.collection<Comment>("comments")

  try {
    const users: User[] = await fetchData<User[]>(
      "https://jsonplaceholder.typicode.com/users"
    )
    const usersToInsert = users.slice(0, 10)

    for (const user of usersToInsert) {
      const posts: Post[] = await fetchData<Post[]>(
        `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
      )

      for (const post of posts) {
        const comments: Comment[] = await fetchData<Comment[]>(
          `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
        )
        post.comments = comments
        await commentsCollection.insertMany(comments)
      }

      user.posts = posts
      await postsCollection.insertMany(posts)
    }

    await usersCollection.insertMany(usersToInsert)
    res.statusCode = 200
    res.end()
  } catch (error) {
    res.statusCode = 500
    res.end(JSON.stringify({ message: "Internal Server Error" }))
  }
}

export async function deleteAllUsers(req: any, res: any) {
  const db = getDb()
  const usersCollection = db.collection<User>("users")

  try {
    await usersCollection.deleteMany({})
    res.statusCode = 204
    res.end()
  } catch (error) {
    res.statusCode = 500
    res.end(JSON.stringify({ message: "Internal Server Error" }))
  }
}

export async function deleteUserById(req: any, res: any, userId: number) {
  const db = getDb()
  const usersCollection = db.collection<User>("users")

  try {
    const result = await usersCollection.deleteOne({ id: userId })
    if (result.deletedCount === 0) {
      res.statusCode = 404
      res.end(JSON.stringify({ message: "User not found" }))
    } else {
      res.statusCode = 204
      res.end()
    }
  } catch (error) {
    res.statusCode = 500
    res.end(JSON.stringify({ message: "Internal Server Error" }))
  }
}

export async function getUserById(req: any, res: any, userId: number) {
  const db = getDb()
  const usersCollection = db.collection<User>("users")

  try {
    const user = await usersCollection.findOne({ id: userId })
    if (!user) {
      res.statusCode = 404
      res.end(JSON.stringify({ message: "User not found" }))
    } else {
      res.statusCode = 200
      res.end(JSON.stringify(user))
    }
  } catch (error) {
    res.statusCode = 500
    res.end(JSON.stringify({ message: "Internal Server Error" }))
  }
}

export async function createUser(req: any, res: any) {
  const db = getDb()
  const usersCollection = db.collection<User>("users")

  let body = ""
  req.on("data", (chunk: string) => {
    body += chunk.toString()
  })
  req.on("end", async () => {
    try {
      const newUser: User = JSON.parse(body)
      const existingUser = await usersCollection.findOne({ id: newUser.id })
      if (existingUser) {
        res.statusCode = 409
        res.end(JSON.stringify({ message: "User already exists" }))
      } else {
        await usersCollection.insertOne(newUser)
        res.statusCode = 201
        res.end()
      }
    } catch (error: any) {
      if (error.code === 121) {
        res.statusCode = 400
        res.end(
          JSON.stringify({
            message: "Validation failed",
            details: error.errInfo.details,
          })
        )
      } else {
        res.statusCode = 500
        res.end(JSON.stringify({ message: "Internal Server Error" }))
      }
    }
  })
}
