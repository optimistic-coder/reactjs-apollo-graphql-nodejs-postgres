import {buildSchema} from 'graphql'
const schema = buildSchema(`
  type Post {
    id : ID
    feed : String
  }

  type Query { 
      getPost : [Post]
  }

  input PostInput { 
      feed : String
  }

  type Mutation {
      createPost(input : PostInput) : [Post]
  }
`)
export default schema;