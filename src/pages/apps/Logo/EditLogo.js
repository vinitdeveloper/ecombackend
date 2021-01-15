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
            logo_img : '',
            alt_tag : '',
            msg : ""
        }

        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
    }

    componentDidMount(){
		this.fetch();
    }
	

    fetch = () => {
        let self = this;

 		axios.get('logo')
	    .then(function (response) {
          // console.log(response.data.logo);
          
          self.setState({
                logo_img : response.data.logo,
                alt_tag : response.data.alt_tag
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
        bodyFormData.append('logo', imageFile);
        bodyFormData.append('title', data.alt_tag);

        axios.put('update-logo', bodyFormData)
        .then(function (response) {
            var msgText = response.data.message;
            // alert(msgText);
            self.setState({msg : msgText});
            self.fetch();

            setTimeout(
                () => self.setState({msg : ""}), 
                3000
              );

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
                                    <p>{this.state.msg}</p>
                                }
                                <AvForm onValidSubmit={this.handleSubmitUpdate}>

                                    <AvField name="alt_tag" value={this.state.alt_tag} label="Logo Title" type="text" required/>
                                   
									<AvField name="logo" label="Logo Image Size : 156 x 32 (PX)" type="file" />
								
									<img src={this.state.logo_img} style={{width:'160px',height:'40px'}} /><br /><br />
								   
                                    <Button color="primary" type="submit">
                                        Update Logo
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
