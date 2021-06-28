import React  from 'react';
import client from '../apollo-client'
import LibTask from '../lib/LibTask';
import LibSession from '../lib/LibSession';
import LibCookie from '../lib/LibCookie';

function Page() {
console.log(document.cookie)
//console.log("c=", process.env.REACT_APP_COOKIE_USER_ID)

  const key = process.env.REACT_APP_COOKIE_USER_ID
  const clickHandler = async function(){
console.log("click")
 //   LibCookie.set_cookie(key, "123")
    const d = LibCookie.get_cookie(key)
console.log("key=", d)
  }
  const deleteHandler = async function(){
    LibCookie.delete_cookie(key)
  }  
  return (
    <div className="container">
      <h3>TestCookie</h3>
      <hr />
      <button onClick={() => {clickHandler()}}>Get
      </button>
      <hr />
      <button onClick={() => {deleteHandler()}}>Delete
      </button>

    </div>
  );
}
export default Page;
