import React  from 'react';
// import { useState ,useEffect  } from 'react';
import client from '../apollo-client'
import LibTask from '../lib/LibTask';

function Page() {
  //const [count, setCount] = useState(0);

  const clickHandler = async function(){
    console.log("click")
    const site_id= process.env.REACT_APP_SITE_ID;
    const content_name = "tasks"    
    const data = await client.query({
      query: LibTask.get_query_count(site_id , content_name) ,fetchPolicy: "network-only"
    }) 
console.log(data.data.content_count)    
  }
  return (
    <div className="container">
      <h3>Test2</h3>
      <hr />
      <button onClick={() => {clickHandler()}}>
        Click me
      </button>
      <hr />
    </div>
  );
}
export default Page;
