import React, { Component } from 'react';
import { connect } from "react-redux";
import Header from './Header';
import { login } from '../actions/actions';

class Login extends Component {
    state = {
        email: '',
        password: '',
        error: ''
    }

    handleChange = (name, e) => {
        this.setState({
            [name]: e.target.value,
            error: ''
        });
    }

    handleLogin = async (e) => {
        e.preventDefault()
        const { email, password } = this.state;
        if (email === '' || password === '') {
            return
        }

        await this.props.login({ email, password })
        if (localStorage.getItem('token') === 'token') {
            this.props.history.push({
                pathname: '/',
            })
        }
        if (this.props.error) {
            this.setState({
                error: this.props.error
            })
        }
    }

    render() {
        return (
            <div id='login'>
                <Header />
                <div className='content'>
                    <form onSubmit={this.handleLogin}>
                        <p>{this.state.error}</p>
                        <input className='input' placeholder='Enter email' type='text' onChange={text => this.handleChange("email", text)} />
                        <input className='input' placeholder='Enter password' type='password' onChange={text => this.handleChange("password", text)} />
                        <input className='input' type={'submit'} value="Login" />
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    login: (data) => dispatch(login(data)),
});

const mapStateToProps = state => ({
    error: state.data.error,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
