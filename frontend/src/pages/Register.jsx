import { useEffect, useState } from 'react';
import {FaUser} from 'react-icons/fa';
import { toast } from 'react-toastify';
// useSelect will select global state, useDispatch will use to Dispatch our actions
import {useSelector, useDispatch} from 'react-redux'; 
import { register, reset } from '../features/auth/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';


function Register(){
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const navigate = useNavigate();
  const {name, email, password, password2} = formData;

  const dispatch = useDispatch(); // dispatch our actions e.g register

  const {user, isSuccess, isError, isLoading, message} = useSelector(state => state.auth) // we selected our defined state 'auth'
  

  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    // Redirect when logged in
    if(isSuccess || user){
      navigate('/');
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if(password !== password2){
      toast.error('Passwords Does not match');
    }else{
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))
    }
  }
  return (
    <>
      <section className="heading">
        
        <h1>
         <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit} >
            <div className="form-group">
              <input type="text" className="form-control"
                id='name' value={name} onChange={onChange} 
                placeholder='Enter Your Name' name='name' required />
            </div>
            <div className="form-group">
            <input type="email" className="form-control"
                id='email' value={email} onChange={onChange} 
                placeholder='Enter Your Name' name='email' required />
            </div>
            <div className="form-group">
            <input type="password" className="form-control"
                id='password' value={password} onChange={onChange} 
                placeholder='Enter Your Password' name='password' required />
            </div>
            <div className="form-group">
            <input type="password" className="form-control"
                id='password2' value={password2} onChange={onChange} 
                placeholder='Enter Your Password' name='password2' required />
            </div>
            <div className="form-group">
              <button className="btn btn-block">Submit</button>
            </div>
        </form>
      </section>
    </>
  )

}

export default Register