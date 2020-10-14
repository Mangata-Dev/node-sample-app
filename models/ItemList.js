const Item = require('./Item')
const List = require('./List')
const pool = require('../services/Pool')

class ItemList {

  list= [];

   static async addItem(name,list_id)
  {
    const client = await pool.connect();
    let query = {
      name : 'add-item',
      text:'INSERT INTO item (name,list_id,created_at,modified_at) VALUES($1, $2 , NOW() , NOW() ) RETURNING *',
      values:[name,list_id]
    }
    let results = await client.query(query).then( async (res,req) =>{
        // update list modified_at , should have better way for doing this
        let item = res.rows.pop();
        let arrayList = await List.getList(item.list_id);
        let list = arrayList.pop();
        let resultsUp = await List.updateList(list.id,list.title)

        return item
    });
    await client.end();
    return results;

  };

    static async updateItem(id,name,done)
   {
     const client = await pool.connect();
     let arrayItem = await this.getItem(id);
     let item = arrayItem.pop();
     console.log(item)
     if(!name){
       name = item.name
     }
     if(item){
       let query = {
         name : 'update-item',
         text:'UPDATE item set name=$1 , modified_at = NOW() , done=$3  WHERE id=$2 RETURNING *',
         values:[name,id,done]
       }
       let results = await client.query(query);
       await client.end();
       return results.rows
     }
  }

    static async getItem(id)
   {
     const client = await pool.connect();
     let query = {
       name : 'item',
       text:'SELECT * FROM item WHERE id = $1 ;',
       values:[id]
     }
     let results = await client.query(query);
     await client.end();
     return results.rows;
    }

    static async deleteItem(id)
   {
     const client = await pool.connect();
     let item = this.getItem(id);
     if(item){
       let query = {
         name : 'delete-item',
         text:'DELETE FROM item WHERE id=$1 RETURNING *',
         values:[id]
       }
       let results = await client.query(query);
       await client.end();
       return results.rows;
     }
    }

    static async getAllItems(list_id)
   {
     const client = await pool.connect();
     let query = {
       name : 'list-items',
       text:'SELECT * FROM item WHERE list_id=$1;',
       values:[list_id]
     }
     let results = await client.query(query)
     .then((res,req)=>{
        return res.rows
     })
     .catch((error)=>{
        return false;
     });
     await client.end();
     return results;
    }
}
module.exports = ItemList
