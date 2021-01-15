// @flow
import React from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import axios from 'axios';
import { API_URL } from '../../../Config';

class AddUser extends React.Component {
    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            msg : ""
        };
      }
    
	handleSubmit(event, data, values) {
       
        let self = this;

        axios.post('create-user', data)
        .then(function (response) {
            var msgText = response.data.message;

            self.setState({msg : msgText});
        })
        .catch(function (error) {
          console.log(error);
        });
        
         // form fields reset if submit done
         this.form && this.form.reset();

      }
      
    render(){
    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Add Coupon', path: '/apps/addcoupon', active: true },
                ]}
                title={'Add Coupon'}
            />

            <Row>
			
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            {this.state.msg && 
                                <h4>{this.state.msg}</h4>
                            }
                            <AvForm onValidSubmit={this.handleSubmit}  ref={c => (this.form = c)}>
							
                                <AvField name="username" label="Username" type="text" required />
								
								<AvField name="email" label="Email" type="email" required />
								
								<AvField name="password" label="Password" type="password" required />
								
								<AvField name="mobile" label="Mobile" type="number" required />
								
								<AvField type="select" name="role" label="select user role" helpMessage="plesae select user role" required>
                                   <option value="">-- Select Role --</option>;
                                   <option value="0">Customer</option>
                                   <option value="1">Subadmin</option>
                                </AvField>
								
								<AvField type="select" name="status" label="select user status" helpMessage="plesae select user status" required>
                                   <option value="">-- Select Status --</option>;
                                   <option value="1">Active</option>
                                   <option value="0">Inactive</option>
                                </AvField>
								
                                <Button color="primary" type="submit">
                                    Submit
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

export default AddUser;
