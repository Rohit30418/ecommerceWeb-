import React, { useState, useEffect } from 'react';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';
import { uploadGuestCartToFirestore } from '../cart/uploadGuestCartToFirestore';

const Login = () => {
  const [loginData, setLoginData] = useState({ userid: '', password: '' });
  const [errorMsg, setErrorMsg] = useState({});
  const [isToastOpen, setIsToastOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!loginData.userid) errors.userid = 'Enter your email';
    if (!loginData.password) errors.password = 'Enter your password';
    setErrorMsg(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
  
    e.preventDefault();
    if (validateForm()) {
        setIsLoading(true);
      try {
      
        const res = await signInWithEmailAndPassword(auth, loginData.userid, loginData.password);
        setLoginData({ userid: '', password: '' });
        setIsLoading(false);
        toast.success("Login successful")
        if(localStorage.getItem("guest")){
         await uploadGuestCartToFirestore(res.user.uid);
          navigate('/cart');
        }else{
           navigate('/');
        }
       
      } catch (error) {
        setErrorMsg({ general: error.message });
      }    
    }
  };

  useEffect(() => {
    if (isToastOpen) {
      const timer = setTimeout(() => setIsToastOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isToastOpen]);

  return (
  
    <div className="min-h-[70vh] flex items-center justify-center  px-4">
      <div className="dark:bg-gray-400/20 bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 sm:p-10 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="userid" className="block text-sm font-medium text-gray-600 dark:text-white mb-1">
              Email
            </label>
            <input
              type="email"
              name="userid"
              id="userid"
              value={loginData.userid}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none transition"
              placeholder="you@example.com"
            />
            {errorMsg?.userid && <p className="text-sm text-red-500 mt-1">{errorMsg.userid}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-white mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300  rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none transition"
              placeholder="••••••••"
            />
            {errorMsg?.password && <p className="text-sm text-red-500 mt-1">{errorMsg.password}</p>}
          </div>

          {errorMsg?.general && (
            <p className="text-sm text-red-600 text-center -mt-2">{errorMsg.general}</p>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition duration-200"
          >
           {isLoading?" Logging in...": "Login"} 
          </button>
        </form>

        <p className="text-sm text-gray-500 dark:text-white text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/Register" className="text-red-600 hover:underline cursor-pointer">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
