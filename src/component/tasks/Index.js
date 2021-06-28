import React  from 'react';
import { Link } from 'react-router-dom';
import IndexRow from './IndexRow';
import client from '../../apollo-client'
import LibApiFind from '../../lib/LibApiFind';
import LibTask from '../../lib/LibTask';
import LibAuth from '../../lib/LibAuth';
import FlashBox from '../element/FlashBox';

class TasksIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] ,flash:{} };
  }
  async componentDidMount(){
    const valid = LibAuth.valid_login(this.props)
    if(valid){
      const uid = LibAuth.get_uid()
//console.log("uid=", uid)
      const site_id= process.env.REACT_APP_SITE_ID;
      const content_name = "tasks"    
      const data = await client.query({
        query: LibTask.get_query_tasks_uid(site_id , content_name, uid) ,
        fetchPolicy: "network-only"
      }) 
      var items = LibApiFind.convert_items(data.data.contents_uid)
      this.setState({items: items })
  console.log(items)   
    }
  }
  render() {
    return (
    <div className="container py-2">
      <FlashBox />
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