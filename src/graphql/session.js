import { gql} from '@apollo/client';
//
const session = {
  get_query_get: function(user_id , key){
    return gql`
    query {
      session(user_id: "${user_id}", key: "${key}"){
        id
        key
        value
      }                  
    }
   `   
  },
  get_query_set: function(user_id , key , value){
    return gql`
    mutation {
      addSession( user_id: "${user_id}", key: "${key}",value: "${value}"
      ) {
       id
      }                        
    }
   `   
  },
  get_query_delete: function(user_id , key ){
    return gql`
    mutation {
      deleteSession(user_id: "${user_id}", key: "${key}") {
        id
      }
    }
   `   
  },
}
export default session