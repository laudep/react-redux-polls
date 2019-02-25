import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
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
    this.props.dispatch(handleInitialData());
  }

  getRoutes = loggedIn => (
    <Switch>
      <Route exact path="/" component={loggedIn ? Dashboard : LoginCard} />
      {loggedIn && (
        <Fragment>
          <Route exact path="/add" component={NewQuestion} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route
            exact
            path="/questions/:question_id"
            component={QuestionWrapper}
          />
        </Fragment>
      )}
      {loggedIn && <Route component={NotFound} />};
      <Redirect from="*" to="/" />
    </Switch>
  );

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar className="loading" />
          <Navigation />
          {this.props.loading === true ? null : (
            <Switch>
              <PrivateRoute path="/" exact component={Dashboard} />
              <PrivateRoute path="/leaderboard" exact component={Leaderboard} />
              <PrivateRoute path="/add" exact component={NewQuestion} />
              <PrivateRoute
                path="/questions/:question_id"
                component={QuestionWrapper}
              />
              <Route path="/login" exact component={LoginCard} />
              <Route component={NotFound} />
            </Switch>
          )}
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    loading: !questions,
    currentUser: users[authedUser],
    loggedIn: authedUser !== null
  };
}

export default connect(mapStateToProps)(App);
