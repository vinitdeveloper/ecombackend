// @flow
import React from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import axios from 'axios';
import { API_URL } from '../../../Config';

class EditCategory extends React.Component {

    constructor(props){
        super(props);   
        
        this.state = {
			randomCode : "",
            code : '',
            discount : '',
            msg : ""
        }

    }

    componentDidMount(){

        let self = this;

 		axios.get(`coupon/${this.props.match.params.id}`)
	    .then(function (response) {
			
          self.setState({
                code : response.data.data.coupon_code,
                discount : response.data.data.discount
            });

	    })
	    .catch(function (error) {
	      console.log(error);
        });
        
    }

    handleSubmitUpdate(event, data, values) {
       
        let self = this;

        axios.put('update-coupon', data)
        .then(function (response) {
            var msgText = response.data.message;
            alert(msgText);
            self.setState({msg : msgText});
        })
        .catch(function (error) {
          console.log(error);
        });

    }
	
	 onButtonClick = () => {
		   
		   let self = this;

			axios.get('generate-code')
			.then(function (response) {
				self.setState({randomCode : response.data.random_code});
			})
			.catch(function (error) {
			  console.log(error);
			});
		   
		};

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
									
									 <AvField name="code" label="Coupon Code" value={(this.state.randomCode == '') ? this.state.code : this.state.randomCode} type="text" required />
									 <Button color="light" onClick={this.onButtonClick} className="mb-2 mr-1">Code Generator</Button><br />
								
									<AvField name="discount" label="Discount ( Percentage % )" value={this.state.discount} type="number" required />
									
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

export default EditCategory;
