import React  from 'react';
//import { Link } from 'react-router-dom';
import client from '../../apollo-client'
import LibApiFind from '../../lib/LibApiFind';
import LibTask from '../../lib/LibTask';

class TasksShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {} ,title:'',content:'' 
    };
  }
  async componentDidMount(){
    const id = (this.props.match.params.id)
    var data = await client.query({
      query: LibTask.get_query_task(id) ,fetchPolicy: "network-only"
    })
    var item = data.data.content
    var row = LibApiFind.convertItemOne(item)
//console.log(row)
    this.setState({
      item: row ,title: row.values.title ,content: row.values.content
    })
  }
  render() {
//console.log( typeof this.state.item.values)
    return (
    <div className="container py-2">
      <h3>Tasks - show</h3>
      <hr />
      <h1>{this.state.title}</h1>
      ID : {this.state.item.id}
      <hr />
      {this.state.content}
    </div>
    );
  }
}
export default TasksShow;
