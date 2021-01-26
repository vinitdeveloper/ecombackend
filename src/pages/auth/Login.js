import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import { loginUser } from '../../redux/actions';
import { isUserAuthenticated } from '../../helpers/authUtils';
import LoaderWidget from '../../components/Loader';
import logo from '../../assets/images/logo.png';

import axios from 'axios';
import { API_URL } from '../../Config';
import { Cookies } from 'react-cookie';

class Login extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {
            successMsg: '',
            errorMsg: '',
            username: '',
            password: '',
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
	
	setSession = user => {
		let cookies = new Cookies();
		if (user) cookies.set('user', JSON.stringify(user), { path: '/' });
		else cookies.remove('user', { path: '/' });
	};

    /**
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {
        // this.props.loginUser(values.username, values.password, this.props.history);

        let cookies = new Cookies();
                
                const response_login = {
                    id : 50,
					username : "admin",
					email : "admin@gmail.com",
					mobile : "9999999999",
					role : 'Admin',
					status : 1,
					token : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI'
                }
				
                cookies.set('user', JSON.stringify(response_login), { path: '/' });
                
		// let self = this;
		
        // axios.post('subadmin-login', values)
        // .then(function (response) {
			
		// 	if(response.data.error == false){
		// 		var msgText = response.data.message;
		// 		self.setState({ successMsg : msgText, errorMsg : "" });
				
		// 		let cookies = new Cookies();
				
		// 		cookies.set('user', JSON.stringify(response.data.data), { path: '/' });
                
        //         // this.props.history.push("/");
		// 		setTimeout(function(){ window.location.reload(); }, 1000);
				
		// 		// this.setSession(response.data.data);
				
		// 	}else{
		// 		var msgText = response.data.message;
		// 		self.setState({ errorMsg : msgText, successMsg : "" });
		// 	}
			
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
		
    };

    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            return <Redirect to="/" />;
        }
    };

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>
                {this.renderRedirectToRoot()}

                {(this._isMounted || !isAuthTokenValid) && (
                    <div className="account-pages mt-5 mb-5">
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg={5}>
                                    <Card>
                                        <div className="card-header pt-4 pb-4 text-center bg-primary">
                                            <Link to="/">
                                                <span>
                                                    <img src={logo} alt="" height="18" />
                                                </span>
                                            </Link>
                                        </div>

                                        <CardBody className="p-4 position-relative">
                                            {/* preloader */}
                                            {this.props.loading && <LoaderWidget />}

                                            <div className="text-center w-75 m-auto">
                                                <h4 className="text-dark-50 text-center mt-0 font-weight-bold">
                                                    Sign In
                                                </h4>
                                                <p className="text-muted mb-4">
                                                    Enter your username and password to access admin panel.
                                                </p>
                                            </div>

                                            {this.props.error && (
                                                <Alert color="danger" isOpen={this.props.error ? true : false}>
                                                    <div>{this.props.error}</div>
                                                </Alert>
                                            )}
											
											{this.state.successMsg && (
												<Alert color="success" isOpen={this.state.successMsg ? true : false}>
                                                    <div>{this.state.successMsg}</div>
                                                </Alert>
											)}
											
											{this.state.errorMsg && (
												<Alert color="danger" isOpen={this.state.errorMsg ? true : false}>
                                                    <div>{this.state.errorMsg}</div>
                                                </Alert>
											)}

                                            <AvForm onValidSubmit={this.handleValidSubmit}>
                                                <AvField
                                                    name="username"
                                                    label="Username"
                                                    placeholder="Enter your username"
                                                    value={this.state.username}
                                                    required
                                                />

                                                <AvGroup>
                                                    <Label for="password">Password</Label>
                                                    {/* <Link
                                                        to="/account/forget-password"
                                                        className="text-muted float-right">
                                                        <small>Forgot your password?</small>
                                                    </Link> */}
                                                    <AvInput
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        placeholder="Enter your password"
                                                        value={this.state.password}
                                                        required
                                                    />
                                                    <AvFeedback>This field is invalid</AvFeedback>
                                                </AvGroup>

                                                <FormGroup>
                                                    <Button color="success">Submit</Button>
                                                </FormGroup>

                                                {/* <p>
                                                    <strong>Username:</strong> test &nbsp;&nbsp;{' '}
                                                    <strong>Password:</strong> test
                                                </p> */}
                                            </AvForm>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row className="mt-1">
                                <Col className="col-12 text-center">
                                    <p className="text-muted">
                                        Don't have an account?{' '}
                                        <Link to="/account/register" className="text-muted ml-1">
                                            <b>Register</b>
                                        </Link>
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
