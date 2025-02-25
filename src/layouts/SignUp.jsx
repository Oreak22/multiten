import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setState }) => {
	const [errorMessage, setErrorMessage] = React.useState("");
	const url = "http://localhost:3001/api/tenants/create";
	const navigate = useNavigate();

	const handleRegister = async (values) => {
		try {
			const response = await axios.post(url, values);
			setErrorMessage("");
			setState("signIn");
			navigate(`/${response.data.tenantId}`);
		} catch (err) {
			setErrorMessage(err.response.data.error);
		}
	};

	return (
		<div className='w-full max-w-md mx-auto bg-white p-3 rounded-lg'>
			<h1 className='text-2xl font-bold text-center mb-4'>
				Create Your Organization
			</h1>
			{errorMessage && (
				<p className='text-red-500 text-center'>{errorMessage}</p>
			)}
			<Formik
				initialValues={{
					email: "",
					password: "",
					organizationName: "",
					adminName: "",
				}}
				validate={(values) => {
					const errors = {};
					if (!values.organizationName) {
						errors.organizationName = "Required";
					}
					if (!values.adminName) {
						errors.adminName = "Required";
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
						await handleRegister({
							organizationName: values.organizationName,
							name: values.adminName,
							adminEmail: values.email,
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
							<label className='block font-semibold'>Organization Name</label>
							<Field
								type='text'
								name='organizationName'
								className='w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-gray-400'
							/>
							<ErrorMessage
								name='organizationName'
								component='small'
								className='text-red-500'
							/>
						</div>

						<div>
							<label className='block font-semibold'>Admin Name</label>
							<Field
								type='text'
								name='adminName'
								className='w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-gray-400'
							/>
							<ErrorMessage
								name='adminName'
								component='small'
								className='text-red-500'
							/>
						</div>

						<div>
							<label className='block font-semibold'>Your Email</label>
							<Field
								type='email'
								name='email'
								className='w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-gray-400'
							/>
							<ErrorMessage
								name='email'
								component='small'
								className='text-red-500'
							/>
						</div>

						<div>
							<label className='block font-semibold'>Create Password</label>
							<Field
								type='password'
								name='password'
								className='w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-gray-400'
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
								className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition disabled:bg-gray-500 disabled:cursor-not-allowed'
							>
								{isSubmitting ? "Signing up..." : "Sign Up"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default SignUp;
