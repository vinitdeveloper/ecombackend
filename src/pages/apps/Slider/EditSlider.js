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
            slider_img : '',
            title : '',
            button_text : '',
            button_link : '',
            msg : ""
        }

    }

    componentDidMount(){
		let self = this;

 		axios.get(`slider/${this.props.match.params.id}`)
	    .then(function (response) {
          
          self.setState({
                slider_img : response.data.data.slider_img,
                title : response.data.data.name,
                button_text : response.data.data.button_text,
                button_link : response.data.data.button_link,
            });

	    })
	    .catch(function (error) {
	      console.log(error);
        });
    }
	
	componentDidUpdate(){
		let self = this;

 		axios.get(`slider/${this.props.match.params.id}`)
	    .then(function (response) {
          
          self.setState({
                slider_img : response.data.data.slider_img,
                title : response.data.data.name,
                button_text : response.data.data.button_text,
                button_link : response.data.data.button_link,
            });

	    })
	    .catch(function (error) {
	      console.log(error);
        });
    }

    handleSubmitUpdate(event, data, values) {
       
        let self = this;
		
		var bodyFormData = new FormData();
		
		//get the input and the file
		var input = document.querySelector('input[type=file]');
		var imageFile = input.files[0];
		bodyFormData.append('slider_image', imageFile);
		bodyFormData.append('id', data.id);
		bodyFormData.append('title', data.title);
		bodyFormData.append('button', data.button_text);
		bodyFormData.append('hyperlink', data.button_link);

        axios.put('update-slider', bodyFormData)
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
                        { label: 'Edit Category', path: '/apps/addcategory', active: true },
                    ]}
                    title={'Edit Category'}
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
                                   
									<AvField name="title" label="Slider Title" value={this.state.title} type="text" required/>

                                    <AvField name="button_text" label="Button Text" value={this.state.button_text} type="text"/>

                                    <AvField name="button_link" label="Button Hyperlink" value={this.state.button_link} type="text"/>
									
									<AvField name="slider" label="Slider Image Size : 1230 x 425 (PX) " type="file" required/>
									
									<img src={this.state.slider_img} style={{width:'500px',height:'300px'}} /><br /><br />
								   
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

export default EditCategory;
