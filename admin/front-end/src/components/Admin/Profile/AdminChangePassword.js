import React, {useState} from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

function AdminChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleChangePassword = async (e)=>{
        e.preventDefault();

        if(!oldPassword){
            toast.error("Enter Old Password")
        }
        else if(!newPassword){
            toast.error("Enter New Password")
        }
        else{
            const response = await axios.post("http://localhost:5000/api/changeadminpassword",{
            oldPassword : oldPassword,
            newPassword: newPassword,
        });
        if(response.data.ChangePassStatus === "200"){
            toast.success("Password Changed Successfully");
            setOldPassword("");
            setNewPassword("");
        }
        else if(response.data.ChangePassStatus === "404"){
            toast.error("Incorrect Old Password");
        }
        else if(response.data.ChangePassStatus === "500"){
            toast.error("Internal Server Error")
        }
        else{
            toast.error("Error Changing Password")
        }
        }
    }
  return (
   
      <div className="modal fade" id="changePassword" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Change Password</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      <form>
                          <div className="mb-3">
                              <label htmlFor="password" className="form-label">Password</label>
                              <input type="password" className="form-control" name="password" id="password"
                              onChange={(e)=>setOldPassword(e.target.value)} value={oldPassword} />
                          </div>

                          <div className="mb-3">
                              <label htmlFor="newPassword" className="form-label">New Password</label>
                              <input type="password" className="form-control" name="newPassword" id="newPassword"
                              onChange={(e)=>setNewPassword(e.target.value)} value={newPassword} />
                          </div>
                      </form>
                  </div>
                   
                  <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="submit" className="btn btn-primary" onClick={handleChangePassword}>Save changes</button>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default AdminChangePassword;
