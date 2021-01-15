// @flow
import React from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import axios from 'axios';

class AddSubcategory extends React.Component {

    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            msg : "",
            categoryData : []
        };
      }

      componentDidMount(){
          
        let self = this;

        axios.get('product-categories')
        .then(function (response) {
            console.log(response.data.data);
            self.setState({categoryData : response.data.data});
        })
        .catch(function (error) {
          console.log(error);
        });

      }
    
      handleSubmit(event, data, values) {
       
        let self = this;

        axios.post('create-subcategory', data)
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

        const AllCategory = this.state.categoryData.map( category => {
            return <option value={category.id}>{category.name}</option>;
        });

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

                                <AvField name="name" label="Subcategory Name" type="text" required />

                                <AvField name="description" label="Description" rows="7" type="textarea" required />

                                <AvField type="select" name="category_id" label="Select Category Name" helpMessage="plesae select category name" required>
                                    
                                   <option value="">-- Select Category --</option>;
                                  {AllCategory}



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

export default AddSubcategory;
