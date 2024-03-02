import React,{useState} from 'react';
import { toast } from 'react-toastify';
import axios from "axios";


function InputForm({setProfileData}) {
    //State variable for selected profile image
    const [selectedImage, setSelectedImage] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("")

    //Function to show selected picture
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file)
        
        //Check if file is selected
        if(file){
            const reader = new FileReader();

            //Setup a callback function to run when the image is loaded
            reader.onload = (event) => {
                setSelectedImage(event.target.result);
            };

            // Read the image as data URL
            reader.readAsDataURL(file);
        }else{
            //Handle case when no file is selected
            setSelectedImage("");
        }
    }
   

    const handleSave = async (e) => {
        e.preventDefault();
        try{
            
            if (!firstName || !lastName || !email || !mobile){
                toast.error("Please fill out the form")
            }
            else{
                
            const formData = new FormData();
            formData.append("firstName",firstName);
            formData.append("lastName",lastName);
            formData.append("email",email);
            formData.append("mobile",mobile);

            const fileInput = document.getElementById('profileImage');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                formData.append("profileImage", file);

            const config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              };
            const response = await axios.post("http://localhost:5000/api/updateprofile",formData, config);
                // Check response and show notifications
                if (response.data.profileUpdate === "Success") {

                    toast.success("Profile updated successfully");
                
                    const result = await axios.get("http://localhost:5000/api/getadmin");
                    setProfileData(result.data);

                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setMobile("");
                    setSelectedImage("")
                    fileInput.value = "";
                    
                } else {
                    toast.error("Failed to update profile");
                }
            }else{
                toast.error("Please select a profile picture");
            }
            }
        }catch(error){
            toast.error(error.message)
        }
    }

  return (
      <div className="col-12 col-sm-8">
          <div className="card shadow-sm">
              <div className="card-header">
                  <h6 className="card-title mb-0">Edit Profile</h6>
              </div>
              <form encType='multipart/form-data'>
              <div className="card-body">
                  <div className="row">
                      <div className="col-12 col-sm-6">
                          <div className="mb-3">
                            
                              <label htmlFor="profileImage" className="form-label">Profile Picture</label>
                              <input type="file" className="form-control" name="profileImage" id="profileImage" onChange={handleFileChange} />
                              
                          </div>
                      </div>
                      <div className="col-12 col-sm-6">
                          <div className="mb-3">
                              {selectedImage && (
                                  <img src={selectedImage || ""} className="img-thumbnail" alt="profile" width="100" height="100" />
                              )}
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-12 col-sm-6">
                          <div className="mb-3">
                              <label htmlFor="firstName" className="form-label">First Name</label>
                              <input type="text" className="form-control" name="firstName" id="firstName"
                               onChange={(e)=>setFirstName(e.target.value)}
                               value={firstName} />
                          </div>
                      </div>
                      <div className="col-12 col-sm-6">
                          <div className="mb-3">
                              <label htmlFor="lastName" className="form-label">Last Name</label>
                              <input type="text" className="form-control" name="lastName" id="lastName"
                              onChange={(e)=>setLastName(e.target.value)}
                              value={lastName}  />
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-12 col-sm-6">
                          <div className="mb-3">
                              <label htmlFor="email" className="form-label">Email</label>
                              <input type="email" className="form-control" name="email" id="email"
                               onChange={(e)=>setEmail(e.target.value)}
                               value={email} />
                          </div>
                      </div>
                      <div className="col-12 col-sm-6">
                          <div className="mb-3">
                              <label htmlFor="mobile" className="form-label">Mobile</label>
                              <input type="number" className="form-control" name="mobile" id="mobile"
                               onChange={(e)=>setMobile(e.target.value)}
                               value={mobile} />
                              
                          </div>
                      </div>
                  </div>

                  <div className="mb-2">
                      <button type="submit" className="btn btn-primary"
                      onClick={handleSave}>Save </button>
                      <button type="button" className="btn btn-primary mx-2"
                          data-bs-toggle="modal" data-bs-target="#changePassword">
                          Change Password</button>
                  </div>
              </div>
              </form>

          </div>
      </div>
  )
}

export default InputForm;
