import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import axios from "axios";

function ListSellers({sellers, setSellers, setEditData}) {

    /*  READING SELLERS FROM DATABASE  */
    useEffect(()=>{
        const fetchSellers = async () =>{
            try{
                const response = await axios.get("http://localhost:5000/api/getsellers");
                setSellers(response.data);
            }catch(err){
                toast.error(err.message);
            }
        };
        fetchSellers();
    },[]);
    /* ----- READING SELLERS FROM DATABASE END -----  */

    

    /* DELETING SELLER  */
    const handleDelete = async(sellerId) =>{
        try{
            const response = await axios.delete(`http://localhost:5000/api/deleteseller/${sellerId}`);
            if (response.data.delSellerStatus === "success") {
                toast.success("Seller Deleted!")

                axios.get("http://localhost:5000/api/getsellers")
                    .then(sellers => setSellers(sellers.data))
                    .catch(err => toast.error(err.message))
            }
            else {
                toast.warn("Error Deleting Seller, Please Try Again Later");
            }
        }catch(err){
            toast.error(err.message)
        }
    }
    /* ---- DELETING SELLER END ---- */

  return (
      <div className="card p-2 shadow-sm mb-3">
          <div className="card-header border-bottom">
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                  <div className="d-flex flex-column justify-content-center">
                      <div className="card-title">
                          <h5 className="">Sellers</h5>
                      </div>
                  </div>
                  <div className="d-flex align-content-center">
                      <button className="btn btn-primary shadow" type="button"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRight"
                          aria-controls="offcanvasRight">Add Seller</button>
                  </div>
              </div>
          </div>
          <div className="card-body">
              {/* Sellers Table */}
              <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                      <thead className="table-dark">
                          <tr>
                              <th scope="col" style={{ width: "50px" }}>Seller ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Phone</th>
                              <th scope="col">Address</th>
                              <th scope="col">Business Name</th>
                              <th scope="col">Product Category</th>
                              <th>Registered At</th>
                              <th scope="col">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {sellers.length > 0 ? sellers.map(seller => (
                              <tr key={seller.vendorId}>
                                  <td>#{seller.vendorId}</td>
                                  <td>{seller.name}</td>
                                  <td>{seller.email}</td>
                                  <td>{seller.mobile}</td>
                                  <td>{seller.address}</td>
                                  <td>{seller.businessName}</td>
                                  <td>{seller.categoryName}</td>
                                  <td>
                                      {new Date(seller.createdAt).toLocaleDateString('en-US',
                                          {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                              hour: 'numeric',
                                              minute: 'numeric',
                                              hour12: true
                                          }
                                      )}
                                  </td>

                                  <td>
                                      <div className="d-flex justify-content-center align-items-center">
                                          <button type="submit" className="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#editModal"
                                              onClick={() => setEditData(seller)}>
                                              <FontAwesomeIcon icon={faPenToSquare} />
                                          </button>
                                          <button type="submit" className="btn btn-danger btn-sm mx-2"
                                              onClick={() => handleDelete(seller.vendorId)}>
                                              <FontAwesomeIcon icon={faTrash} />
                                          </button>
                                      </div>
                                  </td>
                              </tr>
                          )) : (
                              <tr>
                                  <td colSpan="9" className="mt-2 text-center"><span>No Sellers Found</span></td>
                              </tr>
                          )}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  )
}

export default ListSellers
