import React, { Component } from "react";

import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Comic from "./components/Comic";
import Navbar from "./components/Navbar";
import ComicsDashboard from "./components/ComicsDashboard";
import NoMatch from "./components/NoMatch";

import {Container} from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/comics" component={ComicsDashboard} />
            <Route path="/comics/:comicId" component={Comic} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
