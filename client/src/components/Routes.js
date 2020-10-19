import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";

// React - Router // 
import TodoList from './To-Do-List';
import Login from './Login';

class Routes extends Component{
  render () {
    return(
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/todolist" component={TodoList}/>
        </Switch>
    );
  }
}

export default Routes;