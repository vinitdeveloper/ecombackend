// @flow
import React, { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory, {
    PaginationProvider,
    SizePerPageDropdownStandalone,
    PaginationTotalStandalone,
    PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';
import classNames from 'classnames';

import PageTitle from '../../../components/PageTitle';
// import { products } from './CustomData';
import axios from 'axios';
import { API_URL } from '../../../Config';

// the table with selectable records
const TableWithSeletableRows = mainProps => {
    const customTotal = (from, to, size) => (
        <label className="react-bootstrap-table-pagination-total ml-2">
            Showing {from} to {to} of {size}
        </label>
    );

    const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
        <React.Fragment>
            <label className="d-inline mr-1">Display</label>
            <UncontrolledDropdown className="d-inline">
                <DropdownToggle caret tag="button" type="button" className="btn btn-outline-secondary btn-sm">
                    {currSizePerPage}
                </DropdownToggle>
                <DropdownMenu>
                    {options.map((option, idx) => (
                        <DropdownItem
                            key={idx}
                            type="button"
                            className={classNames({ active: currSizePerPage + '' === option.page + '' })}
                            onClick={() => onSizePerPageChange(option.page)}>
                            {option.text}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </UncontrolledDropdown>
            <label className="d-inline ml-1">products</label>
        </React.Fragment>
    );

    const { SearchBar } = Search;

    return (
        <PaginationProvider
            bootstrap4
            pagination={paginationFactory({
                ...mainProps.paginationOptions,
                paginationTotalRenderer: customTotal,
                custom: true,
                sizePerPageRenderer: sizePerPageRenderer,
            })}
            keyField="id"
            data={mainProps.data}
            columns={mainProps.columns}>
            {({ paginationProps, paginationTableProps }) => (
                <ToolkitProvider keyField="id" data={mainProps.data} columns={mainProps.columns} search>
                    {props => (
                        <React.Fragment>
                            <Row className="mt-2">
                                <Col md={6}>
                                    <SizePerPageDropdownStandalone {...paginationProps} />
                                </Col>
                                <Col md={6} className="text-sm-right mt-2 mt-sm-0">
                                    Search: <SearchBar {...props.searchProps} />
                                </Col>
                            </Row>

                            <BootstrapTable
                                {...props.baseProps}
                                bordered={false}
                                headerClasses="thead-light"
                                wrapperClasses="table-responsive"
                                {...paginationTableProps}
                            />
                            <Row>
                                <Col>
                                    <PaginationTotalStandalone {...paginationProps} dataSize={mainProps.pageLength} />
                                </Col>
                                <Col className="react-bootstrap-table-pagination-list">
                                    <PaginationListStandalone {...paginationProps} />
                                </Col>
                            </Row>
                        </React.Fragment>
                    )}
                </ToolkitProvider>
            )}
        </PaginationProvider>
    );
};

// main component
const Products = () => {

    const[products, setProducts] = useState([]);

    useEffect(()=>{
        fetchProducts()
    },[]);

    const fetchProducts = () => {
        fetch(`${API_URL}products`)
        .then(response => response.json())
        .then(json => setProducts(json.data))
      }


    // custom column render
    const ProductColumn = (cell, row, rowIndex, extraData) => {
        const rating = row.rating;
        const emptyStars = rating < 5 ? 5 - rating : 0;
        return (
            <React.Fragment>
                <img src={row.product_img} alt={row.title} title={row.title} className="rounded mr-3" height="48" />
                <p className="m-0 d-inline-block align-middle font-16">
                   {row.title}
                </p>
            </React.Fragment>
        );
    };

    const StatusColumn = (cell, row, rowIndex, extraData) => {
        return (
            <React.Fragment>
                <span className={classNames('badge', { 'badge-success': row.is_active, 'badge-danger': !row.is_active })}>
                    {row.is_active ? 'Active' : 'Deactivated'}
                </span>
            </React.Fragment>
        );
    };

    const ActionColumn = (cell, row, rowIndex, extraData) => {

        function handleClick(e,rowId) {
            e.preventDefault();

            let obj = { id : rowId }

            axios.delete(`delete-product/${rowId}`)
            .then(function (response) {
                // console.log(response);
                alert(response.data.message);
                fetchProducts()
            })
            .catch(function (error) {
                console.log(error);
            });


        }


        return (
            <React.Fragment>
                <Link to="/" className="action-icon">
                    {' '}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link to={`/apps/editproduct/${row.id}`} className="action-icon">
                    {' '}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
                <Link onClick={(event) => handleClick(event,row.id)} className="action-icon">
                    {' '}
                    <i className="mdi mdi-delete"></i>
                </Link>
            </React.Fragment>
        );
    };

    const columns = [
        {
            dataField: 'title',
            text: 'Product',
            sort: true,
			formatter: ProductColumn,
        },
        {
            dataField: 'price',
            text: 'Price',
            sort: false,
        },
        {
            dataField: 'sale_price',
            text: 'Sale Price',
            sort: false,
        },
        {
            dataField: 'vendor',
            text: 'Vendor',
            sort: false,
        },
        {
            dataField: 'is_active',
            text: 'Status',
            sort: false,
            formatter: StatusColumn,
        },
        {
            dataField: 'created_at',
            text: 'Created On',
            sort: false,
        },
        {
            dataField: 'action',
            isDummyColumn: true,
            text: 'Action',
            sort: false,
            classes: 'table-action',
            formatter: ActionColumn,
        },
    ];

    const paginationOptions = {
        paginationSize: 5,
        pageStartIndex: 1,
        withFirstAndLast: false,
        showTotal: true,
        sizePerPageList: [
            {
                text: '5',
                value: 5,
            },
            {
                text: '10',
                value: 10,
            },
            {
                text: '25',
                value: 25,
            },
        ],
    };
	
	const inputFile = useRef(null) 

	const uploadExcelFile = (event) => {
		
		// console.log('file upload');
		
		 var bodyFormData = new FormData();
		
		//get the input and the file
		var input = document.querySelector('input[type=file]');
		var imageFile = input.files[0];
		bodyFormData.append('product_excel', imageFile);
		
		axios.post('upload-excel', bodyFormData )
        .then(function (response) {
			// console.log(response.data);
            alert('product imported done');
            fetchProducts()
			 // var msgText = response.data.message;

            // self.setState({msg : msgText});
        })
        .catch(function (error) {
          console.log(error);
        });
		
		event.target.value=null
	
	};
	const onButtonClick = () => {
    // `current` points to the mounted file input element
	   // console.log('working');
	   inputFile.current.click();
	   
	};

    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'eCommerce', path: '/apps/ecommerce/products' },
                    { label: 'Products', path: '/apps/ecommerce', active: true },
                ]}
                title={'Products'}
            />

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col sm={4}>
                                    <Link to="/apps/addproduct" className="action-icon">
                                        <Button color="danger" className="mb-2">
                                            <i className="mdi mdi-plus-circle mr-2"></i> Add Product
                                        </Button>
                                    </Link>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-right">
                                        <Button color="success" className="mb-2 mr-1">
                                            <i className="mdi mdi-settings"></i>
                                        </Button>

										<input type='file' id='file' ref={inputFile} onChange={uploadExcelFile} style={{display: 'none'}}/>
                                        <Button color="light" onClick={onButtonClick} className="mb-2 mr-1">
                                            Import
                                        </Button>

                                        <Button color="light" className="mb-2 mr-1">
                                            Export
                                        </Button>
                                    </div>
                                </Col>
                            </Row>

                            <TableWithSeletableRows
                                data={products}
                                pageLength={products.length}
                                columns={columns}
                                paginationOptions={paginationOptions}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Products;
