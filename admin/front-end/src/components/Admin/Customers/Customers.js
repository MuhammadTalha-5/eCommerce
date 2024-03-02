import React   from "react";
import Nav from "../../Layout/Nav";
import TopNav from "../../Layout/TopNav";

import Footer from "../../Layout/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopLoadingBar from "../../addons/TopLoadingBar";
import ListCustomers from "./ListCustomers";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

function Customers(){

  const [customers, setCustomers] = React.useState([]);

    

  /* Adding State Variable for editing customers */
  const [editData, setEditData] = React.useState("");


    return (
        <div id="wrapper">
            <Nav />
            <TopLoadingBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopNav />
                    <div className="container-fluid">
                        <h4 className="py-3 mb-4">
                            <span className="text-muted fw-light">Users / </span>
                            <span>Customers</span>
                        </h4>

                        {/* Customers */}
                        <ListCustomers customers={customers} setCustomers={setCustomers} setEditData={setEditData}/>
                        

                        {/* Offcanvas */}
                        <AddCustomer setCustomers={setCustomers} />
                    </div>
                </div>
                <ToastContainer />
                <Footer />
            </div>

            {/* Updating Customer Modal */}
            <EditCustomer editData={editData} setEditData={setEditData} setCustomers={setCustomers} />
        </div>
    );
}
export default Customers;