import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

function TopNav(){
    return (
        <div>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top ">

               {/*}
                <form
                    className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                            aria-label="Search" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-dark" type="button">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </div>
                    </div>
                </form>
                {*/}
                
                <ul className="navbar-nav ml-auto">

                    <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="/" id="alertsDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FontAwesomeIcon icon={faBell} />
                           
                            <span className="badge badge-danger badge-counter">3+</span>
                        </a>
                       
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="alertsDropdown">
                            <h6 className="dropdown-header">
                                Alerts Center
                            </h6>
                            <a className="dropdown-item d-flex align-items-center" href="/">
                                <div className="mr-3">
                                    <div className="icon-circle bg-primary">
                                        <i className="fas fa-file-alt text-white"></i>
                                    </div>
                                </div>
                                <div>
                                    <div className="small text-gray-500">December 12, 2019</div>
                                    <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                </div>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="/">
                                <div className="mr-3">
                                    <div className="icon-circle bg-success">
                                        <i className="fas fa-donate text-white"></i>
                                    </div>
                                </div>
                                <div>
                                    <div className="small text-gray-500">December 7, 2019</div>
                                    $290.29 has been deposited into your account!
                                </div>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="/">
                                <div className="mr-3">
                                    <div className="icon-circle bg-warning">
                                        <i className="fas fa-exclamation-triangle text-white"></i>
                                    </div>
                                </div>
                                <div>
                                    <div className="small text-gray-500">December 2, 2019</div>
                                    Spending Alert: We've noticed unusually high spending for your account.
                                </div>
                            </a>
                            <a className="dropdown-item text-center small text-gray-500" href="/">Show All Alerts</a>
                        </div>
                    </li>

                   
                    <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="/" id="messagesDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FontAwesomeIcon icon={faEnvelope} />
                        
                            <span className="badge badge-danger badge-counter">7</span>
                        </a>
                        
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="messagesDropdown">
                            <h6 className="dropdown-header">
                                Message Center
                            </h6>
                            <a className="dropdown-item d-flex align-items-center" href="/">
                                <div className="dropdown-list-image mr-3">
                                    <img className="rounded-circle" src="img/undraw_profile_1.svg"
                                        alt="..." />
                                        <div className="status-indicator bg-success"></div>
                                </div>
                                <div className="font-weight-bold">
                                    <div className="text-truncate">Hi there! I am wondering if you can help me with a
                                        problem I've been having.</div>
                                    <div className="small text-gray-500">Emily Fowler · 58m</div>
                                </div>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="/">
                                <div className="dropdown-list-image mr-3">
                                    <img className="rounded-circle" src="img/undraw_profile_2.svg"
                                        alt="..." />
                                        <div className="status-indicator"></div>
                                </div>
                                <div>
                                    <div className="text-truncate">I have the photos that you ordered last month, how
                                        would you like them sent to you?</div>
                                    <div className="small text-gray-500">Jae Chun · 1d</div>
                                </div>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="/">
                                <div className="dropdown-list-image mr-3">
                                    <img className="rounded-circle" src="img/undraw_profile_3.svg"
                                        alt="..." />
                                        <div className="status-indicator bg-warning"></div>
                                </div>
                                <div>
                                    <div className="text-truncate">Last month's report looks great, I am very happy with
                                        the progress so far, keep up the good work!</div>
                                    <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                </div>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="/">
                                <div className="dropdown-list-image mr-3">
                                    <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                        alt="..." />
                                        <div className="status-indicator bg-success"></div>
                                </div>
                                <div>
                                    <div className="text-truncate">Am I a good boy? The reason I ask is because someone
                                        told me that people say this to all dogs, even if they aren't good...</div>
                                    <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                </div>
                            </a>
                            <a className="dropdown-item text-center small text-gray-500" href="/">Read More Messages</a>
                        </div>
                    </li>

                    <div className="topbar-divider d-none d-sm-block"></div>

                    <li className="nav-item dropdown-center">
                        <button className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="mx-2 d-none d-lg-inline text-gray-600 small">Muhammad Talha</span>
                                <FontAwesomeIcon icon={faUser} className="border rounded-circle p-2" />
                        </button>
                        <ul className="dropdown-menu animated--grow-in">
                            <li><Link className="dropdown-item" to="/admin/profile">Profile</Link></li>
                            <li><a className="dropdown-item" href="/">Settings</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="/" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Logout</a></li>
                        </ul>
                    </li>

                </ul>

            </nav>

            
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Are you sure you want to log out?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            By logging out, you'll be signed out of your account.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <a href="/admin/login" type="button" className="btn btn-primary">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopNav;