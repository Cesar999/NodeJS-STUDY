import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import AsyncPrivateRoute from './AsyncPrivateRoute';
import {Route, Switch, NavLink} from 'react-router-dom';

class App extends Component {
    constructor(){
        super();
        this.state = {
            username: ''
        }
    }

    setUsername = (username) => {
        this.setState({username});
    }

    render(){
        return(
            <div className="App">
                <h1>My App</h1>
                <nav className="navbar">
                    <NavLink activeClassName="active-link" to="/dashboard">Dashboard</NavLink>
                    <NavLink activeClassName="active-link" to="/login">Login</NavLink>
                    <NavLink activeClassName="active-link" to="/register">Register</NavLink>
                </nav>
                <Switch>
                    <AsyncPrivateRoute exact path="/dashboard" component={()=><Dashboard username={this.state.username}/>} setUsername={this.setUsername}/>
					<Route exact path="/login" component={Login}/>
					<Route exact path="/register" component={Register}/>
                    <Route path="/" component={Login}/>
				</Switch>
            </div>
        )
    }
}

export default App;
