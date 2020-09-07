import React, { useState, useEffect } from "react";
import Dashboard from "./dashboard";
import ListPage from "./ListPage";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";

export default function App() {
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const history = useHistory();
  return (
    <Router>
      <div className="container-fluid">
        <Switch>
          <Route path="/" exact render={({ location }) => <Dashboard />} />
          <Route path="/list">
            <ListPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
