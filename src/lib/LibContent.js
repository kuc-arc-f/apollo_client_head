import client from '../apollo-client'
import Content from '../graphql/content'
import LibApiFind from '../lib/LibApiFind';
//
export default {
  get_items: async function(content_name){
    try {
      const site_id= process.env.REACT_APP_SITE_ID;
      const data = await client.query({
        query: Content.get_query_contents(site_id , content_name) ,
        fetchPolicy: "network-only"
      })
      var item = LibApiFind.convert_items(data.data.contents)
      return item      
    } catch (error) {
      alert("Error, get_items")
      console.error(error);
    }    
  },
  get_item: async function(id){
    try {
      var data = await client.query({
        query: Content.get_query_content(id) ,fetchPolicy: "network-only"
      })
      var item = data.data.content
      var row = LibApiFind.convertItemOne(item)      
      return row      
    } catch (error) {
      alert("Error, get_item")
      console.error(error);
    }    
  },
  add_item: async function(content_name, values){
    try {
      const apikey = process.env.REACT_APP_API_KEY;
      var json= JSON.stringify( values );
      var s = json.replace(/"/g , "'")
      const result = await client.mutate({
        mutation: Content.get_gql_add(apikey, content_name , s)
      })
      return result
//console.log(result)
    } catch (error) {
      alert("Error, add_item")
      console.error(error);
    }    
  },
  update_item: async function(id, content_name, values){
    try {
      const apikey = process.env.REACT_APP_API_KEY;
      var json= JSON.stringify( values );
      var s = json.replace(/"/g , "'")   
//console.log(s)  
      const result = await client.mutate({
        mutation: Content.get_gql_update(apikey, id, content_name, s)
      })      
      return result
//console.log(result)
    } catch (error) {
      alert("Error, update_item")
      console.error(error);
    }    
  },  
  delete_item: async function(id){
    try {
      const apikey = process.env.REACT_APP_API_KEY;
      const result = await client.mutate({
        mutation: Content.get_gql_delete(apikey, id)
      })           
      return result
//console.log(result)
    } catch (error) {
      alert("Error, delete_item")
      console.error(error);
    }    
  },

}
