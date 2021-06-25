import { gql} from '@apollo/client';
//
export default {
  get_query_tasks : function(site_id , content_name){
    return gql`
    query {
      contents(site_id: "${site_id}" , content_name:"${content_name}") {
        id
        name
        values
      }      
    }
   `   
  },
  get_query_task : function(id){
    return gql`
    query {
      content(id: "${id}"){
        id
        name
        values
      }            
    }
   `   
  },
  get_query_count : function(site_id , content_name){
    return gql`
    query {
      content_count(
        site_id: "${site_id}" , content_name:"${content_name}"
      )
    }
   `   
  },  
  get_gql_add : function(apikey, content_name, values){
    return gql`
      mutation {
        addContent( apikey: "${apikey}", content_name: "${content_name}", 
        values: "${values}"
        ) {
          id
        }        
      }      
   `   
  },  
  get_gql_update : function(apikey, id, content_name, values){
    return gql`
      mutation {
        updateContent(apikey: "${apikey}", id: "${id}",
          content_name: "${content_name}", values: "${values}"
        ) {
         id
       }        
      }
   `   
  },
  get_gql_delete: function(apikey, id){
    return gql`
      mutation {
        deleteContent(apikey: "${apikey}", id: "${id}" ) {
          id
        }        
      }
   `   
  },

}
