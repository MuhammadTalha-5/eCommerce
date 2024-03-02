import React,{useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from 'react-toastify';

function ListCustomers({customers, setCustomers, setEditData}) {
    
  /*  Loading the customers table  */
  useEffect(()=>{
    const fetchCustomers = async () =>{
        try{
            const response = await axios.get("http://localhost:5000/api/getcustomers");
            setCustomers(response.data);
        }catch(err){
            toast.warn(err.message);
        }
    };
    fetchCustomers();
  });
  /* -------- Loading the customers table End -------   */


 /*  Deleting Customer */
 const handleDelete = async (customerId) =>{
    try{
        const response = await axios.delete(`http://localhost:5000/api/deletecustomer/${customerId}`);
        if(response.data.delCustStatus === "success"){
            toast.success("Customer Deleted!");

            axios.get("http://localhost:5000/api/getcustomers")
             .then(customers => setCustomers(customers.data))
             .catch(err => toast.error(err))
        }
        else{
            toast.error("Error deleting customer")
        }
    }catch(err){
        toast.error(err.message)
    }
  }

  return (
      <div className="card p-2 shadow-sm mb-3">
          <div className="card-header border-bottom">
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                  <div className="d-flex flex-column justify-content-center">
                      <div className="card-title">
                          <h5 className="">Customers</h5>
                      </div>
                  </div>
                  <div className="d-flex align-content-center">
                      <button className="btn btn-primary shadow" type="button"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRight"
                          aria-controls="offcanvasRight">Add Customer</button>
                  </div>
              </div>
          </div>
          <div className="card-body">
              {/* Customers Table */}
              <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                      <thead className="table-dark">
                          <tr>
                              <th scope="col" style={{ width: "50px" }}>Customer ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Phone</th>
                              <th scope="col">Address</th>
                              <th scope="col">City</th>
                              <th scope="col">Registered At</th>
                              <th scope="col">Action</th>
                          </tr>
                      </thead>
                      <tbody>

                          {customers.length > 0 ? customers.map(customer => (
                              <tr key={customer.customerId}>
                                  <td>#{customer.customerId}</td>
                                  <td>{customer.name}</td>
                                  <td>{customer.email}</td>
                                  <td>{customer.mobile}</td>
                                  <td>{customer.shippingaddress}</td>
                                  <td>{customer.city}</td>
                                  <td>{new Date(customer.createdAt).toLocaleDateString('en-US',
                                      {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                          hour: 'numeric',
                                          minute: 'numeric',
                                          hour12: true
                                      }
                                  )}</td>
                                  <td>
                                      <div className="d-flex justify-content-between align-items-center m-2">
                                          <button type="submit" className="btn btn-info btn-sm"
                                              data-bs-toggle="modal" data-bs-target="#editModal"
                                              onClick={() =>
                                                  setEditData(customer)
                                              }>
                                              <FontAwesomeIcon icon={faPenToSquare} />
                                          </button>
                                          <button type="submit" className="btn btn-danger btn-sm mx-2"
                                              onClick={() => handleDelete(customer.customerId)}>
                                              <FontAwesomeIcon icon={faTrash} />
                                          </button>
                                      </div>
                                  </td>
                              </tr>
                          )) : (
                              <tr>
                                  <td colSpan="7" className="mt-2 text-center"><span>No Customers Found</span></td>
                              </tr>
                          )}

                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  )
}

export default ListCustomers
