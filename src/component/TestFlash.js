import React  from 'react';
import client from '../apollo-client'
//import LibTask from '../lib/LibTask';
import LibAuth from '../lib/LibAuth';
import LibFlash from '../lib/LibFlash';

function Page() {
  const uid = LibAuth.get_uid()
//console.log(uid)    
  const clickHandler = async function(){
    console.log("click")
    try {
      var flash = {success:"Conmplete, save", error:""}
      const res = LibFlash.set_flash(uid , flash)
    } catch (error) {
      alert("Error, click")
      console.error(error);
    }    
//console.log(data.data.content_count)    
  }
  const readHandler = async function(){
    console.log("click")
    try {
      const res = await LibFlash.get_flash(uid)
console.log(res)    
    } catch (error) {
      alert("Error, click")
      console.error(error);
    }    
  }
  return (
    <div className="container">
      <h3>TestFlash</h3>
      <hr />
      <button onClick={() => {clickHandler()}}>save
      </button>
      <hr />
      <button onClick={() => {readHandler()}}>read
      </button>
      <hr />      
    </div>
  );
}
export default Page;
