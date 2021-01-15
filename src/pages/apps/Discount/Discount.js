// @flow
import React, { useState, useEffect } from 'react';
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
// import { products } from './DataCategories';
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
            <label className="d-inline ml-1">Category</label>
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
const Categories = () => {
    const [coupons, setCoupons] = useState([]);

// Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchCoupons()
  }, []);

  const fetchCoupons = () => {
    fetch(`${API_URL}coupons`)
    .then(response => response.json())
    .then(json => setCoupons(json.data))
  }


    // custom column render
    const ProductColumn = (cell, row, rowIndex, extraData) => {
        const rating = row.rating;
        const emptyStars = rating < 5 ? 5 - rating : 0;
        return (
            <React.Fragment>
                <img src={row.image} alt={row.name} title={row.name} className="rounded mr-3" height="48" />
                <p className="m-0 d-inline-block align-middle font-16">
                    <Link to="/" className="text-body">
                        {row.name}
                    </Link>
                    <br />
                    {[...Array(rating)].map((x, i) => (
                        <span key={i} className="text-warning mdi mdi-star"></span>
                    ))}
                    {[...Array(emptyStars)].map((x, i) => (
                        <span key={i} className="text-warning mdi mdi-star-outline"></span>
                    ))}
                </p>
            </React.Fragment>
        );
    };

    const StatusColumn = (cell, row, rowIndex, extraData) => {
        return (
            <React.Fragment>
                <span className={classNames('badge', { 'badge-success': row.status, 'badge-danger': !row.status })}>
                    {row.status ? 'Active' : 'Deactivated'}
                </span>
            </React.Fragment>
        );
    };

    const ActionColumn = (cell, row, rowIndex, extraData) => {
        
        function handleClick(e,rowId) {
            e.preventDefault();

            let obj = { id : rowId }

            axios.delete(`delete-coupon/${rowId}`)
            .then(function (response) {
                // console.log(response);
                alert(response.data.message);
                fetchCoupons()
            })
            .catch(function (error) {
                console.log(error);
            });


        }

        return (
            <React.Fragment>
                <Link to={`/apps/editcoupon/${row.id}`} className="action-icon">
                    {' '}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link to={`/apps/editcoupon/${row.id}`} className="action-icon">
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
            dataField: 'coupon_code',
            text: 'Coupon Code',
            sort: true,
        },
        {
            dataField: 'discount',
            text: 'Discount',
            sort: false,
        },
        {
            dataField: 'created_on',
            text: 'Created Date',
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

    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Coupon', path: '/apps/addcoupon', active: true },
                ]}
                title={'Coupon'}
            />
            
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col sm={4}>
									<Link to="/apps/addcoupon" className="action-icon">
										 <Button color="danger" className="mb-2">
											<i className="mdi mdi-plus-circle mr-2"></i> Add Coupon
										</Button>
									</Link>
                                </Col>
                            </Row>

                            <TableWithSeletableRows
                                data={coupons}
                                pageLength={coupons.length}
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

export default Categories;
