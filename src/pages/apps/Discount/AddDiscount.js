// @flow
import React from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import axios from 'axios';
import { API_URL } from '../../../Config';

class FormValidation extends React.Component {
    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            randomCode : "",
            msg : ""
        };
      }
    
      handleSubmit(event, data, values) {
       
        let self = this;

        axios.post('create-coupon', data)
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
							
                                <AvField name="code" label="Coupon Code" value={this.state.randomCode} type="text" required />
								<Button color="light" onClick={this.onButtonClick} className="mb-2 mr-1">Code Generator</Button><br />
								
                                <AvField name="discount" label="Discount ( Percentage % )" type="number" required />
								
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

export default FormValidation;
