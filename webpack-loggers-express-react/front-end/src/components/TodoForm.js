import React, { Component } from 'react';

class TodoForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            todoText: '',
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addNewTodo(this.state.todoText);
    }

    render(){
        return (
            <form className="TodoForm" onSubmit={this.handleSubmit}>
                <label htmlFor="todoText">New Todo:</label>
                <input type="text" name="todoText" id="todoText" onChange={this.handleChange}/>
                <button>Add Todo</button>
            </form>
        )
    }
}

export default TodoForm;