import React  from 'react';
import { useState ,useEffect  } from 'react';

function Page() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    console.log('副作用関数が実行されました！' + new Date() )
  });
  return (
    <div className="container">
      <h3>Test2</h3>
      <hr />
      <p>You clicked {count} times</p>
      <button onClick={() => {setCount(count + 1)}}>
        Click me
      </button>
      <hr />
    </div>
  );
}
export default Page;
