import { useState } from 'react';
import {FaSignInAlt} from 'react-icons/fa';
import { toast } from 'react-toastify';
function Login(){
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {name, email, password, password2} = formData;
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }
  const onSubmit = (e) => {
    e.preventDefault();
   
  }
  return (
    <>
      <section className="heading">
        
        <h1>
         <FaSignInAlt /> Sign In
        </h1>
        <p>Please login to get support</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit} >
          
            <div className="form-group">
            <input type="email" className="form-control"
                id='email' value={email} onChange={onChange} 
                placeholder='Enter Your Name' name='email' required />
            </div>

            <div className="form-group">
            <input type="password" className="form-control"
                id='password' value={password} onChange={onChange} 
                placeholder='Enter Your Name' name='password' required />
            </div>
           
            <div className="form-group">
              <button className="btn btn-block">Submit</button>
            </div>

        </form>
      </section>
    </>
  )

}

export default Login