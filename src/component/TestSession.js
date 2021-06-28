import React  from 'react';
import client from '../apollo-client'
import LibSession from '../lib/LibSession';
import GQL_session from '../graphql/session';

function Page() {
//console.log(document.cookie)
  const key = "key2"
  const clickHandler = async function(){
console.log("click")
    const data = await LibSession.get_session("60d67fb70160bf019dfe8169" , key)
console.log(data)    
  }
  const writeHandler = async function(){
    var data = document.getElementById('value');
//    var arr = {name:"n1"}
    const res = await LibSession.set_session("60d67fb70160bf019dfe8169" , key, data.value)
console.log(res ) 
  }
  const deleteHandler = async function(){
    const result = await client.mutate({
      mutation: GQL_session.get_query_delete("60d67fb70160bf019dfe8169" , key)
    })
console.log(result)    
  }
  return (
    <div className="container">
      <h3>TestSession</h3>
      <hr />
      <button onClick={() => {clickHandler()}}>Get
      </button>
      <hr />
      value: 
      <input type="text" name="value" id="value" /><br />
      <button onClick={() => {writeHandler()}}>Write
      </button>
      <hr />
      <button onClick={() => {deleteHandler()}}>Delete
      </button>
    </div>
  );
}
export default Page;
