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
            name : '',
            desc : '',
            msg : ""
        }

    }

    componentDidMount(){

        let self = this;

 		axios.get(`product-category/${this.props.match.params.id}`)
	    .then(function (response) {
        //   console.log(response.data.data);
          
          self.setState({
                name : response.data.data.name,
                desc : response.data.data.description
            });

	    })
	    .catch(function (error) {
	      console.log(error);
        });
        
    }

    handleSubmitUpdate(event, data, values) {
       
        let self = this;

        axios.put('update-category', data)
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
                                    <AvField name="name" label="Category Name" value={this.state.name} type="text" required />
                                    <AvField name="description" label="Description" value={this.state.desc} rows="7" type="textarea" required />
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
