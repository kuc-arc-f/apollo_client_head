import React  from 'react';
//import { Link } from 'react-router-dom';
import LibFlash from '../../lib/LibFlash';
import LibAuth from '../../lib/LibAuth';
import LibContent from '../../lib/LibContent';
//import LibBook from '../../lib/LibBook';

class BookEdit extends React.Component {
  constructor(props) {
    super(props);
    this.id = (this.props.match.params.id)
    this.state = { 
      select_list: [], radio_items: [], check_items: [], 
      user_id:"", item: {} ,title:'',content:'',
      type_1: '', radio_1:'', check_1: []  
    };
  }
  handleChangeRadio(e){
//    const value = e.target.value;
//    const name = e.target.name;
    this.setState({radio_1: e.target.value})
  }  
  async componentDidMount(){
    const valid = LibAuth.valid_login(this.props)
    if(valid){
      const uid = LibAuth.get_uid()
      var row = await LibContent.get_item(this.id)
      const types = await LibContent.get_items("book_types")
      const book_category = await LibContent.get_items("book_category")
      const book_tags = await LibContent.get_items("book_tags")      
      var check_1 = row.values.check_1
      check_1 =await LibContent.csv_to_array(check_1)
//console.log(typeof d)   
      this.setState({
        user_id : uid, item: row ,
        title: row.values.title ,content: row.values.content,
        type_1: row.values.type_1, radio_1: row.values.radio_1,
        check_1: check_1,
        select_list: types,
        radio_items: book_category ,
        check_items: book_tags,        
      })
      var type_1 = document.getElementById('type_1');
      type_1.value= row.values.type_1
    }
// console.log(row)   
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
        type_1: (elemType.value) , 
        radio_1: (this.state.radio_1) ,
        check_1: csv         
      }
      const result =await LibContent.update_item(this.id, "books", values)
console.log(result)      
      var flash = {success:"Conmplete, save", error:""}
      await LibFlash.set_flash( this.state.user_id , flash)
      alert("Complete, update");
      this.props.history.push("/books");
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }    
  }
  async deleteHandler(){
    try {
      const result =await LibContent.delete_item(this.id)
console.log(result)
      var flash = {success:"Conmplete, delete", error:""}
      await LibFlash.set_flash( this.state.user_id , flash)
      alert("Complete, delete");
      this.props.history.push("/books");
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }
  }
  valid_check(items , value){
    var valid = false
    var rows = items.filter(item => (item === value));
    if( rows.length > 0){ valid=true }
    return valid
  }
  checkRow(){
    var check_items = this.state.check_items
    return check_items.map((item, index) => {
// console.log(this.state.check_1 )
      const valid = this.valid_check(this.state.check_1 , item.id)
      var name = "check_" + item.id
      return(
        <label key={index} className="">
          <input type="checkbox" name={name} id={name} defaultChecked={valid}/>
          <span className="mr-2 px-2">{item.values.name}</span>
        </label>           
      )
    })    
  }  
  render() {
//console.log(this.state)
    return (
      <div className="container py-2 mb-4">
      <h3>Book - Edit</h3>
      ID : {this.state.item.id} 
      <hr />   
      <label>Title:</label>
      <input type="text" name="title" id="title" className="form-control"
         defaultValue={this.state.title} />
      <hr />
      <label>Content:</label>
      <input type="text" name="content" id="content" className="form-control"
      defaultValue={this.state.content} />
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
              defaultChecked={this.state.radio_1 === item.id} onChange={this.handleChangeRadio.bind(this)} />
                {item.values.name}<br />         
            </span>
          )        
        ))}      
      </div>      
      <hr /> 
      <div className="form-group">
        <label>Checkbox:</label><br />
        {this.checkRow()}
      </div>
      <hr />                  
      <button onClick={() => {this.clickHandler()}}>Update
      </button>   
      <hr />
      <button onClick={() => {this.deleteHandler()}}>Delete
      </button>
    </div>
    );
  }
}
export default BookEdit;
