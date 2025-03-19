import { MongoClient, Db } from "mongodb"
import { userSchema, postSchema, commentSchema } from "./schemas"

const uri = "mongodb://127.0.0.1:27017" // using IPv4 address explicitly
const client = new MongoClient(uri)

let db: Db

export async function connectToDatabase() {
  try {
    await client.connect()
    db = client.db("user_management_db")

    // Create collections if they don't exist
    await createCollections()

    // Apply schema validation to collections
    await applySchemaValidation(db)

    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    process.exit(1)
  }
}

async function createCollections() {
  const collections = await db.listCollections().toArray()
  const collectionNames = collections.map((col) => col.name)

  // Create collections if they don't exist
  if (!collectionNames.includes("users")) {
    await db.createCollection("users", {
      validator: userSchema,
    })
  }

  if (!collectionNames.includes("posts")) {
    await db.createCollection("posts", {
      validator: postSchema,
    })
  }

  if (!collectionNames.includes("comments")) {
    await db.createCollection("comments", {
      validator: commentSchema,
    })
  }
}

async function applySchemaValidation(db: Db) {
  // Apply schema validation to collections
  await db.command({
    collMod: "users",
    validator: userSchema,
  })

  await db.command({
    collMod: "posts",
    validator: postSchema,
  })

  await db.command({
    collMod: "comments",
    validator: commentSchema,
  })

  console.log("Schema validation applied to collections")
}

export function getDb() {
  if (!db) {
    throw new Error("Database not initialized")
  }
  return db
}
