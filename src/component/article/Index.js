import React  from 'react';
import { Link } from 'react-router-dom';
import IndexRow from './IndexRow';
import LibAuth from '../../lib/LibAuth';
import LibContent from '../../lib/LibContent';
import FlashBox from '../element/FlashBox';

class ArticleIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] ,flash:{} ,user_id: "" };
  }
  async componentDidMount(){
    const valid = LibAuth.valid_login(this.props)
    if(valid){
      const uid = LibAuth.get_uid()
      const items = await LibContent.get_items_uid("article", uid)
      this.setState({items: items, user_id: uid })
//console.log(items)   
    }
  }
  render() {
    return (
    <div className="container py-2">
      <FlashBox />
      <h3>article - index</h3>
      <hr />   
      <Link to={`/article_create`} >
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
export default ArticleIndex;