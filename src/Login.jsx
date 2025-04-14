import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [slide, setSlideForm] = useState(0);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    userid: '',
    password: ''
  });

  const [errorMsg, setErrorMsg] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }));
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
      try {
        const res = await signInWithEmailAndPassword(auth, loginData.userid, loginData.password);
        console.log(res);
        setLoginData({ userid: '', password: '' });
        navigate('/');
      } catch (error) {
        setErrorMsg({ general: error.message });
      }
    }
  };

  const handleLoginBtn = () => setSlideForm(0);
  const handleRegisterBtn = () => setSlideForm(-100);

  const toggleToast = (val) => {
    setIsToastOpen(val);
  };

  useEffect(() => {
    if (isToastOpen) {
      const timer = setTimeout(() => setIsToastOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isToastOpen]);

  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-gray-100 p-4">
      {/* Toggle Buttons */}
      <div className="mb-6 space-x-4">
        <button
          onClick={handleLoginBtn}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
            slide === 0 ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'
          }`}
        >
          Login
        </button>
        <button
          onClick={handleRegisterBtn}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
            slide === -100 ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'
          }`}
        >
          Register
        </button>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(${slide}%)` }}
        >
          {/* Login Form */}
          <div className="min-w-full p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="userid" className="block font-medium mb-1">
                  Email
                </label>
                <input
                  type="text"
                  id="userid"
                  name="userid"
                  value={loginData.userid}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                {errorMsg?.userid && <p className="text-red-500 text-sm mt-1">{errorMsg.userid}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                {errorMsg?.password && <p className="text-red-500 text-sm mt-1">{errorMsg.password}</p>}
              </div>

              {errorMsg?.general && <p className="text-red-600 text-sm mb-3">{errorMsg.general}</p>}

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Register Form */}
          <div className="min-w-full">
            <Register toggleToast={toggleToast} />
          </div>
        </div>
      </div>

      {/* Toast */}
      <div
        className={`fixed top-5 right-5 z-50 flex items-center max-w-sm p-4 text-white bg-green-500 rounded-lg shadow transition-transform ${
          isToastOpen ? 'translate-y-0 opacity-100' : 'translate-y-[-100%] opacity-0'
        }`}
        role="alert"
      >
        <div className="text-sm font-medium">Set yourself free.</div>
        <button
          onClick={() => setIsToastOpen(false)}
          className="ml-auto text-white hover:text-gray-200 focus:outline-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Login;
