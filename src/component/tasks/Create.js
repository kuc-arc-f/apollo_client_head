import React  from 'react';
//import { Link } from 'react-router-dom';
import client from '../../apollo-client'
//import LibApiFind from '../../lib/LibApiFind';
import LibTask from '../../lib/LibTask';

class TaskCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  async componentDidMount(){
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
        mutation: LibTask.get_gql_add(apikey, content_name , s)
      })
console.log(result)
      alert("Complete, save");
      this.props.history.push("/tasks");         
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }
  }
  render() {
    return (
    <div className="container py-2">
      <h3>Tasks - Create</h3>
      <hr />
      <label>Title:</label>
      <input type="text" name="title" id="title" />
      <hr />
      <label>Content:</label>
      <input type="text" name="content" id="content" />
      <hr />
      <button onClick={() => {this.clickHandler()}}>
      AddTodo
      </button>        
    </div>
    );
  }
}
export default TaskCreate;
