import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { logoutGet, getAllUsers } from '../api/api';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

    onLogout = async () => {
        const response = await logoutGet();
        console.log(response);
        this.props.history.push('/');
    }

    setAllUsers = async () => {
        const response = await getAllUsers();
        this.setState({users: response.users});
    }

    render(){
        return(
            <div className="Dashboard">
                <h1>Welcome {this.props.username}</h1>
                <h1>This is the Dashboard</h1>
                <button onClick={this.onLogout}>Logout</button>
                <button onClick={this.setAllUsers}>Get All Users</button>
                {this.state.users.map(user=><div key={user.id}>{user.username}</div>)}
            </div>
        )
    }
}

export default withRouter(Dashboard);
