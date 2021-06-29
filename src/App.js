import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import {
  ApolloProvider,
} from "@apollo/client";
import client from './apollo-client'

import Home from './component/Home';
import Test from './component/Test';
import Navbar from './component/Navbar';
/* tasks */
import tasks from './component/tasks/Index';
import taskCreate from './component/tasks/Create';
import taskShow from './component/tasks/Show';
import taskEdit from './component/tasks/Edit';
/* users */
import Login from './component/users/Login';
/* article */
import article from './component/article/Index';
import articleCreate from './component/article/Create';
import articleShow from './component/article/Show';
import articleEdit from './component/article/Edit';
/* books */
import books from './component/books/Index';
import bookCreate from './component/books/Create';
import bookShow from './component/books/Show';
import bookEdit from './component/books/Edit';

class App extends Component {
  render() {
    return (
    <div className="App">
      <Router>
        <div>
          <ApolloProvider client={client}>
          <Navbar />
            <Route exact path='/' component={Home} />
            <Route path='/test' component={Test} />
            {/* tasks */}
            <Route path='/tasks' component={tasks} />
            <Route path='/task_create' component={taskCreate} />
            <Route path='/task_show/:id' component={taskShow}/>
            <Route path='/task_edit/:id' component={taskEdit}/>
            {/* users */}
            <Route path='/login' component={Login} />
            {/* article */}
            <Route path='/article' component={article} />
            <Route path='/article_create' component={articleCreate} />
            <Route path='/article_show/:id' component={articleShow}/>
            <Route path='/article_edit/:id' component={articleEdit}/>
            {/* books */}
            <Route path='/books' component={books} />
            <Route path='/book_create' component={bookCreate} /> 
            <Route path='/book_show/:id' component={bookShow}/>           
            <Route path='/book_edit/:id' component={bookEdit}/>            
          </ApolloProvider>
        </div>
      </Router>
    </div>
    );
  }
}
export default App;
