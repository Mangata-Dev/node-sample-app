const Item = require('./Item')
const pool = require('../services/Pool')

class List {

  list= [];

   static async addList(title)
  {
    const client = await pool.connect();
    let query = {
      name : 'add-list',
      text:'INSERT INTO list (title,created_at,modified_at) VALUES($1, NOW() , NOW() ) RETURNING *',
      values:[title]
    }
    let results = await client.query(query);
    await client.end();
    return results.rows
  };

    static async updateList(id,title)
   {
     const client = await pool.connect();
     let list =this.getList(id);
     if(list){
       let query = {
         name : 'update-list',
         text:'UPDATE list set title=$1 , modified_at = NOW() WHERE id=$2 RETURNING *',
         values:[title,id]
       }
       let results = await client.query(query);
       await client.end();
       return results.rows
     }
  }

    static async getList(id)
   {
     const client = await pool.connect();
     let query = {
       name : 'list',
       text:'SELECT * FROM list WHERE id = $1 ;',
       values:[id]
     }
     let results = await client.query(query);
     await client.end();
     return results.rows;
    }

    static async deleteList(id)
   {
     const client = await pool.connect();
     let list = this.getList(id);
     if(list){
       let query = {
         name : 'delete-list',
         text:'DELETE FROM list WHERE id=$1 RETURNING *',
         values:[id]
       }
       let results = await client.query(query);
       await client.end();
       return results.rows;
     }
    }

    static async getAllLists()
   {
     const client = await pool.connect();
     let results = await client.query('SELECT * FROM list ;');
     await client.end();
     return results.rows;
    }
    static async getListView()
   {
     const client = await pool.connect();
     let results = await client.query('SELECT * FROM view_list ;');
     await client.end();
     return results.rows;
    }
}
module.exports = List
