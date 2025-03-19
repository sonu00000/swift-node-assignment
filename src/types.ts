export interface User {
  id: number
  name: string
  username: string
  email: string
  posts: Post[]
}

export interface Post {
  id: number
  userId: number
  title: string
  body: string
  comments: Comment[]
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}
