import React from 'react';
import { toast } from 'react-toastify';
import axios from "axios";
import { TailSpin } from 'react-loader-spinner';

function EditSeller({editData, setEditData, categories, setSellers}) {
    /* State variable for loading icon  */
    const [loading, setLoading] = React.useState(false);
    
    const handleEdit = async () => {
        try{
            setLoading(true);
            if(editData.name==="" || editData.email==="" || editData.mobile === "" || editData.address === "" || editData.businessName === "" || editData.businessDetails === "" || editData.categoryId === ""){
                toast.error("Please fill out the form")
            }
            else{
                let result = await axios.put(`http://localhost:5000/api/updateseller/${editData.vendorId}`,{
                    name: editData.name,
                    email: editData.email,
                    mobile: editData.mobile,
                    address: editData.address,
                    businessName: editData.businessName,
                    businessDetails: editData.businessDetails,
                    selectedCategory: editData.categoryId,
                });
                if(result.data.upSellerStatus === "504"){
                    toast.error("Error updating seller")
                }
                if(result.data.upSellerStatus === "present"){
                    toast.error("Seller with same email exist")
                }
                else{
                    setTimeout(() => {
                        setLoading(false); // set loading state back to false after 2 seconds
                        toast.success("Seller Updated!")
                      }, 2000);
                    
                    

                    const response = await axios.get("http://localhost:5000/api/getsellers");
                    setSellers(response.data);
                }
            }
        }catch(err){
            toast.error(err.message)
        }
    }
  return (
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
              <div className="modal-content">
                  <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Seller</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">

                      <div className="row">
                          <div className="col-12 col-md-6">
                              <h6 className="mb-2">Basic Information</h6>
                              <div className="mb-2">
                                  <label htmlFor="name" className="form-label">Name</label>
                                  <input type="text" className="form-control" name="name" id="name"
                                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                      value={editData?.name || ""} />
                              </div>
                              <div className="mb-2">
                                  <label htmlFor="email" className="form-label">Email</label>
                                  <input type="email" className="form-control" name="email" id="email"
                                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                      value={editData?.email || ""} />
                              </div>
                              <div className="mb-2">
                                  <label htmlFor="mobile" className="form-label">Mobile</label>
                                  <input type="text" className="form-control" name="mobile" id="mobile"
                                      onChange={(e) => setEditData({ ...editData, mobile: e.target.value })}
                                      value={editData?.mobile || ""} />
                              </div>
                              <div className="mb-2">
                                  <label htmlFor="address" className="form-label">Address</label>
                                  <textarea className="form-control" name="address" id="address" rows="3"
                                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                                      value={editData?.address || ""}></textarea>
                              </div>
                          </div>
                          <div className="col-12 col-md-6">
                              <h6 className="mb-2">Business Information</h6>
                              <div className="mb-2">
                                  <label htmlFor="EditbusinessName" className="form-label">Business Name</label>
                                  <input type="text" className="form-control" name="businessName" id="EditbusinessName"
                                      onChange={(e) => setEditData({ ...editData, businessName: e.target.value })}
                                      value={editData?.businessName || ""} />
                              </div>

                              <div className="mb-2">
                                  <label htmlFor="EditbusinessDetails" className="form-label">Business Details</label>
                                  <textarea className="form-control" name="businessDetails" id="EditbusinessDetails" rows="3"
                                      onChange={(e) => setEditData({ ...editData, businessDetails: e.target.value })}
                                      value={editData?.businessDetails || ""}></textarea>
                              </div>
                              <div className="mb-2">
                                  <label htmlFor="productCategory" className="form-label">Product Category</label>
                                  <select className="form-select" name="productCategory" id="productCategory"
                                      onChange={(e) => setEditData({ ...editData, categoryId: e.target.value })}
                                      value={editData?.categoryId || ""}>
                                      <option value="">Select Category</option>
                                      {categories.map((category) =>
                                          <option key={category.categoryId} value={category.categoryId}
                                          >{category.categoryName}</option>
                                      )}
                                  </select>
                              </div>
                          </div>
                      </div>

                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary text-light" disabled={loading}
                          onClick={handleEdit}>
                          {loading ? <TailSpin visible={true} height="18" width="18" color="#ffffff" /> : "Save Changes"}
                      </button>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default EditSeller
