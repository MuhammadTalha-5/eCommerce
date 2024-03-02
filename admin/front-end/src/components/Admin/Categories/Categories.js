import React from 'react';
import TopNav from '../../Layout/TopNav';
import Nav from '../../Layout/Nav';
import Footer from '../../Layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TopLoadingBar from '../../addons/TopLoadingBar';
import AddNewCategory from './AddNewCategory';
import ListCategories from './ListCategories';
import EditCategories from './EditCategories';


export default function Categories() {

    /*  Adding state variables for editing data  */
    const [editData, setEditData] = React.useState(null);

  /* Creating states for Category Name & Description */
  const [categories, setCategories] = React.useState([]);

  
  return (
    
      <div id="wrapper">
        <Nav />
        <TopLoadingBar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopNav />
            <div className="container-fluid">
            <h4 className="py-3 mb-4">
                  <span className="text-muted fw-light">Products /</span>
                  <span>Categories</span>
                </h4>
              <div className="row mb-3">
                {/* Left Column */}
                <AddNewCategory setCategories = {setCategories} />
                {/* Left Column End */}

                {/* Right Column */}
                <ListCategories categories={categories} setCategories = {setCategories} setEditData={setEditData}/>
              </div>
              
            </div>
          </div>
          <ToastContainer />
          <Footer />
        </div>

        {/* Category Edit Modal  */}
          <EditCategories editData = {editData} setCategories = {setCategories} setEditData={setEditData}/>
      
      </div>
  )
}
