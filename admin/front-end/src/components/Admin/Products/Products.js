import React,{useEffect, useState} from 'react'
import TopNav from '../../Layout/TopNav'
import Nav from '../../Layout/Nav'
import Footer from '../../Layout/Footer'
import {Link} from 'react-router-dom';
import axios from "axios";
import TopLoadingBar from '../../addons/TopLoadingBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListNormalProducts from './ListNormalProducts';
import ListBidProducts from './ListBidProducts';


export default function Products() {

  // State Variable for productType
  const [productType, setProductType] = useState("normal");

  //State variables for storing normal and bid products
  const [normalProducts, setNormalProducts] = useState([]);
  const [bidProducts, setBidProducts] = useState([]);

   // Fetch Products from Database
   useEffect(()=>{
    const fetchProducts = async () => {
      try{
        
        const result = await axios.get(`http://localhost:5000/api/getproducts/${productType}`);
        setNormalProducts(result.data);
        setBidProducts(result.data);
      }catch(error){
        toast.error(error.message);
      }
    }
    fetchProducts();
  });

 
  
  
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
                  <span>Product List</span>
                </h4>
              
              
              <div className="card p-1 shadow-sm mb-4">
                <div className="card-header border-bottom py-2">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex flex-column justify-content-center">
                      <div className="card-title">
                      <ul className="nav nav-pills shadow-sm bg-light" id="productTypeTab" role="tablist">

                        <li className="nav-item" role="presentation">
                          <button className="nav-link active"
                           id="normal-products" data-bs-toggle="tab"
                            data-bs-target="#normal-products-tab" type="button"
                             role="tab" aria-controls="normal-products-tab"
                              aria-selected="true" onClick={()=>setProductType("normal")}>Normal</button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link"
                           id="bid-products" data-bs-toggle="tab"
                            data-bs-target="#bid-products-tab" type="button"
                             role="tab" aria-controls="bid-products-tab"
                              aria-selected="false" onClick={()=>setProductType("bid")}>Bid</button>
                        </li>
                        
                      </ul>
                      </div>
                    </div>
                    <div className="d-flex align-content-center">
                      <Link to="/admin/addproduct">
                        <button type="button" className="btn btn-primary shadow">Add New Product</button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body">

                  
                <div className="tab-content" id="myTabContent">
                  {/* Normal Products  */}
                  <ListNormalProducts normalProducts={normalProducts} />

                  {/*  Bid Products */}
                  <ListBidProducts bidProducts={bidProducts}/>
                  
                </div>
                </div>
              </div>

            </div>
          </div>
          <ToastContainer />
          <Footer />
        </div>
      
      </div>
      
  )
}
