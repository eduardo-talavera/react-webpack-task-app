import React from "react";
import PrivateRoute from "./components/auth/PrivateRoute";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';

import "popper.js";
import "jquery";
import "bootstrap";
import "./assets/sass/main.scss";


// Views
import Signup from './views/auth/Signup';
import Signin from './views/auth/Signin';
import Home from "./views/tasks/ManageTasks";


function App({history}) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container-fluid">
          <Switch>
            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <PrivateRoute path="/" exact component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
