// @flow
import React from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import axios from 'axios';
import { API_URL } from '../../../Config';

class EditUser extends React.Component {

    constructor(props){
        super(props);   
        
        this.state = {
            username : '',
            email : '',
            mobile : '',
            role : '',
            status : '',
            msg : ""
        }

    }

    componentDidMount(){

        let self = this;

 		axios.get(`user/${this.props.match.params.id}`)
	    .then(function (response) {
			
          self.setState({
                username : response.data.data.username,
                email : response.data.data.email,
                mobile : response.data.data.mobile,
                role : response.data.data.role,
                status : response.data.data.status
            });

	    })
	    .catch(function (error) {
	      console.log(error);
        });
        
    }

    handleSubmitUpdate(event, data, values) {
       
        let self = this;

        axios.put('update-user', data)
        .then(function (response) {
            var msgText = response.data.message;
            alert(msgText);
            self.setState({msg : msgText});
        })
        .catch(function (error) {
          console.log(error);
        });

    }

    render(){
        return (
            <React.Fragment>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Edit Coupon', path: '/apps/editcoupon', active: true },
                    ]}
                    title={'Edit Coupon'}
                />

                <Row>
                
                    <Col lg={6}>
                        <Card>
                            <CardBody>
                                {this.state.msg && 
                                    <h1>{this.state.msg}</h1>
                                }
                                <AvForm onValidSubmit={this.handleSubmitUpdate}>
									<AvField name="id" value={this.props.match.params.id} type="hidden" required />
									
									<AvField name="username" value={this.state.username} label="Username" type="text" disabled required />
									
									<AvField name="email" value={this.state.email} label="Email" type="email" required />
									
									<AvField name="password" label="Password" placeholder="Blank if not update" type="password" />
									
									<AvField name="mobile" value={this.state.mobile} label="Mobile" type="number" required />
									
									<AvField type="select" name="role" value={this.state.role} label="select user role" helpMessage="plesae select user role" required>
									   <option value="">-- Select Role --</option>;
									   <option value="0">Customer</option>
									   <option value="1">Subadmin</option>
									</AvField>
									
									<AvField type="select" name="status" value={this.state.status} label="select user status" helpMessage="plesae select user status" required>
									   <option value="">-- Select Status --</option>;
									   <option value="1">Active</option>
									   <option value="0">Inactive</option>
									</AvField>
									
									<Button color="primary" type="submit">
										Update
									</Button>
									
								</AvForm>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
            </React.Fragment>
        );
    }
};

export default EditUser;
