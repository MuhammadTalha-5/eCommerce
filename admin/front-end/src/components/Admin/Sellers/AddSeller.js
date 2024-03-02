import React,{useEffect} from 'react';
import { toast } from 'react-toastify';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function AddSeller({setCategories,setSellers,categories}) {

    
    /* Check password Match  */
    const [passwordType, setPasswordType] = React.useState("password");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");

    /* State Variables for adding new seller */
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [mobile, setMobile] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [businessName, setBusinessName] = React.useState("");
    const [businessDetails, setBusinessDetails] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("");



    
    const handlePasswordChange = (e) =>{
        setPasswordError("");
        setConfirmPassword("");
        if (confirmPassword !== "" && e.target.value !== confirmPassword) {
            setPasswordError("Passwords do not match");
          } else {
            setPasswordError("");
          }
    }
    const handlePasswordMatch = (e) =>{
        setConfirmPassword(e.target.value);
        if (password !== e.target.value){
            setPasswordError("Passwords do not match")
        }
        else{
            setPasswordError("")
        }
    }
    const togglePassword = () => {
        if(passwordType==="password"){
            setPasswordType("text")
        }
        else{
            setPasswordType("password")
        }
    }
     /* ------- Check password Match End ------ */


     /* Fetching Categories from db.categories  */
     useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get("http://localhost:5000/api/getcategories");
            setCategories(response.data);
          } catch (error) {
            toast.error(error.message)
          }
        };
      
        fetchCategories();
      });


      /*  Handle Change in Selected Categories */
      const handleCategoryChange = (e) =>{
        const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
      option.value
    );
    setSelectedCategory(selectedOptions);
      }

      
      /*  ADDING NEW SELLER  */
    const handleAddSeller = async (e) =>{
        e.preventDefault();
        if(name==="" || email==="" || mobile === "" || address === "" || password === "" || businessName === "" || businessDetails === "" || selectedCategory === ""){
            toast.error("Please fill out the form")
        }
        if(password !== confirmPassword){
            toast.error("Passwords do not match")
        }
        else{
            try{
                const result = await axios.post("http://localhost:5000/api/addseller",{
                    name: name,
                    email: email,
                    mobile: mobile,
                    address: address,
                    password: password,
                    businessName: businessName,
                    businessDetails: businessDetails,
                    selectedCategory: selectedCategory,
                });

                if(result.data.addSellerStatus === "504"){
                    toast.error("Error adding Seller");
                }
                else if(result.data.addSellerStatus === "present"){
                    toast.error("Seller with same email exist");
                }
                else if(result.data.addSellerStatus === "500"){
                    toast.error("Failed to add Seller");
                }
                else{
                    toast.success("New Seller Added!");

                    axios.get("http://localhost:5000/api/getsellers")
                        .then(sellers => setSellers(sellers.data))
                        .catch(err => toast.error(err.message))

                    setName("")
                    setEmail("")
                    setMobile("")
                    setAddress("")
                    setPassword("")
                    setConfirmPassword("")
                    setBusinessName("")
                    setBusinessDetails("")
                    setSelectedCategory("")
                    
                }

            }catch(err){
                toast.error(err.message);
            }
        }
    }
    /* ---- ADDING NEW SELLER END ----  */


    /* Handle Offcanvas Cancel / Discard Button  */
    const handleCancel = () =>{
        setName("")
        setEmail("")
        setMobile("")
        setAddress("")
        setPassword("")
        setConfirmPassword("")
        setBusinessName("")
        setBusinessDetails("")
        setSelectedCategory("")
        setPasswordError("")
    }

  return (
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasRightLabel">Add Seller</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
                  onClick={() => handleCancel()}></button>
          </div>
          <div className="offcanvas-body">
              {/* Adding New Seller Form */}
              <form id="sellerAddForm">

                  {/* Basic Information */}
                  <div className="mb-3 sellerBasicInfo">
                      <h6 className="mb-3">Basic Information</h6>
                      <div className="mb-3">
                          <label htmlFor="sellerName" className="form-label">Name</label>
                          <input type="text" className="form-control" name="sellerName" id="sellerName"
                              onChange={(e) => setName(e.target.value)} value={name} />

                      </div>
                      <div className="mb-3">
                          <label htmlFor="sellerEmail" className="form-label">Email</label>
                          <input type="email" className="form-control" name="sellerEmail" id="sellerEmail"
                              onChange={(e) => setEmail(e.target.value)} value={email} />

                      </div>
                      <div className="mb-3">
                          <label htmlFor="sellerMobile" className="form-label">Mobile</label>
                          <input type="text" className="form-control" name="sellerMobile" placeholder="(+92) 312 3456789" id="sellerMobile"
                              onChange={(e) => setMobile(e.target.value)} value={mobile} />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="sellerAddress" className="form-label">Address</label>
                          <textarea className="form-control" name="sellerAddress" id="sellerAddress" rows="3"
                              onChange={(e) => setAddress(e.target.value)} value={address} />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="sellerPassword" className="form-label">Password</label>
                          <div className="input-group">
                              <input type={passwordType}
                                  onChange={(e) => {
                                      handlePasswordChange(e);
                                      setPassword(e.target.value);
                                  }}
                                  value={password}
                                  className="form-control"
                                  name="sellerPassword"
                                  id="sellerPassword"

                                  required />
                              <div className="input-group-btn">
                                  <button type="button"
                                      onClick={togglePassword}
                                      className="btn btn-outline-dark">
                                      {passwordType === "password" ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                  </button>
                              </div>
                          </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="mb-3">
                          <label htmlFor="sellerPassword" className="form-label">Confirm Password</label>

                          <input type="password"
                              onChange={handlePasswordMatch}
                              value={confirmPassword}
                              className="form-control"
                              name="sellerPasswordConfirm"
                              id="sellerPassowrdConfirm" required />
                          <div className="passwordError">
                              {passwordError}
                          </div>
                      </div>

                  </div>

                  {/* Business Information */}
                  <div className="mb-3 customerShippingInfo">
                      <h6 className="mb-3">Business Information</h6>
                      <div className="mb-3">
                          <label htmlFor="businessName" className="form-label">Business Name</label>
                          <input type="text" className="form-control" name="businessName" id="businessName"
                              onChange={(e) => setBusinessName(e.target.value)} value={businessName} />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="businessDetails" className="form-label">Business Details</label>
                          <textarea className="form-control" name="businessDetails" id="businessDetails" rows="3"
                              onChange={(e) => setBusinessDetails(e.target.value)} value={businessDetails} />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="productCategories" className="form-label">Product Category</label>
                          <select className="form-select" name="productCategories" id="productCategories" aria-label="Seller Product Categories Select"
                              onChange={handleCategoryChange} value={selectedCategory}>
                              <option value="">Select Category</option>
                              {categories.map((category) =>
                                  <option key={category.categoryId} value={category.categoryId}
                                  >{category.categoryName}</option>
                              )}
                          </select>
                      </div>

                  </div>
                  <div className="mb-2">
                      <button type="submit" className="btn btn-primary"
                          onClick={handleAddSeller}>Add</button>
                      <button type="button" className="btn btn-outline-danger mx-2" data-bs-dismiss="offcanvas" aria-label="Close"
                          onClick={() => handleCancel()}>Discard</button>
                  </div>
              </form>
          </div>
      </div>
  )
}

export default AddSeller
