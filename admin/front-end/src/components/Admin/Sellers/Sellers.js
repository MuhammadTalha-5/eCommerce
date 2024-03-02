import React   from "react";
import Nav from "../../Layout/Nav";
import TopNav from "../../Layout/TopNav";
import Footer from "../../Layout/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopLoadingBar from "../../addons/TopLoadingBar";
import ListSellers from "./ListSellers";
import EditSeller from "./EditSeller";
import AddSeller from "./AddSeller";


function Sellers() {

    /* State Variable for Categories  */
    const [categories, setCategories] = React.useState([]);

    const [sellers, setSellers] = React.useState([]);


    /* State Variables for Editing Seller  */
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
                            <span>Sellers</span>
                        </h4>
                        {/* Sellers */}
                        <ListSellers sellers={sellers} setSellers={setSellers} setEditData={setEditData} />
                        

                        {/* Offcanvas */}
                        <AddSeller categories={categories} setCategories={setCategories} setSellers={setSellers} />
                        
                    </div>
                </div>
                <ToastContainer />
                <Footer />
            </div>

            

            {/*  EDIT SELLER MODAL */}
          <EditSeller editData={editData} setEditData={setEditData} categories={categories} setSellers={setSellers} />


        </div>
  )
}

export default Sellers;
