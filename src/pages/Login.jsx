import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../context/AppContextCreator';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // 👁️ import icons

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState('Sign Up');
  const [showPassword, setShowPassword] = useState(false); // 👁️ visibility state

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (state === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, data);
        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          setToken(response.data.token);
          reset();
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email: data.email,
          password: data.password,
        });
        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          setToken(response.data.token);
          reset();
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-3 py-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm sm:max-w-md bg-white border rounded-xl shadow-md p-4 sm:p-6 flex flex-col gap-4 text-sm text-[#5E5E5E]"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm">
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment.
        </p>

        {state === 'Sign Up' && (
          <div>
            <label className="block mb-1 text-xs sm:text-sm">Full Name</label>
            <input
              {...register('name', { required: 'Full name is required' })}
              className="w-full border border-[#DADADA] rounded p-2 focus:outline-primary"
              type="text"
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
        )}

        <div>
          <label className="block mb-1 text-xs sm:text-sm">Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Enter a valid email',
              },
            })}
            className="w-full border border-[#DADADA] rounded p-2 focus:outline-primary"
            type="email"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Password Field with Eye Toggle */}
        <div className="relative">
          <label className="block mb-1 text-xs sm:text-sm">Password</label>
          <input
            {...register('password', { required: 'Password is required', minLength: 4 })}
            className="w-full border border-[#DADADA] rounded p-2 pr-10 focus:outline-primary"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <span
            className="absolute right-3 top-9 sm:top-9 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md hover:opacity-90 transition"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <p className="text-xs sm:text-sm text-center">
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => {
                  setState('Login');
                  setValue('email', '');
                  setValue('password', '');
                  reset({ name: '', email: '', password: '' });
                }}
                className="text-primary underline cursor-pointer"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <span
                onClick={() => {
                  setState('Sign Up');
                  setValue('email', '');
                  setValue('password', '');
                  reset({ name: '', email: '', password: '' });
                }}
                className="text-primary underline cursor-pointer"
              >
                Sign up here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
