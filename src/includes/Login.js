import React ,{useNavigate} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; 

function Login() {
  
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();

  const saveData = (data) => {
    if(data.isStaff){
      axios.get('http://localhost:9090/')
      .then(res => res.data)
      .catch(error => alert(error.message))

      navigate('/bankloan')
    }
  };

  return (
    <div className="container mt-5 w-50">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit(saveData)} className="border p-4 rounded shadow-sm">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            {...register('username', { required: true })} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register('password', { required: true })} // Validation rule for required field
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            id="staff-checkbox"
            className="form-check-input"
            {...register('isStaff')}
          />
          <label htmlFor="staff-checkbox" className="form-check-label">
            Are you a staff member?
          </label>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
