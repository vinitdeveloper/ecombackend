// @flow
import React from 'react';
import { Row, Col, Card, CardBody, Button, Input, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvRadioGroup, AvRadio, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import axios from 'axios';
import { API_URL } from '../../../Config';

class AddProduct extends React.Component {

    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.state = {
            msg : "",
            couponData : [],
            categoryData : [],
            subcategoryData : []
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
		
		axios.get('coupons')
        .then(function (response) {
            console.log(response.data.data);
            self.setState({couponData : response.data.data});
        })
        .catch(function (error) {
          console.log(error);
        });

      }
    
	  
	   handleDropdownChange(e) {
		let cate_id = e.target.value;
		
		let self = this;

        axios.get(`product-allsubcategory/${cate_id}`)
        .then(function (response) {
            // console.log(response.data.data);
            self.setState({subcategoryData : response.data.data});
        })
        .catch(function (error) {
          console.log(error);
        });
		
	  }
		  
		  
      handleSubmit(event, data, values) {
       
        let self = this;
		
		var bodyFormData = new FormData();
		
		//get the input and the file
		var input = document.querySelector('input[type=file]');
		var imageFile = input.files[0];
		bodyFormData.append('product_img', imageFile);
	
		bodyFormData.append('title', data.title); 
		bodyFormData.append('description', data.description); 
		bodyFormData.append('is_featured', data.is_featured); 		
		bodyFormData.append('is_hot', data.is_hot); 		
		bodyFormData.append('price', data.price); 		
		bodyFormData.append('sale_price', data.sale_price); 		
		bodyFormData.append('vendor', data.vendor); 		
		bodyFormData.append('review', data.review); 		
		bodyFormData.append('is_out_of_stock', data.is_out_of_stock); 		
		bodyFormData.append('depot', data.depot); 		
		bodyFormData.append('inventory', data.inventory); 		
		bodyFormData.append('is_active', data.is_active); 		
		bodyFormData.append('is_sale', data.is_sale); 		
		bodyFormData.append('product_category', data.product_category); 		
		bodyFormData.append('product_sub_category', data.product_sub_category); 		
		bodyFormData.append('coupon_id', data.product_coupon); 		

        axios.post('create-product', bodyFormData )
        .then(function (response) {
			console.log(response.data);
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

        const AllCoupon = this.state.couponData.map( coupon => {
            return <option value={coupon.id}>{coupon.coupon_code} ( {coupon.discount} % )</option>;
        }); 
		
		const AllCategory = this.state.categoryData.map( category => {
            return <option value={category.id}>{category.name}</option>;
        });
		
		const AllSubcategory = this.state.subcategoryData.map( subcategory => {
            return <option value={subcategory.id}>{subcategory.name}</option>;
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
								
								<AvField name="description" label="Product Description" type="textarea" required />
								
                                <AvField name="product_img" label="Product Image Size : 55 x 55 (PX) " type="file" required />

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

                                <AvField type="select" name="product_category" onChange={this.handleDropdownChange} label="Select Category Name" helpMessage="plesae select category name" required>
                                    
                                   <option value="">-- Select Category --</option>;
                                  {AllCategory}

                                </AvField>
								
								<AvField type="select" name="product_sub_category" label="Select Sub Category Name" helpMessage="plesae select subcategory name" required>
                                    
                                   <option value="">-- Select SubCategory --</option>;
                                  {AllSubcategory}

                                </AvField>
								
								<AvField type="select" name="product_coupon" label="Select Discount Code" helpMessage="plesae select Discount Code">
                                    
                                   <option value="">-- Select Discount Code --</option>;
                                  {AllCoupon}

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
