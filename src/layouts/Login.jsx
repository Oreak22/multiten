import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ tenantId }) => {
	const [error, setError] = React.useState("");
	const navigate = useNavigate();

	const handleLogin = async (values) => {
		try {
			const response = await axios.post(
				"https://multi-tenancy-system-server-2.onrender.com/api/auth/login",
				values,
			);
			localStorage.setItem("token", response.data.token);
			navigate(`/dashboard/${response.data.token}`);
		} catch (err) {
			setError(err.response.data.error);
		}
	};

	return (
		<div className='w-full max-w-md mx-auto bg-white p-3 rounded-lg'>
			<h1 className='font-bold text-2xl text-center mb-4 text-gray-800'>
				Log In to Your Organization
			</h1>
			{error && <p className='text-red-500 text-center mb-3'>{error}</p>}
			<Formik
				initialValues={{
					email: "",
					password: "",
					organizationName: tenantId ? tenantId : "",
					adminName: "",
				}}
				validate={(values) => {
					const errors = {};
					if (!values.organizationName) {
						errors.organizationName = "Required";
					}
					if (!values.password) {
						errors.password = "Required";
					}
					if (!values.email) {
						errors.email = "Required";
					} else if (
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
					) {
						errors.email = "Invalid email address";
					}

					return errors;
				}}
				onSubmit={async (values, { setSubmitting }) => {
					setSubmitting(true);
					try {
						await handleLogin({
							tenantId: values.organizationName,
							email: values.email,
							password: values.password,
						});
					} catch (err) {
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form className='space-y-4'>
						<div>
							<label className='block text-gray-700 font-semibold mb-1'>
								Organization Name
							</label>
							<Field
								type='text'
								name='organizationName'
								className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400'
							/>
							<ErrorMessage
								name='organizationName'
								component='small'
								className='text-red-500'
							/>
						</div>
						<div>
							<label className='block text-gray-700 font-semibold mb-1'>
								Your Email
							</label>
							<Field
								type='email'
								name='email'
								className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400'
							/>
							<ErrorMessage
								name='email'
								component='small'
								className='text-red-500'
							/>
						</div>
						<div>
							<label className='block text-gray-700 font-semibold mb-1'>
								Password
							</label>
							<Field
								type='password'
								name='password'
								className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400'
							/>
							<ErrorMessage
								name='password'
								component='small'
								className='text-red-500'
							/>
						</div>
						<div className='text-center'>
							<button
								type='submit'
								disabled={isSubmitting}
								className='w-full bg-gray-900 text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
							>
								{isSubmitting ? "Logging in..." : "Login"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Login;
