import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Card, Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { handleQuestionAddition } from "../actions/questions";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toDashboard: false
  };

  handleChange = e => {
    const { value, id } = e.target;
    this.setState(() => ({ [id]: value }));
  };

  handleSubmit = e => {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;

    dispatch(handleQuestionAddition(optionOne, optionTwo));

    this.setState(() => ({
      optionOne: "",
      optionTwo: "",
      toDashboard: true
    }));
  };

  renderForm = () => (
    <Card bsStyle="primary">
      <Card.Header>
        <FaPencilAlt />
          Create New Question
      </Card.Header>
      <Card.Body>
        <Card.Title>Would you rather...</Card.Title>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
              id="optionOne"
              type="text"
              placeholder="Option one text"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Card.Title>or...</Card.Title>
          <FormGroup>
            <FormControl
              id="optionTwo"
              type="text"
              placeholder="Option two text"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button disabled={this.state.disabled} type="submit" bsStyle="info">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );

  render() {
    return this.state.toDashboard ? <Redirect to="/" /> : this.renderForm();
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}
export default connect(mapStateToProps)(NewQuestion);
