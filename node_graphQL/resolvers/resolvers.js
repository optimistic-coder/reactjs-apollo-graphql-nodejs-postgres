import pool from "../db/config"

const resolvers = {
  getPost : async ()=>{
    
    var response = await pool.query(`select * from post`)
    return response.rows
  },

  createPost : async (text)=>{
    var response = await pool.query(`INSERT INTO post (feed)
    VALUES ($1) returning *;`,[
      text.input.feed
    ])
    return response.rows
  
  }
}
export default resolvers;