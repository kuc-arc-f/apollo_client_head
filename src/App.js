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

          </ApolloProvider>
        </div>
      </Router>
    </div>
    );
  }
}
export default App;
