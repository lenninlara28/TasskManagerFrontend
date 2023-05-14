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
import Dashboard from "../containers/Dashboard";
import Tasks from "../containers/tasks/Tasks";
import TasksCreate from "../containers/tasks/CreateTask";

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
          <Dashboard>
            <Route exact path="/dashboard" component={Tasks} />
            <Route exact path="/add-task" component={TasksCreate} />
          </Dashboard>
        </Switch>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
