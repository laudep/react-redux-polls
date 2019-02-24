import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { FaPoll } from "react-icons/fa";
class Navigation extends Component {
  logout = e => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(null));
  };

  getProfileNav = () => (
    <NavDropdown
      title={
        <span className="navbar-user-info">
          {this.props.username}
          <Image roundedCircle className="avatar" src={this.props.avatar} />
        </span>
      }
    >
      <NavDropdown.Item 
      // href="/" 
      onClick={this.logout}>
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  );

  render() {
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>
            <FaPoll />
            Would You Rather
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        {this.props.loggedIn && (
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <LinkContainer to="/add">
                <Nav.Link>New poll</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Leaderboard">
                <Nav.Link>Leaderboard</Nav.Link>
              </LinkContainer>
              {this.getProfileNav()}
            </Nav>
          </Navbar.Collapse>
        )}
      </Navbar>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    loggedIn: authedUser !== null,
    username: users[authedUser] ? users[authedUser].name : null,
    avatar: users[authedUser] ? users[authedUser].avatarURL : null
  };
}

export default connect(mapStateToProps)(Navigation);
