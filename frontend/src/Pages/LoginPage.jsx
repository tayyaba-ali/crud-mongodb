import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
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
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // 🟡 **Optimization 1: Handle non-OK responses (e.g., 400, 401, 500)**
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred while logging in');
      }

      // 🟡 **Optimization 2: Display success message and navigate**
      toast.success(data.message || 'Login successful!');
      navigate('/');
    } catch (error) {
      // 🟡 **Optimization 3: Display error message from the server or a generic message**
      toast.error(error.message || 'An error occurred while logging in');
      console.error('Error:', error);
    } finally {
      // 🟡 **Optimization 4: Reset loading state in finally block**
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='relative flex flex-col rounded-xl bg-transparent'>
        <h4 className='block text-xl font-medium text-slate-800'>Login</h4>
        <p className='text-slate-500 font-light'>Welcome back! Enter your details to sign in.</p>
        <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96' onSubmit={handleSubmit}>
          <div className='mb-1 flex flex-col gap-6'>
            <div className='w-full max-w-sm min-w-[200px]'>
              <label className='block mb-2 text-sm text-slate-600'>Email</label>
              <input
                onChange={handleChange}
                name='email'
                type='email'
                className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                placeholder='Your Email'
              />
            </div>
            <div className='w-full max-w-sm min-w-[200px]'>
              <label className='block mb-2 text-sm text-slate-600'>Password</label>
              <input
                onChange={handleChange}
                name='password'
                type='password'
                className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                placeholder='Your Password'
              />
            </div>
          </div>
          <button
            className='mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            type='submit'
            disabled={loading} // 🟡 **Optimization 5: Disable button when loading**
          >
            {loading ? 'Logging In...' : 'Login In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;





// import React from 'react';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// const Login = () => {
// const [formData, setFormData] = useState({
// 	email: '',
// 	password: '',
// });

// const [showPassword, setShowPassword] = useState(false);
// const [loading, setLoading] = useState(false);
// const navigate = useNavigate();

// const handleChange = (e) => {
// 	const { name, value } = e.target;
// 	setFormData((prevData) => ({
// 		...prevData,
// 		[name]: value,
// 	}));
// };

// const handleSubmit = async (e) => {
// 	e.preventDefault();
// 	setLoading(true);
// 	console.log(formData);

// 	try {
// 		setLoading(true)
// 		const response = await fetch('http://localhost:5000/api/auth/login', {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(formData),
// 		});

// 		const data = await response.json(); 

// 		setLoading(false);
// 		if (response.ok) {
// 			toast.success(data.message);
// 			navigate('/');
// 		}
// 	} catch (error) {
// 		setLoading(false);
// 		console.error('Error:', error);
// 		toast.error(error.message || 'An error occurred while logging in  up');
// 	}
// };



// 	return (
// 		<div className='flex justify-center'>
// 			<div className='relative flex flex-col rounded-xl bg-transparent'>
// 				<h4 className='block text-xl font-medium text-slate-800'>Login</h4>
// 				<p className='text-slate-500 font-light'>Welcome back! Enter your details to sign in.</p>
// 				<form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96' onSubmit={handleSubmit}>
// 					<div className='mb-1 flex flex-col gap-6'>
// 						<div className='w-full max-w-sm min-w-[200px]'>
// 							<label className='block mb-2 text-sm text-slate-600'>Email</label>
// 							<input
// 								onChange={handleChange}
// 								name='email'
// 								type='email'
// 								className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
// 								placeholder='Your Email'
// 							/>
// 						</div>
// 						<div className='w-full max-w-sm min-w-[200px]'>
// 							<label className='block mb-2 text-sm text-slate-600'>Password</label>
// 							<input
// 								onChange={handleChange}
// 								name='password'
// 								type='password'
// 								className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
// 								placeholder='Your Password'
// 							/>
// 						</div>
// 					</div>
// 					<button
// 						className='mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
// 						type='submit'>
// 						{loading ? 'Logging In...' : 'Login In'}
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default Login;
