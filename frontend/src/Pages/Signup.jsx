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

			const data = await response.json(); // Extract JSON data

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
		<div className='flex justify-center'>
			<div className='relative flex flex-col rounded-xl bg-transparent'>
				<h4 className='block text-xl font-medium text-slate-800'>Sign Up</h4>
				<p className='text-slate-500 font-light'>Nice to meet you! Enter your details to register.</p>
				<form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96' onSubmit={handleSubmit}>
					<div className='mb-1 flex flex-col gap-6'>
						<div className='w-full max-w-sm min-w-[200px]'>
							<label className='block mb-2 text-sm text-slate-600'>Your Name</label>
							<input
								name='username'
								type='text'
								value={formData.name}
								onChange={handleChange}
								className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
								placeholder='Your Name'
							/>
						</div>
						<div className='w-full max-w-sm min-w-[200px]'>
							<label className='block mb-2 text-sm text-slate-600'>Email</label>
							<input
								name='email'
								type='email'
								value={formData.email}
								onChange={handleChange}
								className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
								placeholder='Your Email'
							/>
						</div>
						<div className='w-full max-w-sm min-w-[200px]'>
							<label className='block mb-2 text-sm text-slate-600'>Password</label>
							<input
								name='password'
								type={showPassword ? 'text' : 'password'}
								value={formData.password}
								onChange={handleChange}
								className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
								placeholder='Your Password'
							/>
						</div>
					</div>

					<button
						className='mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
						type='submit'
						disabled={loading}>
						{loading ? 'Signing Up...' : 'Sign Up'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Signup;
