import React  from 'react';
//import { Link } from 'react-router-dom';
import LibFlash from '../../lib/LibFlash';
import LibAuth from '../../lib/LibAuth';
import LibContent from '../../lib/LibContent';

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
      var row = await LibContent.get_item(this.id)
      this.setState({
        item: row ,title: row.values.title ,content: row.values.content,
        user_id : uid
      })
    }
// console.log(row)   
  }
  async clickHandler(){
    try {
      var title = document.getElementById('title');
      var content = document.getElementById('content');
      var values = {
        "title": title.value,
        "content": content.value,
      }
      const result =await LibContent.update_item(this.id, "tasks", values)
console.log(result)      
      var flash = {success:"Conmplete, save", error:""}
      await LibFlash.set_flash( this.state.user_id , flash)
      alert("Complete, update");
      this.props.history.push("/tasks");
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }    
  }
  async deleteHandler(){
    try {
      const result =await LibContent.delete_item(this.id)
console.log(result)
      var flash = {success:"Conmplete, delete", error:""}
      await LibFlash.set_flash( this.state.user_id , flash)
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
