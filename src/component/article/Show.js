import React  from 'react';
//import { Link } from 'react-router-dom';
import LibContent from '../../lib/LibContent';

class TasksShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {} ,title:'',content:'' , author_name :''
    };
  }
  async componentDidMount(){
    const id = (this.props.match.params.id)
    var row = await LibContent.get_item(id)
//console.log(row)
    //author
    var dataAuthor = await LibContent.get_items("author")
    var authorOne = dataAuthor.filter(author => (author.id === row.values.author_id));
//console.log(authorOne)
    row.author = authorOne[0]
    this.setState({
      item: row ,title: row.values.title , author_name : row.author.values.name
    })
  }
  render() {
//console.log( this.state.author_name )
//console.log( this.state.item.author.values.name )
    return (
    <div className="container py-2">
      <h3>Article - show</h3>
      <hr />
      <h1>{this.state.title}</h1>
      ID : {this.state.item.id}
      <hr />
      Author : {this.state.author_name}
      <hr />
    </div>
    );
  }
}
export default TasksShow;
