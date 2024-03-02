import React,{useState} from 'react';
import Nav from '../../Layout/Nav';
import TopLoadingBar from '../../addons/TopLoadingBar';
import TopNav from '../../Layout/TopNav';
import Footer from '../../Layout/Footer';

import AdminChangePassword from './AdminChangePassword';
import ProfileCard from './ProfileCard';
import InputForm from './InputForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [profileData, setProfileData] = useState([]);
  
  return (
    <div id="wrapper">
            <Nav />
            <TopLoadingBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <TopNav />
                <div className="container-fluid">
                <h4 className="py-2 mb-4">Profile</h4>
                    <div className="row mb-3">

                    {/*  Left Column / Profile Card */}
                    <ProfileCard profileData={profileData} setProfileData={setProfileData} />

                    {/* Right Column / Input Form  */}
                   <InputForm setProfileData={setProfileData}/>
                   
                    </div>
                    {/*   Change password modal component  */}
                    <AdminChangePassword />
                </div>
                <ToastContainer />
                <Footer />
            </div>
        </div>
  )
}

export default Profile
