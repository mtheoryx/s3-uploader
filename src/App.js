// src/App.js

import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAuth0 } from "./react-auth0-wrapper";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import ExternalAPI from "./components/ExternalApi";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  const { loading } = useAuth0();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/external-api" component={ExternalAPI} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
