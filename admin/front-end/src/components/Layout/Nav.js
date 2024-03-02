import React from 'react';
import {Link} from "react-router-dom";
import {
    CDBSidebar,
    CDBSidebarHeader,
    CDBSidebarMenuItem,
    CDBSidebarContent,
    CDBSidebarMenu,
  } from 'cdbreact';



function Nav() {
  

  return (
    <div>
    
      <CDBSidebar textColor="#333" backgroundColor="#f0f0f0" height="100%" className="shadow">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
              <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
                  
                  <h6 className="ms-2 text-uppercase">PakShopNow<br/>
                  <span className="text-primary"><b>Admin</b></span>
                  </h6>
                  
              </div>
          </CDBSidebarHeader>
          <CDBSidebarContent>
              <CDBSidebarMenu>

                  <Link to="/admin"
                  data-bs-toggle="tooltip" data-bs-title="Default tooltip" data-bs-placement="right"
                  >
                    <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
                  </Link>
                  

                  <div className="menu-divider"></div>
                  <h5 className="sidebar-divider-title">Products</h5>

                  <Link to="/admin/products">
                    <CDBSidebarMenuItem icon="tag">Products</CDBSidebarMenuItem>
                  </Link>
                  

                  <Link to="/admin/addproduct">
                    <CDBSidebarMenuItem icon="plus">Add Product</CDBSidebarMenuItem>
                  </Link>

                  <Link to="/admin/categories">
                    <CDBSidebarMenuItem icon="table">Categories</CDBSidebarMenuItem>
                  </Link>

                  <div className="menu-divider"></div>
                  <h5 className="sidebar-divider-title">Users</h5>
                  
                  <Link to="/admin/customers">
                    <CDBSidebarMenuItem icon="users">Customers</CDBSidebarMenuItem>
                  </Link>
                  <Link to="/admin/sellers">
                    <CDBSidebarMenuItem icon="store">Sellers</CDBSidebarMenuItem>
                  </Link>

                  <div className="menu-divider"></div>
                  <h5 className="sidebar-divider-title">Orders</h5>
                  <Link to="/admin/orders">
                    <CDBSidebarMenuItem icon="shopping-cart">Orders List
                    <span className="badge text-bg-danger mx-2">3</span>
                    </CDBSidebarMenuItem>
                  </Link>
                  
              </CDBSidebarMenu>
          </CDBSidebarContent>
         
      </CDBSidebar>
      </div>
  )
}

export default Nav
