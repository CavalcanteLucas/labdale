import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { register } from "./actions";

export class RegisterForm extends React.Component {

    onSubmit = async e => {
        e.preventDefault();
        const response = await this.props.register(this.state.username, this.state.password);
        if ( response == 201 ) {
            this.props.history.push("/");
        }
    }

    render() {gs

        const { errors } = this.props;

        let error = [];
        if (errors) {
            Object.keys(errors).map(field => {
                error.push(field + ": " + errors[field][0]);
            });
        }

        return (
            <form onSubmit={this.onSubmit}>
            <fieldset>
                <legend>Register</legend>
                <p>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text" id="username"
                        onChange={e => this.setState({username: e.target.value})}
                    />
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password" id="password"
                        onChange={e => this.setState({password: e.target.value})}
                    />
                </p>
                <p><button type="submit">Register</button></p>

                <p>Already have an account? <Link to="/login">Login</Link></p>

                {/* Displaying errors */}
                { errors ? <ul>{
                    error.map( item => (
                        <li key={item}>{item}</li>
                    ))
                }</ul> : null }
            </fieldset>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        errors: state.todoAuth.errors,
    }
}

const mapDispatchToProps = dispatch => ({
    register: (username, password) => dispatch(register(username, password))
  });

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
