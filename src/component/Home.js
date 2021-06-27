import React  from 'react';
//import LibCookie from '../lib/LibCookie';
import LibAuth from '../lib/LibAuth';

function Home(props) {
//console.log("home.URL=", process.env.REACT_APP_GQL_URL)
  const logoutHandler = async function(){
    LibAuth.user_logout(props)
  } 
  return (
    <div className="container py-2">
      <button onClick={() => {logoutHandler()}}>Logout
      </button>
      <hr />
      <h3>Home</h3>
    </div>
  );
}
export default Home;
