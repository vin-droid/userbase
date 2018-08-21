import React  from 'react';
import Home from './components/Home';
import UserNew from './components/users/UserNew';
import UserList from './components/users/UserList';
import UserShow from './components/users/UserShow';
import UserEdit from './components/users/UserEdit';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Root from './components/layout/Root';


export const routes = () => (
  <BrowserRouter>
    <Root>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/user' component={UserNew}/>
        <Route exact path='/users' component={UserList}/>
        <Route exact path='/user/:userId' component={UserShow}/>
        <Route exact path='/user/:userId/edit' component={UserEdit}/>
      </Switch>
    </Root>
  </BrowserRouter>
)
