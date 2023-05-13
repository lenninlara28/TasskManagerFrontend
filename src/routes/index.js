import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";

import Login from "../containers/Login";
import Signup from "../containers/Signup";

const App = () => {
  const location = useLocation();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="sign-in" />
        </Route>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/sign-in" component={Login} />
          <Route exact path="/sign-up" component={Signup} />
        </Switch>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
