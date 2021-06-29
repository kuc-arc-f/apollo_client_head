import React  from 'react';
//import { Link } from 'react-router-dom';
import client from '../../apollo-client'
//import LibApiFind from '../../lib/LibApiFind';
import LibUser from '../../lib/LibUser';
import LibCookie from '../../lib/LibCookie';

class TaskCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  async componentDidMount(){
    const key = process.env.REACT_APP_COOKIE_USER_ID
    const user_id = LibCookie.get_cookie(key)
//console.log(user_id)
    if(user_id == null){
//      alert("Error, login required")
    }
  }
  async clickHandler(){
    try {
      const key_cookie = process.env.REACT_APP_COOKIE_USER_ID
//      const apikey = process.env.REACT_APP_API_KEY;
//      const content_name = "tasks"
      var mail = document.getElementById('mail');
      var password = document.getElementById('password');
//console.log(s)
      var data = await client.query({
        query: LibUser.get_query_login(mail.value, password.value ) ,fetchPolicy: "network-only"
      })
console.log(data.data.user )
      if(data.data.user.id == null){
        alert("Error, Login");
      }else{
        LibCookie.set_cookie(key_cookie, data.data.user.id)
        alert("Success, Login");
        this.props.history.push("/");
      }
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }
  }
  render() {
    return (
    <div className="container py-2">
      <h3>Login</h3>
      <hr />
      <label>mail:</label>
      <input type="text" name="mail" id="mail" />
      <hr />
      <label>password:</label>
      <input type="password" name="password" id="password" />
      <hr />
      <button onClick={() => {this.clickHandler()}}>Login
      </button>        
    </div>
    );
  }
}
export default TaskCreate;
