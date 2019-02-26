import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Card,
  Form,
  FormGroup,
  FormControl,
  Button,
  Alert
} from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { handleQuestionAddition } from "../actions/questions";

const FormErrors = ({ formErrors }) => (
  <div className="formErrors">
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <Alert key={i} variant="danger">
            {formErrors[fieldName]}
          </Alert>
        );
      } else {
        return "";
      }
    })}
  </div>
);

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    validElements: { optionOne: false, optionTwo: false, form: false },
    formErrors: { form: "", optionOne: "", optionTwo: "" },
    toDashboard: false
  };

  handleChange = e => {
    const { value, id } = e.target;
    this.setState({ [id]: value }, () => {
      this.validateField(id, value);
    });
  };

  validateField(fieldName, value) {
    const fieldValid = value.length >= 3;
    const fieldError = fieldValid
      ? ""
      : `The ${
          fieldName === "optionOne" ? "first" : "second"
        } option is too short (min 3 characters).`;

    this.setState(
      prevState => ({
        validElements: {
          ...prevState.validElements,
          [fieldName]: fieldValid
        },
        formErrors: {
          ...prevState.formErrors,
          [fieldName]: fieldError
        }
      }),
      this.validateForm
    );
  }

  validateForm() {
    let formError =
      this.state.optionOne !== this.state.optionTwo
        ? ""
        : "Both options must be unique.";

    let formValid =
      !formError &&
      this.state.validElements.optionOne &&
      this.state.validElements.optionTwo;

    this.setState(prevState => ({
      validElements: {
        ...prevState.validElements,
        form: formValid
      },
      formErrors: {
        ...prevState.formErrors,
        form: formError
      }
    }));
  }

  handleSubmit = e => {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state;

    this.props.handleNewQuestion(optionOne, optionTwo);

    this.setState(() => ({
      optionOne: "",
      optionTwo: "",
      toDashboard: true
    }));
  };

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  renderForm = () => (
    <Card>
      <Card.Header>
        <FaPencilAlt />
          Create New Question
      </Card.Header>
      <Card.Body>
        <Card.Title>Would you rather...</Card.Title>
        <FormErrors formErrors={this.state.formErrors} />
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
              className={this.errorClass(this.state.formErrors.optionOne)}
              id="optionOne"
              type="text"
              placeholder="Option one text"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Card.Title>or...</Card.Title>
          <FormGroup>
            <FormControl
              className={this.errorClass(this.state.formErrors.optionTwo)}
              id="optionTwo"
              type="text"
              placeholder="Option two text"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            disabled={!this.state.validElements.form}
            type="submit"
            bs="info"
          >
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

function mapDispatchToProps(dispatch) {
  return {
    handleNewQuestion(optionOne, optionTwo) {
      return dispatch(handleQuestionAddition(optionOne, optionTwo));
    }
  };
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewQuestion);
