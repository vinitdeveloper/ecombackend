// @flow
import React from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import axios from 'axios';
import { API_URL } from '../../../Config';

class EditSubcategory extends React.Component {

    constructor(props){
        super(props);   
        
        this.state = {
            name : '',
            desc : '',
            category_id : '',
            msg : "",
            categoryData : []
        }

    }

    componentDidMount(){

        let self = this;

 		axios.get(`product-subcategory/${this.props.match.params.id}`)
	    .then(function (response) {
        //   console.log(response.data.data);
          
          self.setState({
                name : response.data.data.name,
                desc : response.data.data.description,
                category_id : response.data.data.product_category
            });

	    })
	    .catch(function (error) {
	      console.log(error);
        });


        axios.get('product-categories')
        .then(function (response) {
            console.log(response.data.data);
            self.setState({categoryData : response.data.data});
        })
        .catch(function (error) {
          console.log(error);
        });

        
    }

    handleSubmitUpdate(event, data, values) {

        let self = this;

        axios.put('update-subcategory', data)
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

        const AllCategory = this.state.categoryData.map( category => {
            return <option value={category.id}>{category.name}</option>;
        });

        return (
            <React.Fragment>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'Edit Subcategory', path: '/apps/addsubcategory', active: true },
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

                                    <AvField name="name" label="Subcategory Name" value={this.state.name} type="text" required />

                                    <AvField name="description" label="Description" value={this.state.desc} rows="7" type="textarea" required />

                                    <AvField type="select" value={this.state.category_id} name="category_id" label="Select Category Name" helpMessage="plesae select category name" required>
                                        
                                        {AllCategory}

                                    </AvField>

                                    <AvField name="id" value={this.props.match.params.id} type="hidden" required />

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

export default EditSubcategory;
