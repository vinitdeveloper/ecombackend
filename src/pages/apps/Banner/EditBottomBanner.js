// @flow
import React from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import axios from 'axios';
import { API_URL } from '../../../Config';

class EditBottomBanner extends React.Component {

    constructor(props){
        super(props);   
        
        this.state = {
            banner_img : '',
            title : '',
            msg : ""
        }

        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
    }

    componentDidMount(){
		this.fetch();
    }

    fetch = () => {
        let self = this;

        axios.get('bottom-banner')
       .then(function (response) {
         
         self.setState({
               banner_img : response.data.data.banner_img,
               title : response.data.data.name
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
		bodyFormData.append('banner', imageFile);
		bodyFormData.append('title', data.title);

        axios.put('update-bottombanner', bodyFormData)
        .then(function (response) {
            var msgText = response.data.message;
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
                                   
									<AvField name="title" value={this.state.title} label="Banner Title" type="text" required/>
									
									<AvField name="banner" label="Banner Image Size : 380 x 190 (PX)" type="file" required/>
								
									<img src={this.state.banner_img} style={{width:'500px',height:'300px'}} /><br /><br />
								   
                                    <Button color="primary" type="submit">
                                        Update Banner
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

export default EditBottomBanner;
