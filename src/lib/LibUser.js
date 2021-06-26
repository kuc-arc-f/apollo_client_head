import { gql} from '@apollo/client';
//
export default {
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
