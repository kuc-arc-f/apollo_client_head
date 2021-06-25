import React  from 'react';
import { Link } from 'react-router-dom';
import IndexRow from './IndexRow';
import client from '../../apollo-client'
import LibApiFind from '../../lib/LibApiFind';
import LibTask from '../../lib/LibTask';

class TasksIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }
  async componentDidMount(){
    const site_id= process.env.REACT_APP_SITE_ID;
    const content_name = "tasks"    
    const data = await client.query({
      query: LibTask.get_query_tasks(site_id , content_name) ,fetchPolicy: "network-only"
    }) 
    var items = LibApiFind.convert_items(data.data.contents)
    this.setState({items: items })
console.log(items)   
  }
  render() {
    return (
    <div className="container py-2">
      <h3>Tasks - index</h3>
      <hr />   
      <Link to={`/task_create`} >
          <button>Create</button>
      </Link>      
      <hr />         
      {this.state.items.map((item ,index) => (
        <IndexRow obj={item} key={index} />
      ))}        
    </div>
    );
  }
}
export default TasksIndex;