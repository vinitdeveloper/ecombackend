// @flow
import React from 'react';
import { Row, Col, Card, CardBody, Button, Input, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvRadioGroup, AvRadio, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import axios from 'axios';

class AddProduct extends React.Component {

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

        axios.get('http://localhost:7070/product-categories')
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

        axios.post('http://localhost:7070/create-product', data)
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
                    { label: 'Add Product', path: '/apps/addproduct', active: true },
                ]}
                title={'Add Product'}
            />

            <Row>
			
                <Col lg={6}>
                    <Card>
                        <CardBody>
                            {this.state.msg && 
                                <h4>{this.state.msg}</h4>
                            }

                            <AvForm onValidSubmit={this.handleSubmit}  ref={c => (this.form = c)}>

                                <AvField name="title" label="Product Title" type="text" required />

                                {/* Radios */}
                                <AvRadioGroup inline name="is_featured" label="Is featured" required>
                                    <AvRadio label="ON" value="1" defaultChecked />
                                    <AvRadio label="OFF" value="0" />
                                </AvRadioGroup>
                                {/* Radios */}
                            
                                 {/* Radios */}
                                 <AvRadioGroup inline name="is_hot" label="Is Hot" required>
                                    <AvRadio label="ON" value="1" checked />
                                    <AvRadio label="OFF" value="0" />
                                </AvRadioGroup>
                                {/* Radios */}

                                <AvField
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="Price"
                                    required
                                />

                                <AvField
                                    type="number"
                                    name="sale_price"
                                    id="sale_price"
                                    placeholder="Sale Price"
                                    required
                                />

                                <AvField name="vendor" label="Vendor Name" type="text" required />

                                <AvField
                                    type="number"
                                    name="review"
                                    id="review"
                                    placeholder="Review"
                                    required
                                />

                                {/* Radios */}
                                <AvRadioGroup inline name="is_out_of_stock" label="Is Out of Stock" required>
                                    <AvRadio label="YES" value="1" checked />
                                    <AvRadio label="NO" value="0" />
                                </AvRadioGroup>
                                {/* Radios */}

                                <AvField
                                    type="number"
                                    name="depot"
                                    id="depot"
                                    placeholder="Dept"
                                    required
                                />

                                <AvField
                                    type="number"
                                    name="inventory"
                                    id="inventory"
                                    placeholder="Inventory Stock"
                                    required
                                />

                                
                                {/* Radios */}
                                <AvRadioGroup inline name="is_active" label="Is Active" required>
                                    <AvRadio label="YES" value="1" checked />
                                    <AvRadio label="NO" value="0" />
                                </AvRadioGroup>
                                {/* Radios */}

                                {/* Radios */}
                                <AvRadioGroup inline name="is_sale" label="Is Sale" required>
                                    <AvRadio label="YES" value="1" checked />
                                    <AvRadio label="NO" value="0" />
                                </AvRadioGroup>
                                {/* Radios */}

                                <AvField type="select" name="product_sub_category" label="Select Category Name" helpMessage="plesae select category name" required>
                                    
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

export default AddProduct;
