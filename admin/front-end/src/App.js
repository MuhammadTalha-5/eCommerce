import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import './App.css';

import Dashboard from "./components/Layout/Dashboard";
import Products from "./components/Admin/Products/Products";
import Addproduct from "./components/Admin/Products/Addproduct";
import Categories from "./components/Admin/Categories/Categories";
import Customers from "./components/Admin/Customers/Customers";
import Sellers from "./components/Admin/Sellers/Sellers";
import Login from "./components/Login";
import Orders from "./components/Admin/Orders";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Profile from "./components/Admin/Profile/Profile";

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Dashboard />}></Route>
        <Route path="/admin/products" element={<Products />}></Route>
        <Route path="/admin/addproduct" element={<Addproduct />}></Route>
        <Route path="/admin/categories" element={<Categories />}></Route>
        <Route path="/admin/customers" element={<Customers />}></Route>
        <Route path="/admin/sellers" element={<Sellers />}></Route>
        <Route path="admin/orders" element={<Orders />}></Route>
        <Route path="/admin/login" element={<Login />}></Route>
        <Route path="/admin/profile" element={<Profile />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;