import { gql} from '@apollo/client';
//
const LibUser = {
  get_query_login: function(mail , password){
    return gql`
    query {
      user(mail: "${mail}" , password:"${password}") {
        id
        name
      }            
    }
   `   
  },

}
export default LibUser
