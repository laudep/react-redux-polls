import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import {
  Row,
  Card,
  Image,
  Form,
  DropdownButton,
  Dropdown,
  Button
} from "react-bootstrap";
import { FaUser } from "react-icons/fa";

class LoginCard extends Component {
  state = {
    imageSource: "../images/avatar_placeholder.png",
    selectedUser: null,
    submitDisabled: true
  };

  handleUserSelect = id => {
    this.setState({
      imageSource: this.props.users[id].avatarURL,
      selectedUser: id,
      submitDisabled: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(this.state.selectedUser));
  };

  render() {
    return (
      <Row className="justify-content-md-center">
        <Card border="dark" className="login-card">
          <Card.Header as="h5" className="bg-dark text-white">
            <FaUser />
             Log In
          </Card.Header>
          <Card.Body>
            <Image src={this.state.imageSource} />
            <Form onSubmit={this.handleSubmit}>
              <DropdownButton variant="dark" title="Select a user">
                {Object.values(this.props.users).map(user => (
                  <Dropdown.Item
                    key={user.id}
                    eventKey={user.id}
                    onSelect={this.handleUserSelect}
                  >
                    {user.id}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <Card.Footer>
                <Button
                  variant="dark"
                  disabled={this.state.submitDisabled}
                  type="submit"
                >
                  Sign In
                </Button>
              </Card.Footer>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(LoginCard);
