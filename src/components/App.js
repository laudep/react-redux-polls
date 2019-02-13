import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          {/* <Fragment> */}
          <Route exact path="/" render={() => <div>Home</div>} />
          <Route exact path="/new" component={NewQuestion} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route exact path="/questions/:question_id" component={NewQuestion} />
          {/* </Fragment> */}
        </div>
      </Router>
    );
  }
}

export default App;
