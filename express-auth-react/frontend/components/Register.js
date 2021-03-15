import React, { Component } from 'react';
import Input from './Input';
import { registerPost } from '../api/api';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirm: ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const response = await registerPost(this.state.username, this.state.password, this.state.passwordConfirm);
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
        const passwordConfirm = {
            label: 'PasswordConfirm: ', 
            type: 'password', 
            name: 'passwordConfirm', 
            htmlID: 'passwordConfirm-input',
            handleChange: this.handleChange,
            value: this.state.passwordConfirm
        };
        return (
            <form className="Register" onSubmit={this.handleSubmit}>
                <Input {...username}/>
                <Input {...password}/>
                <Input {...passwordConfirm}/>
                <button>Register</button>
            </form>
        )
    }
}

export default Register;