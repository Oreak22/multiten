import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
	const [response, setresponse] = useState("");
	const handleReset = async (value) => {
		try {
			const response = await axios
				.post("http://localhost:3001/api/auth/resetpassword", value)
				.then((response) => {
					console.log(response.data);
					setresponse(response.data.status);
				});
		} catch (error) {
			setresponse(error.response.data.error);
		}
	};

	if (response == "sent")
		return (
			<div className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100 px-4'>
				<h3 className='text-center mb-6 text-green-800'>
					Reset link had been sent to your email
				</h3>
				<div className='text-center mt-2'>
					<Link to={"/"}>Back to login</Link>
				</div>
			</div>
		);
	return (
		<div className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100 px-4'>
			<h3 className='font-bold text-3xl text-center mb-6 text-gray-800'>
				Reset Password
			</h3>
			{response && (
				<div className='text-center mb-6 text-red-800'>{response}</div>
			)}

			<div className='w-full max-w-lg shadow-md mt-3 bg-white p-6 rounded-md'>
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
							await handleReset({
								tenantId: values.organizationName,
								email: values.email,
							});
						} catch (err) {
						} finally {
							console.log("Done:");
							// setSubmitting(false);
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

							<div className='text-center'>
								<button
									type='submit'
									disabled={isSubmitting}
									className='w-full bg-gray-900 text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
								>
									{isSubmitting ? "Sending reset mail..." : "Reset Password"}
								</button>
							</div>
						</Form>
					)}
				</Formik>
				<div className='text-right mt-2'>
					<Link to={"/"}>Back to login</Link>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
