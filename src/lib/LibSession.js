//import { gql} from '@apollo/client';
import client from '../apollo-client'

import GQL_session from '../graphql/session';
//
const LibSession = {
  get_session: async function(user_id , key){
    try {
      var ret = null
      const data = await client.query({
        query: GQL_session.get_query_get(user_id , key) ,
        fetchPolicy: "network-only"
      })   
      if(data.data.session != null){
//console.log(typeof data.data.session.value)
//console.log(data.data.session)  
//        var item = data.data.session
        var value = JSON.parse(data.data.session.value || '[]')
//console.log(item)  
        ret = value 
      }
      return ret
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }    
  },
  set_session: async function(user_id , key, value){
    try {
//console.log(typeof value)
      if(typeof value === 'object'){
        value =JSON.stringify(value)
        value = value.replace(/"/g , "'")
//console.log(value)    
      }
      const result = await client.mutate({
        mutation: GQL_session.get_query_set(user_id , key , value)
      })
      return result
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }
  },
  delete_session: async function(user_id, key){
    try {
      const result = await client.mutate({
        mutation: GQL_session.get_query_delete(user_id , key)
      })
//console.log(result)      
      return result
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }    
  },  

}
export default LibSession