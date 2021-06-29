import React  from 'react';
//import { Link } from 'react-router-dom';
//import client from '../../apollo-client'
//import LibApiFind from '../../lib/LibApiFind';
//import LibTask from '../../lib/LibTask';
import LibFlash from '../../lib/LibFlash';
import LibAuth from '../../lib/LibAuth';
import LibContent from '../../lib/LibContent';

class TaskEdit extends React.Component {
  constructor(props) {
    super(props);
    this.id = (this.props.match.params.id)
    this.state = {
      user_id:"", item: {} ,title:'', author_id:'', authors:[]  
    };
  }
  async componentDidMount(){
    const valid = LibAuth.valid_login(this.props)
    if(valid){
      const uid = LibAuth.get_uid()
      var row = await LibContent.get_item(this.id)
//console.log(row.values.author_id)
     var dataAuthor = await LibContent.get_items("author")
//console.log(dataAuthor)
      this.setState({
        item: row ,title: row.values.title , author_id : row.values.author_id,
        user_id: uid, authors: dataAuthor ,
      })
      var author_id = document.getElementById('author_id');
      author_id.value= row.values.author_id
    }
  }
  async clickHandler(){
    try {
      var title = document.getElementById('title');
      var author_id = document.getElementById('author_id');
      var values = {
        "title": title.value,
        "author_id": author_id.value,
      }
      const result =await LibContent.update_item(this.id, "article", values)
console.log(result)
      var flash = {success:"Conmplete, save", error:""}
      await LibFlash.set_flash( this.state.user_id , flash)
      this.props.history.push("/article");
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
      this.props.history.push("/article");
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }
  }
  render() {
//console.log(this.state.authors)
    return (
      <div className="container py-2">
      <h3>article - Edit</h3>
      ID : {this.state.item.id} 
      <hr />   
      <label>Title:</label>
      <input type="text" name="title" id="title" className="form-control"
         defaultValue={this.state.title} />
      <hr />    
      <div className="col-md-6 form-group">
        <label>author:</label>
        <select className="form-select" name="author_id" id="author_id">
        {this.state.authors.map((item ,index) => (
          <option key={index} value={item.id}>{item.values.name}</option>
        ))
        }
        </select>
      </div> 
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
