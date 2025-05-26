import { useState, useEffect } from 'react';
import {FaSignInAlt} from 'react-icons/fa';
import { toast } from 'react-toastify';
// useSelect will select global state, useDispatch will use to Dispatch our actions
import {useSelector, useDispatch} from 'react-redux'; 
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function Login(){
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {email, password} = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch(); // dispatch our actions e.g register

  const {user, isSuccess, isError, isLoading, message} = useSelector(state => state.auth) // we selected our defined state 'auth'

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

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

  const onSubmit = (e) => {
    e.preventDefault();
   const userData = {
    email,
    password
   }
   dispatch(login(userData))
  }
  if(isLoading){
    return <Spinner />
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
                placeholder='Enter Your Password' name='password' required />
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