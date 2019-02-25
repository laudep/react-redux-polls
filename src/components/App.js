import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import QuestionWrapper from "./QuestionWrapper";
import LoginCard from "./LoginCard";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoute";

class App extends Component {
  componentDidMount() {
    this.props.initData();
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar className="loading" />
          <Navigation />
          {this.props.loading === true ? null : (
            <div className="container">
              <Switch>
                <PrivateRoute path="/" exact component={Dashboard} />
                <PrivateRoute
                  path="/leaderboard"
                  exact
                  component={Leaderboard}
                />
                <PrivateRoute path="/add" exact component={NewQuestion} />
                <PrivateRoute
                  path="/questions/:question_id"
                  component={QuestionWrapper}
                />
                <Route path="/login" exact component={LoginCard} />
                <Route component={NotFound} />
              </Switch>
            </div>
          )}
        </Fragment>
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initData: () => {
      return dispatch(handleInitialData());
    }
  };
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    loading: !questions,
    currentUser: users[authedUser],
    loggedIn: authedUser !== null
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
