import React,{useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faEnvelope, faUser} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import axios from "axios";

function ProfileCard({profileData, setProfileData}) {
    
    useEffect(()=>{
        const fetchProfile = async () => {
            try{
                const result = await axios.get("http://localhost:5000/api/getadmin");
                setProfileData(result.data);
            }catch(error){
                toast.error(error.message);
            }
        };
        fetchProfile();
    },[]);
    console.log(profileData)
  return (
    <div className="col-12 col-sm-4">
        {profileData.map(profile=>(
            <div className="card shadow-sm mb-3">
            <div className="card-header text-center text-light p-3 profileCard rounded shadow-sm">
                <img src={`http://localhost:5000/${profile.Picture.replace(/\\/g, '/')}`}
                    width="90" height="90" alt="profile" className="rounded-circle shadow-lg border border-2" />
                <h6 className="card-title mt-3">{profile.FirstName} {profile.LastName}</h6>
                <p className="font-italic font-weight-light">Admin</p>
            </div>
            <div className="card-body">
                <h6 className="my-2">Profile Details</h6>
                <div className="my-3 row align-items-center p-2">
                    <div className="bg-light-blue px-2 py-1 rounded text-primary col-auto">
                        <FontAwesomeIcon icon={faAddressBook} className="fs-16" />
                    </div>
                    <div className="col">
                        <span className="d-block">{profile.Mobile}</span>
                    </div>
                </div>
                <div className="my-3 row align-items-center p-2">
                    <div className="bg-light-blue px-2 py-1 rounded text-primary col-auto">
                        <FontAwesomeIcon icon={faEnvelope} className="fs-16" />
                    </div>
                    <div className="col">
                        <span className="d-block">{profile.Email}</span>
                    </div>
                </div>
                <div className="my-3 row align-items-center p-2">
                    <div className="bg-light-blue px-2 py-1 rounded text-primary col-auto">
                        <FontAwesomeIcon icon={faUser} className="fs-16" />
                    </div>
                    <div className="col">
                        <span className="d-block">Admin</span>
                    </div>
                </div>
            </div>
        </div>
        ))}
        
    </div>
  )
}

export default ProfileCard
