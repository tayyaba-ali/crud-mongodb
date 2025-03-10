import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        toast.success(data.message);
        navigate('/login');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      toast.error(error.message || 'An error occurred while signing up');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen  px-4'>
      <div className='relative flex flex-col rounded-xl bg-white shadow-lg p-6 w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-gray-800 text-center'>Sign Up</h2>
        <p className='text-gray-500 text-center mb-6'>Welcome! Enter your details to register.</p>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Your Name</label>
            <input
              name='username'
              type='text'
              value={formData.username}
              onChange={handleChange}
              className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Enter your name'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Email</label>
            <input
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Enter your email'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Password</label>
            <input
              name='password'
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              className='w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Enter your password'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 rounded-md transition-all duration-300 disabled:bg-gray-500'
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
