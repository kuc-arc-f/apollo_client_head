import React  from 'react';
//import { Link } from 'react-router-dom';
import LibContent from '../../lib/LibContent';

class BookShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {} ,title:'',content:'',
      type_1: '', radio_1:'', check_1: [],
      select_list: [], radio_items: [], check_items: [], 
    };
  }
  async componentDidMount(){
    const id = (this.props.match.params.id)
    var row = await LibContent.get_item(id)
    const types = await LibContent.get_items("book_types")
    const book_category = await LibContent.get_items("book_category")
    const book_tags = await LibContent.get_items("book_tags")      
    var type_item = types.filter(item => (item.id === row.values.type_1));  
    var category_item = book_category.filter(item => (item.id === row.values.radio_1));  
    var check_1 = row.values.check_1
    check_1 =await LibContent.csv_to_array(check_1) 
    var tag_arr =[]
    check_1.forEach(function(item){
      var tag_item = book_tags.filter(tag => (tag.id === item));
      tag_arr.push(tag_item[0])
    }); 
//console.log(row)
    this.setState({
      item: row ,title: row.values.title ,content: row.values.content,
      type_1: type_item[0].values.name, radio_1: category_item[0].values.name,
      check_1: tag_arr,
    })
  }
  render() {
//console.log( this.state.check_1)
    return (
    <div className="container py-2">
      <h3>Book - show</h3>
      <hr />
      <h1>{this.state.title}</h1>
      ID : {this.state.item.id}
      <hr />
      {this.state.content}
      <hr />
      type : {this.state.type_1 }
      <hr />
      radio_1 : {this.state.radio_1 }
      <hr />
      Check:<br />
      <ul>
      {this.state.check_1.map((item ,index) => {
        return (<li  key={index} >{item.values.name}</li>)
      })}       
      </ul>
    </div>
    );
  }
}
export default BookShow;
