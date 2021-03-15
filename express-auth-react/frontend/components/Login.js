import React, { Component } from 'react';
import Input from './Input';
import { loginPost } from '../api/api';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginPost(this.state.username, this.state.password);
        console.log(response)
    }
    
    render(){
        const username = {
            label: 'Username: ', 
            type: 'text', 
            name: 'username', 
            htmlID: 'username-input',
            handleChange: this.handleChange,
            value: this.state.username
        };

        const password = {
            label: 'Password: ', 
            type: 'password', 
            name: 'password', 
            htmlID: 'password-input',
            handleChange: this.handleChange,
            value: this.state.password
        };
        return (
            <form className="Login" onSubmit={this.handleSubmit}>
                <Input {...username}/>
                <Input {...password}/>
                <button>Login</button>
            </form>
        )
    }
}

export default Login;