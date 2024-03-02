import React from 'react'
import Footer from '../Layout/Footer'
import Nav from "../Layout/Nav";
import TopNav from "../Layout/TopNav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheckDouble, faWallet, faExclamation } from '@fortawesome/free-solid-svg-icons';
import TopLoadingBar from '../addons/TopLoadingBar';

function Orders() {
    
  return (
    <div id="wrapper">
        <Nav />
        <TopLoadingBar />
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <TopNav />

                <div className="container-fluid">
                    <h4 className="py-3 mb-4">
                        <span className="text-muted fw-light">Orders / </span>
                        <span>Orders List</span>
                    </h4>

                    {/* Orders List Widget */}
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <div className="row gy-4 gy-sm-1">
                            <div className="col-sm-6 col-lg-3">
                                <div className="d-flex justify-content-between align-items-start border-end pb-3 pb-sm-0">
                                    <div>
                                        <h3 className="mb-2">56</h3>
                                        <p className="mb-0">Pending Payment</p>
                                    </div>
                                    <div className="avatar me-sm-4">
                                        <span className="avatar-initial rounded bg-label-secondary">
                                        <FontAwesomeIcon icon={faClock} />
                                        </span>
                                    </div>
                                </div>
                                <hr className="d-none d-sm-block d-lg-none me-4" />
                            </div>
                            <div className="col-sm-6 col-lg-3">
                            <div className="d-flex justify-content-between align-items-start border-end pb-3 pb-sm-0">
                                    <div>
                                        <h3 className="mb-2">12,689</h3>
                                        <p className="mb-0">Completed</p>
                                    </div>
                                    <div className="avatar me-sm-4">
                                        <span className="avatar-initial rounded bg-label-secondary">
                                        <FontAwesomeIcon icon={faCheckDouble} />
                                        </span>
                                    </div>
                                </div>
                                <hr className="d-none d-sm-block d-lg-none me-4" />
                            </div>
                            <div className="col-sm-6 col-lg-3">
                            <div className="d-flex justify-content-between align-items-start border-end pb-3 pb-sm-0">
                                    <div>
                                        <h3 className="mb-2">124</h3>
                                        <p className="mb-0">Refunded</p>
                                    </div>
                                    <div className="avatar me-sm-4">
                                        <span className="avatar-initial rounded bg-label-secondary">
                                        <FontAwesomeIcon icon={faWallet} />
                                        </span>
                                    </div>
                                </div>
                                <hr className="d-none d-sm-block d-lg-none me-4" />
                            </div>
                            <div className="col-sm-6 col-lg-3">
                            <div className="d-flex justify-content-between align-items-start pb-3 pb-sm-0">
                                    <div>
                                        <h3 className="mb-2">34</h3>
                                        <p className="mb-0">Failed</p>
                                    </div>
                                    <div className="avatar me-sm-4">
                                        <span className="avatar-initial rounded bg-label-secondary">
                                        <FontAwesomeIcon icon={faExclamation} />
                                        </span>
                                    </div>
                                </div>
                                <hr className="d-none d-sm-block d-lg-none me-4" />
                            </div>
                            </div>
                        </div>
                    </div>

                    {/* Orders List Table */}
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <div className="table-responsive">
                                  <table className="table table-bordered table-hover">
                                      <thead className="table-dark">
                                          <tr>
                                              <th scope="col">Order</th>
                                              <th scope="col">Date</th>
                                              <th scope="col">Customer</th>
                                              <th scope="col">Payment</th>
                                              <th scope="col">Status</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr>
                                              <th scope="row">#3456</th>
                                              <td>12/17/2023</td>
                                              <td>Joe</td>
                                              <td>
                                                <span className="badge text-bg-warning">Pending</span>
                                              </td>
                                              <td>
                                                <span className="badge text-bg-success">Delivered</span>
                                              </td>
                                          </tr>
                                          <tr>
                                              <th scope="row">#2236</th>
                                              <td>6/17/2023</td>
                                              <td>Obbo</td>
                                              <td>
                                                <span className="badge text-bg-success">Paid</span>
                                              </td>
                                              <td>
                                                <span className="badge text-bg-success">Delivered</span>
                                              </td>
                                          </tr>
                                          <tr>
                                              <th scope="row">#3456</th>
                                              <td>12/17/2023</td>
                                              <td>Joe</td>
                                              <td>
                                                <span className="badge text-bg-danger">Pending</span>
                                              </td>
                                              <td>
                                                <span className="badge text-bg-primary">Dispatched</span>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    </div>
  )
}

export default Orders
