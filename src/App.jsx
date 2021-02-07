import React from "react";
import PrivateRoute from "./components/auth/PrivateRoute";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';

import "popper.js";
import "jquery";
import "bootstrap";
import "./assets/sass/main.scss";

// layout
import Header from './components/layout/Header';

// Views
import Signup from './views/auth/Signup';
import Signin from './views/auth/Signin';
import Home from "./views/tasks/ManageTasks";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
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
