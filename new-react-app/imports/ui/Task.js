import React, { Component } from 'react';

import { Tasks } from '../api/tasks.js';
import styled from "styled-components";

export default class Task extends Component {
    toggleChecked() {
        Tasks.update(this.props.task._id, {
            $set: { checked: !this.props.task.checked },
        });
    }

    deleteThisTask() {
        Tasks.remove(this.props.task._id);
    }


    render() {
        const taskClassName = this.props.task.checked ? 'checked' : '';

        const Li = styled.li`
  color: red;
  padding: 12px 15px;
  background: ${taskClassName ? "gray" : "white"};
`;

        return (
            <Li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button>
                <input type="checkbox" readOnly checked={!!this.props.task.checked}
                       onClick={this.toggleChecked.bind(this)}/>
                <span className="text">{this.props.task.text}</span>
            </Li>
        );
    }
}