import React from "react";
import PrivateRoute from "./auth/privateRoute";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "popper.js";
import "jquery";
import "bootstrap";
import "./sass/main.scss";

import { Provider } from 'react-redux';
import { store } from './redux/store';

import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Home from "./pages/Home";


function App() {
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
