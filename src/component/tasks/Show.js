import React  from 'react';
//import { Link } from 'react-router-dom';
import client from '../../apollo-client'
import LibApiFind from '../../lib/LibApiFind';
import LibTask from '../../lib/LibTask';

class TasksShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: {} };
  }
  async componentDidMount(){
    const id = (this.props.match.params.id)
    const data = await client.query({
      query: LibTask.get_query_task(id) ,fetchPolicy: "network-only"
    }) 
    var items = LibApiFind.convert_items([data.data.content])
    this.setState({item: items[0] })
  }
  render() {
// console.log(this.state.item)
    return (
    <div className="container py-2">
      <h3>Tasks - show</h3>
      <hr />
      <h1>{this.state.item.title}</h1>
      ID : {this.state.item.id}
      <hr />
      {this.state.item.content}
    </div>
    );
  }
}
export default TasksShow;
