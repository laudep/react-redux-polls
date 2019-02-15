import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Nav from "./Nav";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

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

export function isEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function mapStateToProps({ questions, users }) {
  return {
    loading: isEmpty(questions) || isEmpty(users)
  };
}

export default connect(mapStateToProps)(App);
