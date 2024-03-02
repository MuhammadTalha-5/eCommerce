import React from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

function EditCustomer({editData, setEditData, setCustomers}) {
    /* Adding State variable for old password and new password for editing customer */
  const [editOldPassword,setEditOldPassword] = React.useState("");
  const [editNewPassword, setEditNewPassword] = React.useState("");


  /* Update Customer  */
  const handleEdit = async () => {
    if (editData.name === "" || editData.email === "" || editData.mobile === "" || editData.shippingaddress === "" || editData.province === "" || editData.city === "" || editData.postcode === "") {
        toast.error("Please fill out the form");
    }
    
    else{
    let result = await axios.put(`http://localhost:5000/api/updatecustomer/${editData.customerId}`,{
        name : editData.name,
        email: editData.email,
        OldPassword: editOldPassword,
        NewPassword: editNewPassword,
        mobile: editData.mobile,
        shippingaddress: editData.shippingaddress,
        province: editData.province,
        city: editData.city,
        postcode: editData.postcode
    });

    if(result.upCustStatus === "504"){
        toast.warn("Error Updating Customer, 504")
    }
    else{
        toast.success("Customer Updated!")
        axios.get("http://localhost:5000/api/getcustomers")
             .then(customers => setCustomers(customers.data))
             .catch(err => toast.error(err))
    }
  }
  }

  const handleModalCancel = ()=>{
    setEditOldPassword("");
    setEditNewPassword("");
  }

  return (
      <div className="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
              <div className="modal-content">
                  <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Customer</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                          onClick={handleModalCancel}></button>
                  </div>
                  <div className="modal-body">
                      <form>
                          <div className="row">
                              <div className="col-12 col-md-6">
                                  <h6 className="mb-2">Basic Information</h6>
                                  <div className="mb-2">
                                      <label htmlFor="editCustName" className="form-label">Name</label>
                                      <input type="text" className="form-control" name="editCustName" id="editCustName"
                                          value={editData?.name || ""}
                                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                      />
                                  </div>
                                  <div className="mb-2">
                                      <label htmlFor="editCustEmail" className="form-label">Email</label>
                                      <input type="email" className="form-control" name="editCustEmail" id="editCustEmail"
                                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                          value={editData?.email || ""} />
                                  </div>
                                  <div className="mb-2">
                                      <label htmlFor="editOldPassword" className="form-label">Old Password</label>
                                      <input type="password" className="form-control" name="editOldPassword" id="editOldPassword"
                                          onChange={(e) => setEditOldPassword(e.target.value)}
                                          value={editOldPassword} />
                                  </div>
                                  <div className="mb-2">
                                      <label htmlFor="editCustPassword" className="form-label">New Password</label>
                                      <input type="password" className="form-control" name="editCustPassword" id="editCustPassword"
                                          onChange={(e) => setEditNewPassword(e.target.value)}
                                          value={editNewPassword} />
                                  </div>
                                  <div className="mb-2">
                                      <label htmlFor="editCustMobile" className="form-label">Mobile</label>
                                      <input type="text" className="form-control" name="editCustMobile" id="editCustMobile"
                                          onChange={(e) => setEditData({ ...editData, mobile: e.target.value })}
                                          value={editData?.mobile || ""} />
                                  </div>
                              </div>
                              <div className="col-12 col-md-6">
                                  <h6 className="mb-2">Shipping Information</h6>
                                  <div className="mb-2">
                                      <label htmlFor="editCustAddress" className="form-label">Address</label>
                                      <input type="text" className="form-control" name="editCustAddress" id="editCustAddress"
                                          onChange={(e) => setEditData({ ...editData, shippingaddress: e.target.value })}
                                          value={editData?.shippingaddress || ""} />
                                  </div>
                                  <div className="mb-2">
                                      <label htmlFor="editCustProvince" className="form-label">State/Province</label>
                                      <select className="form-select" name="editCustProvince" id="editCustProvince"
                                          onChange={(e) => setEditData({ ...editData, province: e.target.value })}
                                          value={editData?.province || ""}>
                                          <option value="">Select Province</option>
                                          <option value="Balochistan">Balochistan</option>
                                          <option value="Punjab">Punjab</option>
                                          <option value="Sindh">Sindh</option>
                                          <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                                          <option value="Gilgit Baltistan">Gilgit Baltistan</option>
                                          <option value="Azad Kashmir">Azad Kashmir</option>
                                      </select>
                                  </div>

                                  <div className="mb-2">
                                      <label htmlFor="editCustCity" className="form-label">City</label>
                                      <input type="text" className="form-control" name="editCustCity" id="editCustCity"
                                          onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                                          value={editData?.city || ""} />
                                  </div>
                                  <div className="mb-2">
                                      <label htmlFor="editPostCode" className="form-label">Post Code</label>
                                      <input type="text" className="form-control" name="editPostCode" id="editPostCode"
                                          onChange={(e) => setEditData({ ...editData, postcode: e.target.value })}
                                          value={editData?.postcode || ""} />
                                  </div>

                              </div>
                          </div>
                      </form>
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                          onClick={handleModalCancel}>Cancel</button>
                      <button type="button" className="btn btn-primary"
                          onClick={handleEdit}>Save changes</button>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default EditCustomer
