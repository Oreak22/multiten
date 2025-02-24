import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setState }) => {
	const [errorMessage, setErrorMessage] = React.useState("");
	const url = "https://multi-tenancy-system-server-2.onrender.com/api/tenants/create";
	const navigate = useNavigate();
	const handleRegister = async (values) => {
		try {
			const responce = await axios.post(url, values);
			setErrorMessage("");
			setState("signIn");
			navigate(`/${responce.data.tenantId}`);
		} catch (err) {
			setErrorMessage(err.response.data.error);
		}
	};
	return (
		<div className='w-[100%]'>
			<h1 className='font-bold text-center'>Create Your Organization </h1>
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
					<Form>
						<div className='w-full flex flex-col gap-2'>
							<label htmlFor='' className='px-2 font-bold '>
								Organization Name
							</label>
							<Field
								type='text'
								name='organizationName'
								className='pt-2 px-3 border-b outline-0 border-black'
							/>
							<ErrorMessage
								name='organizationName'
								component='small'
								className='text-red-500 mx-2'
							/>
						</div>
						<div className='w-full flex flex-col gap-2'>
							<label htmlFor='' className='px-2 font-bold '>
								Admin Name
							</label>
							<Field
								type='text'
								name='adminName'
								className='pt-2 px-3 border-b outline-0 border-black'
							/>
							<ErrorMessage
								name='adminName'
								component='small'
								className='text-red-500 mx-2'
							/>
						</div>
						<div className='w-full flex flex-col gap-2'>
							<label htmlFor='' className='px-2 font-bold '>
								Your Email
							</label>
							<Field
								type='email'
								name='email'
								className='pt-2 px-3 border-b outline-0 border-black'
							/>
							<ErrorMessage
								name='email'
								component='small'
								className='text-red-500 mx-2'
							/>
						</div>
						<div className='w-full flex flex-col gap-2 mb-3'>
							<label htmlFor='' className='px-2 font-bold '>
								Create Password
							</label>
							<Field
								type='password'
								name='password'
								className='pt-2 px-3 border-b outline-0 border-black'
							/>
							<ErrorMessage
								name='password'
								component='small'
								className='text-red-500 mx-2'
							/>
						</div>
						<div className='text-center'>
							<button
								type='submit'
								disabled={isSubmitting}
								className='bg-black text-white py-2 px-3 rounded-md disabled:bg-gray-700 disabled:cursor-not-allowed'
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
