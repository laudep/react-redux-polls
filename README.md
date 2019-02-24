# Would You Rather

This project is a simple version of the game *"Would You Rather?"*.  
Built using React and Redux, it was developed as a project for the [Udacity React Nanodegree Program](https://www.udacity.com/course/react-nanodegree--nd019).

## Table of Contents

- [Demo](#demo)
- [Installation](#running-the-application)
- [Database and API](#database)
  - [Users](#users)
  - [Questions](#questions)
  - [Voting Options](#voting-options)
  - [Database Access](#database-access)
    - [`_getUsers()`](#get-users)
    - [`_getQuestions()`](#get-questions)
    - [`_saveQuestion(question)`](#save-question)
    - [`_saveQuestionAnswer(object)`](#save-question-answer)
- [Create React App](#create-react-app)

## Demo

[![Build Status](https://travis-ci.org/laudep/react-redux-polls.svg?branch=master)](https://travis-ci.org/laudep/react-redux-polls)

An online demo can be found here: [react-redux-polls.surge.sh](https://react-redux-polls.surge.sh/)

## Running the application

Make sure to have [Node.js](https://nodejs.org/en/) installed.  
Clone the project, install the dependencies and run the development server:

```
git clone https://github.com/laudep/react-redux-polls.git
npm install
npm start
```

A new browser window will open automatically.  
By default, the app runs in [http://localhost:3000/](http://localhost:3000/).


## Database

This project utilizes a fake database with access methods provided by Udacity for practicality reasons. An API wrapper was written for convenient handling.

There are two types of objects stored in the 'database':

* [Users](#users)
* [Questions](#questions)

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

### Database Access

The code talks to the database via 4 methods:

* [`_getUsers()`](#get-users)
* [`_getQuestions()`](#get-questions)
* [`_saveQuestion(question)`](#save-question)
* [`_saveQuestionAnswer(object)`](#save-question-answer)


<a name="get-users"/>

#### 1. `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

<a name="get-questions"/>

#### 2. `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

<a name="save-question"/>

#### 3. `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

<a name="save-question-answer"/>

#### 4. `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more
information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).