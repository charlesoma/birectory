import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class Header extends Component {
    logout = () => {
        localStorage.removeItem('token');
        this.props.history.push({
            pathname: '/',
        })
    }

    render() {
        return (
            <div id='header'>
                {
                    localStorage.getItem('token') === 'token' &&
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <div>
                            <p>Dashboard</p>
                        </div>
                    </Link>
                }
                {
                    localStorage.getItem('token') === 'token' ?
                        <div onClick={this.logout}>
                            <p>Logout</p>
                        </div>
                        :
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <div>
                                <p>Login</p>
                            </div>
                        </Link>
                }
            </div>
        )
    }
}

export default withRouter(Header);
