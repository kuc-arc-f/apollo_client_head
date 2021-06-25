import React  from 'react';

function Home() {
console.log("home.key=", process.env.REACT_APP_SITE_ID)
  return (
    <div className="container py-2">
      <h3>Home</h3>
    </div>
  );
}
export default Home;
