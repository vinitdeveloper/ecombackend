// @flow
import React from 'react';
import { Row, Col, Card, CardBody, Button, InputGroupAddon, Label, FormGroup, CustomInput } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvRadioGroup, AvRadio, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import PageTitle from '../../../components/PageTitle';
import axios from 'axios';
import { API_URL } from '../../../Config';

class EditProduct extends React.Component {

    constructor(props){
        super(props);   
        
		this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.state = {
            title : '',
            description : '',
            product_img : '',
            coupon_id : '',
            is_featured : '',
            is_hot : '',
            price : '',
            sale_price : '',
            vendor : '',
            review : '',
            is_out_of_stock : '',
            depot : '',
            inventory : '',
            is_active : '',
            is_sale : '',
            product_category : '',
            product_sub_category : '',
            msg : "",
			couponData : [],
            categoryData : [],
			subcategoryData : [],
			featuredData : [
				{
					label : "ON",
					value : 1
				},
				{
					label : "OFF",
					value : 0
				}
			],
			hotData : [
				{
					label : "ON",
					value : 1
				},
				{
					label : "OFF",
					value : 0
				}
			],
			outOfStockData : [
				{
					label : "Yes",
					value : 1
				},
				{
					label : "No",
					value : 0
				}
			],
			isActiveData : [
				{
					label : "Yes",
					value : 1
				},
				{
					label : "No",
					value : 0
				}
			],
			isSaleData : [
				{
					label : "Yes",
					value : 1
				},
				{
					label : "No",
					value : 0
				}
			]
        }

    }

    componentDidMount(){

        let self = this;

 		axios.get(`product/${this.props.match.params.id}`)
	    .then(function (response) {
          console.log(response.data.data);
          
          self.setState({
            title : response.data.data.title,
            description : response.data.data.description,
            product_img : response.data.data.product_img,
            coupon_id : response.data.data.coupon_id,
            is_featured : response.data.data.is_featured,
            is_hot : response.data.data.is_hot,
            price : response.data.data.price,
            sale_price : response.data.data.sale_price,
            vendor : response.data.data.vendor,
            review : response.data.data.review,
            is_out_of_stock : response.data.data.is_out_of_stock,
            depot : response.data.data.depot,
            inventory : response.data.data.inventory,
            is_active : response.data.data.is_active,
            is_sale : response.data.data.is_sale,
            product_category : response.data.data.product_category,
            product_sub_category : response.data.data.product_sub_category
          });
		  
			axios.get(`product-allsubcategory/${response.data.data.product_category}`)
			.then(function (response) {
				// console.log(response.data.data);
				self.setState({subcategoryData : response.data.data});
			})
			.catch(function (error) {
			  console.log(error);
			});
		  

	    })
	    .catch(function (error) {
	      console.log(error);
        });


        axios.get('product-categories')
        .then(function (response) {
            // console.log(response.data.data);
            self.setState({categoryData : response.data.data});
        })
        .catch(function (error) {
          console.log(error);
        });
		
		axios.get('coupons')
        .then(function (response) {
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

    handleSubmitUpdate(event, data, values) {

        let self = this;
		
		var bodyFormData = new FormData();
		
		//get the input and the file
		var input = document.querySelector('input[type=file]');
		var imageFile = input.files[0];
		bodyFormData.append('product_img', imageFile);
	
		bodyFormData.append('id', data.id); 
		bodyFormData.append('title', data.title); 
		bodyFormData.append('description', data.description); 
		bodyFormData.append('coupon_id', data.product_coupon); 		
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

        axios.post('update-product', bodyFormData )
        .then(function (response) {
			console.log(response.data);
			 // var msgText = response.data.message;
			 var msgText = response.data.message;
            alert(msgText);
            // self.setState({msg : msgText});
        })
        .catch(function (error) {
          console.log(error);
        });

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
		
		const AllFeaturedOptions = this.state.featuredData.map( featuredOption => {
            // return <option value={subcategory.id}>{subcategory.name}</option>;
			return <AvRadio label={featuredOption.label} value={featuredOption.value} />;
        });
		
		const AllHotOptions = this.state.hotData.map( hotOption => {
            // return <option value={subcategory.id}>{subcategory.name}</option>;
			return <AvRadio label={hotOption.label} value={hotOption.value} />;
        });
		
		const AllStockOptions = this.state.outOfStockData.map( outOfStockOption => {
            // return <option value={subcategory.id}>{subcategory.name}</option>;
			return <AvRadio label={outOfStockOption.label} value={outOfStockOption.value} />;
        });
		
		const AllActiveOptions = this.state.isActiveData.map( activeOption => {
			return <AvRadio label={activeOption.label} value={activeOption.value} />;
        });
		
		const AllSaleOptions = this.state.isSaleData.map( saleOption => {
			return <AvRadio label={saleOption.label} value={saleOption.value} />;
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
                                <AvField name="id" value={this.props.match.params.id} type="hidden" required />
								
                                <AvField name="title" label="Product Title" value={this.state.title} type="text" required />
								
								<AvField name="description" label="Product Description" value={this.state.description} type="textarea" required />
								
								<AvField name="product_img" label="Product Image Size : 55 x 55 (PX) " type="file" />
								
								<img src={this.state.product_img} alt={this.state.title} style={{width:'300px',height:'200px'}} />

                                {/* Radios */}
								<AvRadioGroup inline name="is_featured" value={this.state.is_featured} label="Is featured" required>
									{AllFeaturedOptions}
								</AvRadioGroup>
                                {/* Radios */}

                                {/* Radios */}
                                <AvRadioGroup inline name="is_hot" value={this.state.is_hot} label="Is Hot" required>
                                    {AllHotOptions}
                                </AvRadioGroup>
                                {/* Radios */}

                                <AvField
                                    type="number"
                                    name="price"
                                    value={this.state.price}
                                    id="price"
                                    placeholder="Price"
                                    required
                                />

                                <AvField
                                    type="number"
                                    name="sale_price"
                                    value={this.state.sale_price}
                                    id="sale_price"
                                    placeholder="Sale Price"
                                    required
                                />

                                <AvField name="vendor" label="Vendor Name" value={this.state.vendor} type="text" required />

                                <AvField
                                    type="number"
                                    name="review"
                                    value={this.state.review}
                                    id="review"
                                    placeholder="Review"
                                    required
                                />

                                {/* Radios */}
                                <AvRadioGroup inline name="is_out_of_stock" value={this.state.is_out_of_stock} label="Is Out of Stock" required>
                                    {AllStockOptions}
                                </AvRadioGroup>
                                {/* Radios */}

                                <AvField
                                    type="number"
                                    name="depot"
                                    value={this.state.depot}
                                    id="depot"
                                    placeholder="Dept"
                                    required
                                />

                                <AvField
                                    type="number"
                                    name="inventory"
                                    value={this.state.inventory}
                                    id="inventory"
                                    placeholder="Inventory Stock"
                                    required
                                />


                                {/* Radios */}
                                <AvRadioGroup inline name="is_active" value={this.state.is_active} label="Is Active" required>
                                    {AllActiveOptions}
                                </AvRadioGroup>
                                {/* Radios */}

                                {/* Radios */}
                                <AvRadioGroup inline name="is_sale" value={this.state.is_sale} label="Is Sale" required>
                                    {AllSaleOptions}
                                </AvRadioGroup>
                                {/* Radios */}

                                <AvField type="select" name="product_category" value={this.state.product_category} onChange={this.handleDropdownChange}  label="Select Category Name" helpMessage="plesae select category name" required>
                                    
									<option value="">-- Select Category --</option>;
									{AllCategory}

                                </AvField>
								
								<AvField type="select" name="product_sub_category" value={this.state.product_sub_category} label="Select Sub Category Name" helpMessage="plesae select subcategory name" required>
                                    
                                   <option value="">-- Select SubCategory --</option>;
                                  {AllSubcategory}

                                </AvField>
								
								<AvField type="select" name="product_coupon" value={this.state.coupon_id} label="Select Discount Code" helpMessage="plesae select Discount Code">
                                    
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

export default EditProduct;
