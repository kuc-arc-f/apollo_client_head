import React  from 'react';
//import { Link } from 'react-router-dom';
import LibFlash from '../../lib/LibFlash';
import LibAuth from '../../lib/LibAuth';
import LibContent from '../../lib/LibContent';

class TaskCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user_id: 0 , authors:[]};
  }
  async componentDidMount(){
    const valid = LibAuth.valid_login(this.props)
    if(valid){
      const uid = LibAuth.get_uid()
      var data = await LibContent.get_items("author")
//console.log(data)
      this.setState({ user_id: uid ,authors:data })
    }    
  }
  async clickHandler(){
    try {
      var title = document.getElementById('title');
      var author_id = document.getElementById('author_id');
      var values = {
        "title": title.value,
        "author_id": author_id.value,
        //"user_id": this.state.user_id,
      }
//console.log(values)
      const result = await LibContent.add_item("article", values, this.state.user_id)
console.log(result)
      var flash = {success:"Conmplete, save", error:""}
      await LibFlash.set_flash( this.state.user_id , flash)
      this.props.history.push("/article");         
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }
  }
  render() {
// console.log( this.state.authors)
    return (
    <div className="container py-2">
      <h3>article - Create</h3>
      <hr />
      <label>Title:</label>
      <input type="text" name="title" id="title" className="form-control" />
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
      <button onClick={() => {this.clickHandler()}}>
      AddTodo
      </button>        
    </div>
    );
  }
}
export default TaskCreate;
