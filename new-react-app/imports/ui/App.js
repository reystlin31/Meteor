import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import styled from 'styled-components';
import Task from './Task.js';

class App extends Component {

    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task}/>
        ));
    }

    handleSubmit(event) {
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        Tasks.insert({text,createdAt: new Date()});
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }


    render() {

        const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  width: 100%;
`;

        return (
            <div className="container">
                <header>
                    <Title>Todo List</Title>
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                        <input type="text" ref="textInput" placeholder="Type to add new tasks"  />
                    </form>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

export default withTracker(() => {
    return {tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch()};
})(App);