// @flow
import React from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import axios from 'axios';

class AddSlider extends React.Component {
    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            msg : ""
        };
      }
    
      handleSubmit(event, data, values) {
       
        let self = this;
		
		var bodyFormData = new FormData();
		
		//get the input and the file
		var input = document.querySelector('input[type=file]');
		var imageFile = input.files[0];
		bodyFormData.append('slider_image', imageFile);
        bodyFormData.append('title', data.title);
        bodyFormData.append('button', data.button_text);
		bodyFormData.append('hyperlink', data.button_link);
		

        axios.post('create-slider', bodyFormData)
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
                    { label: 'Add Category', path: '/apps/addcategory', active: true },
                ]}
                title={'Add Category'}
            />

            <Row>
			
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            {this.state.msg && 
                                <h4>{this.state.msg}</h4>
                            }
								<AvForm onValidSubmit={this.handleSubmit}  ref={c => (this.form = c)}>
                                   
									<AvField name="title" label="Slider Title Size : 1230 x 425 (PX) " type="text" required/>
									
                                    <AvField name="button_text" label="Button Text" type="text"/>

                                    <AvField name="button_link" label="Button Hyperlink" type="text"/>

									<AvField name="slider" label="Slider Image" type="file" required/>
								   
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

export default AddSlider;
