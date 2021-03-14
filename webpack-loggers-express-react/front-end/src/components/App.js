import React, { Component } from 'react';
import TodoForm from './TodoForm';
import Card from './Todo';
import { getTodos, postTodo, deleteTodo, patchTodo } from '../api/api';

class App extends Component {
    constructor(){
        super();
        this.state = {
            todos: [{
                text: '',
                ID: '',
                date: '',
                done: false
            }]
        }
    }

    componentDidMount(){
        this.getAllTodos();
    }

    addNewTodo = async (text) => {
        const data = await postTodo({text});
        console.log(data)
        if(data.post){
            this.getAllTodos();
        }
    }

    removeTodo = async (id) => {
        const data = await deleteTodo(id);
        console.log(data)
        if(data.deleted){
            this.getAllTodos();
        }
    }

    getAllTodos = async () => {
        const data = await getTodos();
        const todos = data.todos;
        console.log(todos)
        this.setState({todos});
    }

    toggleDone = async (id) => {
        const data = await patchTodo(id);
        console.log(data)
        if(data.patch){
            this.getAllTodos();
        }
    }

    render(){
        return (
            <div className="App">
                <TodoForm addNewTodo={this.addNewTodo}/>
                <button className="button-getTodos" onClick={this.getAllTodos}>Get Todos</button>
                <div className="cardsContainer">
                    {this.state.todos.map((todo)=><Card {...todo} removeTodo={this.removeTodo} toggleDone={this.toggleDone}/>)}
                </div>
            </div>
        )
    }
}

export default App;