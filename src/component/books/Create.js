import React  from 'react';
//import { Link } from 'react-router-dom';
import LibFlash from '../../lib/LibFlash';
import LibAuth from '../../lib/LibAuth';
import LibContent from '../../lib/LibContent';
//import LibBook from '../../lib/LibBook';

class BookCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "" ,select_list: [], radio_items: [], check_items: [], 
    };
  }
  async componentDidMount(){
    const valid = LibAuth.valid_login(this.props)
    if(valid){
      const uid = LibAuth.get_uid()
      const types = await LibContent.get_items("book_types")
      const book_category = await LibContent.get_items("book_category")
      const book_tags = await LibContent.get_items("book_tags")
      var category = book_category.filter(item => (item.values.name === 'food'));
//console.log(category[0])
      this.setState({user_id: uid,
        select_list: types,
        radio_items: book_category , radio_1: category[0].id ,
        check_items: book_tags,
      })
    }    
  }
  async clickHandler(){
    try {
      var title = document.getElementById('title');
      var content = document.getElementById('content');
      var elemType = document.getElementById('type_1');
      //var elemDate = document.getElementById('date_1');
      var arrChecked = [] 
      var check_items = this.state.check_items  
      check_items.forEach(function(item){
        var checkedName = "check_" + item.id
        var elemChecked = document.getElementById(checkedName);
        if(elemChecked.checked){
          arrChecked.push(item.id)
        }
      });      
  //console.log(arrChecked)
      var csv = await LibContent.array_to_csv(arrChecked)    
      var values = {
        "title": title.value,
        "content": content.value,
        type_1: elemType.value, 
        radio_1: this.state.radio_1 ,
        check_1: csv 
      }
//console.log(values)
      const result = await LibContent.add_item("books", values, this.state.user_id)
console.log(result)
      var flash = {success:"Conmplete, save", error:""}
      await LibFlash.set_flash( this.state.user_id , flash)
      //alert("Complete, save");
      this.props.history.push("/books");         
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }
  }
  handleChangeRadio(e){
//    const value = e.target.value;
//    const name = e.target.name;
    this.setState({radio_1: e.target.value})
  }
  checkRow(){
    var check_items = this.state.check_items
    return check_items.map((item, index) => {
// console.log(item )
      var name = "check_" + item.id
      return(
        <label key={index} className="">
          <input type="checkbox" name={name} id={name}/>
          <span className="px-2">{item.values.name}</span>
        </label>           
      )
    })    
  }     
  render() {
    return (
    <div className="container py-2 mb-4">
      <h3>Book - Create</h3>
      <hr />
      <label>Title:</label>
      <input type="text" name="title" id="title" className="form-control" />
      <hr />
      <label>Content:</label>
      <input type="text" name="content" id="content" className="form-control" />
      <hr />
      <div className="col-md-6 form-group">
        <label>BookType:</label>
        <select className="form-select" name="type_1" id="type_1">
        {this.state.select_list.map((item ,index) => (
          <option key={index} value={item.id}>{item.values.name}</option>
        ))
        }
        </select>
      </div> 
      <hr />
      <div className="col-md-6 form-group">
        <label>RadioType:</label><br />
        {this.state.radio_items.map((item ,index) => (
          (
            <span key={index}>
              <input type="radio" name="radio_1" id="radio_1" value={item.id}
              defaultChecked={this.state.radio_1 === item.id}
              onChange={this.handleChangeRadio.bind(this)} />
                {item.values.name}<br />         
            </span>
          )        
        ))}      
      </div> 
      <hr />
      <div className="col-md-6 form-group">
        <label>Checkbox:</label><br />
        {this.checkRow()}
      </div>
      <hr />
      <div className="col-md-6 form-group">
        <label>Date:</label><br />
        <input type="date" name="date_1" id="date_1" className="form-control" 
         />        
      </div> 
      <hr />       
      <button onClick={() => {this.clickHandler()}}>
      AddTodo
      </button>        
    </div>
    );
  }
}
export default BookCreate;
