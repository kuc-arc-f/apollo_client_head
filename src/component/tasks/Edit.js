import React  from 'react';
//import { Link } from 'react-router-dom';
import client from '../../apollo-client'
import LibApiFind from '../../lib/LibApiFind';
import LibTask from '../../lib/LibTask';
import LibFlash from '../../lib/LibFlash';
import LibAuth from '../../lib/LibAuth';

class TaskEdit extends React.Component {
  constructor(props) {
    super(props);
    this.id = (this.props.match.params.id)
    this.state = { user_id:"", item: {} ,title:'',content:''  };
  }
  async componentDidMount(){
    const valid = LibAuth.valid_login(this.props)
    if(valid){
      const uid = LibAuth.get_uid()
      const data = await client.query({
        query: LibTask.get_query_task(this.id) ,fetchPolicy: "network-only"
      }) 
      var item = data.data.content
      var row = LibApiFind.convertItemOne(item) 
      this.setState({
        item: row ,title: row.values.title ,content: row.values.content,
        user_id : uid
      })
    }
// console.log(items)   
  }
  async clickHandler(){
    try {
      const apikey = process.env.REACT_APP_API_KEY;
      const content_name = "tasks"    
      var title = document.getElementById('title');
      var content = document.getElementById('content');
      var values = {
        "title": title.value,
        "content": content.value,
      }
      var json= JSON.stringify( values );
      var s = json.replace(/"/g , "'")   
//console.log(s)  
      const result = await client.mutate({
        mutation: LibTask.get_gql_update(apikey, this.id, content_name, s)
      })  
console.log(result)
      var flash = {success:"Conmplete, save", error:""}
      const res = LibFlash.set_flash( this.state.user_id , flash)
      alert("Complete, update");
      this.props.history.push("/tasks");
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }    
  }
  async deleteHandler(){
    try {
      const apikey = process.env.REACT_APP_API_KEY;
      const result = await client.mutate({
        mutation: LibTask.get_gql_delete(apikey, this.id)
      })
console.log(result)
      var flash = {success:"Conmplete, delete", error:""}
      LibFlash.set_flash( this.state.user_id , flash)
      alert("Complete, delete");
      this.props.history.push("/tasks");
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }
  }
  render() {
    return (
      <div className="container py-2">
      <h3>Todos - Edit</h3>
      ID : {this.state.item.id} 
      <hr />   
      <label>Title:</label>
      <input type="text" name="title" id="title"
         defaultValue={this.state.title} />
      <hr />
      <label>Content:</label>
      <input type="text" name="content" id="content" 
      defaultValue={this.state.content} />
      <hr />      
      <button onClick={() => {this.clickHandler()}}>Update
      </button>   
      <hr />
      <button onClick={() => {this.deleteHandler()}}>Delete
      </button>
    </div>
    );
  }
}
export default TaskEdit;
