import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup.js";

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const { loading, signup } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(inputs);
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-8 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl pb-6 font-semibold text-center text-gray-300'>
                    Sign Up <span className='text-red-500'> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-green-600 text-base label-text'>Full Name</span>
                        </label>
                        <input
                            type='text'
                            placeholder='First Last'
                            className='w-full input input-bordered  h-10'
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label p-2 '>
                            <span className='text-green-600 text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='username'
                            className='w-full input input-bordered h-10'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-green-600 text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-green-600 text-base label-text'>Confirm Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            className='w-full input input-bordered h-10'
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>

                    <Link
                        to={"/login"}
                        className='text-green-600 text-sm pt-6 hover:underline hover:text-red-600 mt-2 inline-block'
                        href='#'
                    >
                        Already have an account?
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default SignUp;