import React  from 'react';
import { Link } from 'react-router-dom';
import IndexRow from './IndexRow';
//import client from '../../apollo-client'
import LibAuth from '../../lib/LibAuth';
import LibContent from '../../lib/LibContent';
import FlashBox from '../element/FlashBox';

class BookIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] ,flash:{} };
  }
  async componentDidMount(){
    const valid = LibAuth.valid_login(this.props)
    if(valid){
      const uid = LibAuth.get_uid()
      const items = await LibContent.get_items_uid("books", uid)
//console.log(d)
      this.setState({items: items })
  console.log(items)   
    }
  }
  render() {
    return (
    <div className="container py-2">
      <FlashBox />
      <h3>books - index</h3>
      <hr />   
      <Link to={`/book_create`} >
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
export default BookIndex;