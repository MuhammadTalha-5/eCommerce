import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

/* Importing Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Login(){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let result = await fetch("http://localhost:5000/api/login",{
            method: "post",
            body: JSON.stringify({email,password}),
            headers: {'Content-Type': 'application/json'}
        });
        result = await result.json();
        /* Check the status and redirect to the dashboard*/
        if(result.status === "Login Successfully"){
            alert(result.status)
            navigate('/admin');
        }
        else{
            setLoginError(result.status)
        }
    }
    
    return (
        <div className="container mt-5 containerwrapper">
            <div className="text-center">
                <h4 className="logintitle">Admin Login</h4>
                {loginError && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>{loginError}</strong>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setLoginError(null)} 
                            aria-label="Close"
                        ></button>
                    </div>
                )}
            </div>
            <div className="LoginWrapper">
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" className="form-control" name="email" id="email"
                            onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" id="password"
                            onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </div>
                    

                    <div className="d-flex mt-2">
                        <div className="me-auto">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="rememberme"/>
                                <label htmlFor="rememberme" className="form-check-label">Remember Me</label>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary">Log In</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="text-center mt-4">
                
                <a href="/" className="nav-link">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2"/> 
                     Go to Website</a>
            </div>
        </div>
    );
}

export default Login;