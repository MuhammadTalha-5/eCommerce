import React from 'react';
import TopNav from './TopNav';
import Nav from './Nav';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faShop, faBox } from '@fortawesome/free-solid-svg-icons';
import TopLoadingBar from '../addons/TopLoadingBar';



function Dashboard() {

    return (
        <div id="wrapper">
            <Nav />
            <TopLoadingBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <TopNav />
                <div className="container-fluid">
                    <h4 className="py-3 mb-4">Dashboard</h4>

                    <div className="row mb-3">
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow-sm h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Earnings (Monthly)
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                RS 40,000
                                            </div>
                                        </div>
                                        <div className="col-auto text-gray-300">
                                            <FontAwesomeIcon icon={faCreditCard} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow-sm h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Earnings (Annually)
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                RS 120,000
                                            </div>
                                        </div>
                                        <div className="col-auto text-gray-300">
                                            <FontAwesomeIcon icon={faCreditCard} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-info shadow-sm h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                Sellers
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                8
                                            </div>
                                        </div>
                                        <div className="col-auto text-gray-300">
                                            <FontAwesomeIcon icon={faShop} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-secondary shadow-sm h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                                                Products
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                450
                                            </div>
                                        </div>
                                        <div className="col-auto text-gray-300">
                                            <FontAwesomeIcon icon={faBox} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 col-md-8">
                            <div className="card shadow-sm p-2">
                                <div className="card-header">
                                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                                        <div className="d-flex flex-column justify-content-center">
                                            <div className="card-title">
                                                <h5>Order History</h5>
                                            </div>
                                        </div>
                                        <div className="d-flex align-content-center">
                                            <ul className="nav nav-pills mb-3 bg-light p-1" id="pills-tab" role="tablist">

                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link active" id="pills-allorders-tab" data-bs-toggle="pill" data-bs-target="#pills-allorders" type="button" role="tab" aria-controls="pills-allorders" aria-selected="true">All Orders</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="pills-completedorders-tab" data-bs-toggle="pill" data-bs-target="#pills-completedorders" type="button" role="tab" aria-controls="pills-completedorders" aria-selected="false">Completed</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="pills-inprogressorders-tab" data-bs-toggle="pill" data-bs-target="#pills-inprogressorders" type="button" role="tab" aria-controls="pills-inprogressorders" aria-selected="false">In Progress</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="pills-cancelledorders-tab" data-bs-toggle="pill" data-bs-target="#pills-cancelledorders" type="button" role="tab" aria-controls="pills-cancelledorders" aria-selected="false">Cancelled</button>
                                                </li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-allorders" role="tabpanel" aria-labelledby="pills-allorders-tab" tabIndex="0">
                                            <div className="table-responsive">
                                                <table className="table table-bordered table-hover">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th scope="col">Order</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Customer</th>
                                                            <th scope="col">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">#3232</th>
                                                            <td>12/17/2023</td>
                                                            <td>Otto</td>
                                                            <td>
                                                                <span className="badge text-bg-warning">In Progress</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">#4443</th>
                                                            <td>12/10/2023</td>
                                                            <td>Thornton</td>
                                                            <td>
                                                                <span className="badge text-bg-success">Delivered</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">#3434</th>
                                                            <td>12/15/2023</td>
                                                            <td>Larry</td>
                                                            <td>
                                                                <span className="badge text-bg-danger">Cancelled</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-completedorders" role="tabpanel" aria-labelledby="pills-completedorders-tab" tabIndex="0">
                                            <div className="table-responsive">
                                                <table className="table table-bordered table-hover">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th scope="col">Order</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Customer</th>
                                                            <th scope="col">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">#3232</th>
                                                            <td>12/17/2023</td>
                                                            <td>Otto</td>
                                                            <td>
                                                                <span className="badge text-bg-success">Delivered</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">#4443</th>
                                                            <td>12/10/2023</td>
                                                            <td>Thornton</td>
                                                            <td>
                                                                <span className="badge text-bg-success">Delivered</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">#3434</th>
                                                            <td>12/15/2023</td>
                                                            <td>Larry</td>
                                                            <td>
                                                                <span className="badge text-bg-success">Delivered</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-inprogressorders" role="tabpanel" aria-labelledby="pills-inprogressorders-tab" tabIndex="0">
                                            <div className="table-responsive">
                                                <table className="table table-bordered table-hover">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th scope="col">Order</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Customer</th>
                                                            <th scope="col">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">#3232</th>
                                                            <td>12/17/2023</td>
                                                            <td>Otto</td>
                                                            <td>
                                                                <span className="badge text-bg-warning">In Progress</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">#4443</th>
                                                            <td>12/10/2023</td>
                                                            <td>Thornton</td>
                                                            <td>
                                                                <span className="badge text-bg-warning">In Progress</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">#3434</th>
                                                            <td>12/15/2023</td>
                                                            <td>Larry</td>
                                                            <td>
                                                                <span className="badge text-bg-warning">In Progress</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-cancelledorders" role="tabpanel" aria-labelledby="pills-cancelledorders-tab" tabIndex="0">
                                            <div className="table-responsive">
                                                <table className="table table-bordered table-hover">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th scope="col">Order</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Customer</th>
                                                            <th scope="col">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">#3232</th>
                                                            <td>12/17/2023</td>
                                                            <td>Otto</td>
                                                            <td>
                                                                <span className="badge text-bg-danger">Cancelled</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">#4443</th>
                                                            <td>12/10/2023</td>
                                                            <td>Thornton</td>
                                                            <td>
                                                                <span className="badge text-bg-danger">Cancelled</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">#3434</th>
                                                            <td>12/15/2023</td>
                                                            <td>Larry</td>
                                                            <td>
                                                                <span className="badge text-bg-danger">Cancelled</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="card shadow-sm">
                                <div className="card-body">


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
export default Dashboard;