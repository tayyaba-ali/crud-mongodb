import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                localStorage.setItem('token', data.token); // Store JWT token
                toast.success(data.message || 'Login successful!');
                navigate('/');
            } else {
                toast.error(data.message || 'Invalid email or password');
            }
        } catch (error) {
            setLoading(false);
            toast.error('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className='flex justify-center'>
            <div className='relative flex flex-col rounded-xl bg-transparent'>
                <h4 className='text-xl font-medium text-slate-800'>Login</h4>
                <p className='text-slate-500 font-light'>Welcome back! Enter your details to sign in.</p>
                <form className='mt-8 w-80 sm:w-96' onSubmit={handleSubmit}>
                    <div className='mb-1 flex flex-col gap-6'>
                        <div className='w-full max-w-sm'>
                            <label className='text-sm text-slate-600'>Email</label>
                            <input
                                onChange={handleChange}
                                name='email'
                                type='email'
                                value={formData.email}
                                className='w-full bg-transparent border px-3 py-2 rounded-md'
                                placeholder='Your Email'
                            />
                        </div>
                        <div className='w-full max-w-sm'>
                            <label className='text-sm text-slate-600'>Password</label>
                            <div className='relative'>
                                <input
                                    onChange={handleChange}
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    className='w-full bg-transparent border px-3 py-2 rounded-md'
                                    placeholder='Your Password'
                                />
                                <button
                                    type='button'
                                    className='absolute right-3 top-2 text-sm'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        className='mt-4 w-full rounded-md bg-slate-800 py-2 text-white hover:bg-slate-700 disabled:opacity-50'
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? 'Logging In...' : 'Login'}
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
