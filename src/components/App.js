import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
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
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === true ? null : (
              <div>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/new" component={NewQuestion} />
                <Route exact path="/leaderboard" component={Leaderboard} />
                <Route
                  exact
                  path="/questions/:question_id"
                  component={NewQuestion}
                />
              </div>
            )}
          </div>
        </Fragment>
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

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
