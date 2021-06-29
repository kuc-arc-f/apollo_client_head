import { gql} from '@apollo/client';
//
const LibBook = {
  get_query_books : function(){
    return gql`
    query {
      books {
        id
        user_id
        title
        content
        category_id
        radio_1
        check_1
        date_1
      }
    }
   `   
  },  
  get_query_book : function(id){
    return gql`
    query {
      book(id: ${id} ) {
        id
        user_id
        title
        content
        category_id
        radio_1
        check_1
        date_1         
      }
    }
   `   
  },
  get_gql_add : function(user_id, title,content, category_id,
    radio_1 ,check_1, date_1){
    return gql`
    mutation {
      addBook(
          user_id: ${user_id},        
          title: "${title}", content: "${content}", category_id: ${category_id},
          radio_1: ${radio_1}, check_1: "${check_1}", date_1:"${date_1}"
        ) {
          id
        }        
    }      
   `   
  },  
  get_gql_update : function(id, title){
    return gql`
      mutation {
        updateTodo(id: ${id}, title: "${title}" ) {
          id
          title
        }
      }
   `   
  },
  get_gql_delete: function(id){
    return gql`
      mutation {
        deleteTodo(id: ${id} ) {
          id
        }
      }
   `   
  },
  get_select_list: function(){
    const arr = [
      {id: 1 , name : "select_1"} ,
      {id: 2 , name : "select_2"} ,
      {id: 3 , name : "select_3"} ,
    ]
    return arr;
  },
  get_radio_list: function(){
    const arr = [
      {id: 1 , name : "News"} ,
      {id: 2 , name : "Food"} ,
      {id: 3 , name : "other"} ,
    ]
    return arr;
  },
  get_check_list: function(){
    const arr = [
      {id: 1 , name : "tag_1"} ,
      {id: 2 , name : "tag_2"} ,
      {id: 3 , name : "tag_3"} ,
    ]
    return arr;
  },

}
export default LibBook
