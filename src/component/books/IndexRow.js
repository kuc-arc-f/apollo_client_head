import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//
class IndexRow extends Component {
  render() {
//console.log(this.props.obj.values)
    return (
    <div>
      <Link to={`/book_show/${this.props.obj.id}`} >
          <h3>{this.props.obj.values.title}</h3>
      </Link>      
      <Link to={`/book_edit/${this.props.obj.id}`}
        className="btn btn-sm btn-outline-primary ">Edit
      </Link>                  
      <span className="ml-2">&nbsp;ID : {this.props.obj.id}</span>
      <hr />
    </div>
    )
  }
}

export default IndexRow;