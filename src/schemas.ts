export const userSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["id", "name", "username", "email", "posts"],
    properties: {
      id: {
        bsonType: "number",
        description: "must be a number and is required",
      },
      name: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      username: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      email: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      posts: {
        bsonType: "array",
        description: "must be an array of posts",
        items: {
          bsonType: "object",
          required: ["id", "userId", "title", "body", "comments"],
          properties: {
            id: {
              bsonType: "number",
              description: "must be a number and is required",
            },
            userId: {
              bsonType: "number",
              description: "must be a number and is required",
            },
            title: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            body: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            comments: {
              bsonType: "array",
              description: "must be an array of comments",
              items: {
                bsonType: "object",
                required: ["id", "postId", "name", "email", "body"],
                properties: {
                  id: {
                    bsonType: "number",
                    description: "must be a number and is required",
                  },
                  postId: {
                    bsonType: "number",
                    description: "must be a number and is required",
                  },
                  name: {
                    bsonType: "string",
                    description: "must be a string and is required",
                  },
                  email: {
                    bsonType: "string",
                    description: "must be a string and is required",
                  },
                  body: {
                    bsonType: "string",
                    description: "must be a string and is required",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

export const postSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["id", "userId", "title", "body", "comments"],
    properties: {
      id: {
        bsonType: "number",
        description: "must be a number and is required",
      },
      userId: {
        bsonType: "number",
        description: "must be a number and is required",
      },
      title: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      body: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      comments: {
        bsonType: "array",
        description: "must be an array of comments",
        items: {
          bsonType: "object",
          required: ["id", "postId", "name", "email", "body"],
          properties: {
            id: {
              bsonType: "number",
              description: "must be a number and is required",
            },
            postId: {
              bsonType: "number",
              description: "must be a number and is required",
            },
            name: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            email: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            body: {
              bsonType: "string",
              description: "must be a string and is required",
            },
          },
        },
      },
    },
  },
}

export const commentSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["id", "postId", "name", "email", "body"],
    properties: {
      id: {
        bsonType: "number",
        description: "must be a number and is required",
      },
      postId: {
        bsonType: "number",
        description: "must be a number and is required",
      },
      name: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      email: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      body: {
        bsonType: "string",
        description: "must be a string and is required",
      },
    },
  },
}
