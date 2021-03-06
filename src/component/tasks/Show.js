import React  from 'react';
//import { Link } from 'react-router-dom';
import LibContent from '../../lib/LibContent';

class TasksShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {} ,title:'',content:'' 
    };
  }
  async componentDidMount(){
    const id = (this.props.match.params.id)
    var row = await LibContent.get_item(id)
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
