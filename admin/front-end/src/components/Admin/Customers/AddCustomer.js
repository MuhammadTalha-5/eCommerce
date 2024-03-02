import React from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

function AddCustomer({setCustomers}) {

    /*  State variables for adding new customer  */
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [city, setCity] = React.useState("");
  const [postcode, setPostCode] = React.useState("");
  const [country, setCountry] = React.useState("");


    /* Adding New Customers  */
  const handleAddCustomer = async (e) => {
    e.preventDefault();
  
    if (name === "" || email === "" || password === "" || mobile === "" || address1 === "" || province === "" || city === "" || postcode === "" || country === "") {
      toast.error("Please fill out the form");
    } else {
      let address = `${address1} ${address2}`;
  
      try {
        const result = await axios.post("http://localhost:5000/api/addcustomer", {
          name: name,
          email: email,
          password: password,
          mobile: mobile,
          address: address,
          province: province,
          city: city,
          postcode: postcode,
          country: country,
        });
        
        if (result.data.addCustStatus === "504") {
          toast.warn("Error adding Customer");
        } else if (result.data.addCustStatus === "present") {
          toast.error("Customer with same email exist");
        } else {
          toast.success("New Customer Added!");
          setName("")
          setEmail("")
          setPassword("")
          setMobile("")
          setAddress1("")
          setAddress2("")
          setProvince("")
          setCity("")
          setPostCode("")
          setCountry("")

          /* Updating the table after adding new customer  */
          axios.get("http://localhost:5000/api/getcustomers")
            .then(customers => setCustomers(customers.data))
            .catch(err => toast.error(err))
        }
      } catch (error) {
        toast.error("An error occurred while adding the customer.");
      }
    }
  };
  /*  ------------- Adding New Customer End -------------  */

  return (
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasRightLabel">Add Customer</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
              {/* Adding New Customer Form */}
              <form onSubmit={handleAddCustomer} id="customerAddForm">

                  {/* Basic Information */}
                  <div className="mb-3 customerBasicInfo">
                      <h6 className="mb-3">Basic Information</h6>
                      <div className="mb-3">
                          <label htmlFor="customerName" className="form-label">Name</label>
                          <input type="text" className="form-control" name="customerName" id="customerName"
                              onChange={e => setName(e.target.value)} value={name} required />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="customerEmail" className="form-label">Email</label>
                          <input type="email" className="form-control" name="customerEmail" id="customerEmail"
                              onChange={e => setEmail(e.target.value)} value={email} required />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="customerPassword" className="form-label">Password</label>
                          <input type="password" className="form-control" name="customerPassword" id="customerPassword"
                              onChange={e => setPassword(e.target.value)} value={password} required />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="customerMobile" className="form-label">Mobile</label>
                          <input type="text" className="form-control" name="customerMobile" placeholder="(+92) 312 3456789" id="customerMobile"
                              onChange={e => setMobile(e.target.value)} value={mobile} />
                      </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="mb-3 customerShippingInfo">
                      <h6 className="mb-3">Shipping Information</h6>
                      <div className="mb-3">
                          <label htmlFor="customerAddress1" className="form-label">Address Line 1</label>
                          <input type="text" className="form-control" name="customerAddress1" id="customerAddress1"
                              onChange={e => setAddress1(e.target.value)} value={address1} />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="customerAddress2" className="form-label">Address Line 2</label>
                          <input type="text" className="form-control" name="customerAddress2" id="customerAddress2"
                              onChange={e => setAddress2(e.target.value)} value={address2} />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="customerProvince" className="form-label">State/Province</label>
                          <select className="form-select" name="customerProvince" id="customerProvince" aria-label="Customer Province Select"
                              onChange={e => setProvince(e.target.value)} value={province}>
                              <option value="">Select Province</option>
                              <option value="Balochistan">Balochistan</option>
                              <option value="Punjab">Punjab</option>
                              <option value="Sindh">Sindh</option>
                              <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                              <option value="Gilgit Baltistan">Gilgit Baltistan</option>
                              <option value="Azad Kashmir">Azad Kashmir</option>
                          </select>
                      </div>
                      <div className="row mb-3">
                          <div className="col-12 col-sm-6">
                              <label htmlFor="customerCity" className="form-label">City</label>
                              <input type="text" className="form-control" name="customerCity" id="customerCity"
                                  onChange={e => setCity(e.target.value)} value={city} />
                          </div>
                          <div className="col-12 col-sm-6">
                              <label htmlFor="postcode" className="form-label">Post Code</label>
                              <input type="text" className="form-control" name="postcode" id="postcode"
                                  onChange={e => setPostCode(e.target.value)} value={postcode} />
                          </div>
                      </div>
                      <div className="mb-3">
                          <label htmlFor="customerCountry" className="form-label">Country</label>
                          <select className="form-select" aria-label="customer country select" name="country" id="customerCountry"
                              onChange={e => setCountry(e.target.value)} value={country}>
                              <option value="">Select Country</option>
                              <option value="Pakistan">Pakistan</option>
                          </select>
                      </div>
                  </div>
                  <div className="mb-2">
                      <button type="submit" className="btn btn-primary">Add</button>

                      <button type="button" className="btn btn-outline-danger mx-2" data-bs-dismiss="offcanvas" aria-label="Close">Discard</button>

                  </div>
              </form>
          </div>
      </div>
  )
}

export default AddCustomer
