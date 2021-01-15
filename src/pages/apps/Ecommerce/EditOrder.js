// @flow
import React from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvRadioGroup, AvRadio, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import axios from 'axios';
import { API_URL } from '../../../Config';

class EditProduct extends React.Component {

    constructor(props){
        super(props);   
        
        this.state = {
            order_id : '',
            cust_id : '',
            status : '',
            msg : '',
        }

    }

    componentDidMount(){

        let self = this;

 		axios.get(`order/${this.props.match.params.id}`)
	    .then(function (response) {
          // console.log(response.data.data);
          
          self.setState({
            order_id : response.data.data.order_id,
            cust_id : response.data.data.customer_id,
            status : response.data.data.status,
          });
		  
	    })
	    .catch(function (error) {
	      console.log(error);
        });


    }
	

	handleSubmitUpdate(event, data, values) {
       
        let self = this;

        axios.put('update-order', data)
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
                        { label: 'Edit Order', path: '/apps/orders', active: true },
                    ]}
                    title={'Edit Order'}
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
									<AvField name="cust_id" value={this.state.cust_id} type="hidden" required="" disabled />
									
									<AvField name="order_id" label="Order ID" value={this.state.order_id} type="text" required="" disabled />
									
									
									<AvField type="select" name="order_status" value={this.state.status} label="Select Order Status" helpMessage="plesae select Order Status">										
										<option value="">-- Select Status --</option>
										<option value="0">Pending</option>
										<option value="1">Processing</option>
										<option value="2">Completed</option>
										<option value="3">Failed</option>
									</AvField>
									
									<AvField name="additional_text" label="Additional Mail Text" placeholder="Additional Message" type="textarea" />

									<Button color="primary" type="submit">
										Update Order
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

export default EditProduct;
