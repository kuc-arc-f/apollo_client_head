import LibCookie from '../lib/LibCookie'

export default {
  valid_login: function(props){
    try{
      var ret = true
      const key = process.env.REACT_APP_COOKIE_USER_ID
      const user_id = LibCookie.get_cookie(key)
//console.log(user_id)
      if(user_id == null){
        props.history.push("/login");
        ret = false
      }      
      return ret
    } catch (e) {
      console.log(e);
      throw new Error('error, set_cookie');
    }
  },
  user_logout: function(props){
    try{
      const key = process.env.REACT_APP_COOKIE_USER_ID
      LibCookie.delete_cookie(key)
      props.history.push("/login");
//console.log(user_id)
    } catch (e) {
      console.log(e);
      throw new Error('error, set_cookie');
    }
  },

}