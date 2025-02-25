import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

const ResetPasswordToken = () => {
	const { token } = useParams();
	const [response, setresponse] = useState("");
	const [loading, setLoading] = useState(true);
	const [validated, setValidated] = useState(true);

	const handleReset = async (vlaue) => {
		try {
			axios
				.post("http://localhost:3001/api/auth/changepassword", {
					newPassword: vlaue,
					token,
				})
				.then((res) => {
                    console.log(res.data);
					setresponse(res.data.message);
				});
		} catch (err) {
            console.log(err);
			setresponse(err.response.data.message);
			setLoading(false);
		}
	};
	return (
		<div className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100 px-4'>
			{loading ? (
				<div className='flex flex-col justify-center items-center'>
					Loading...
				</div>
			) : (
				<>
					{!validated ? (
						<>
							<div className='flex flex-col justify-center items-center text-red-500'>
								Invalid or expired token
							</div>
							<Link to='/' className='underline mt-2'>
								Return to login
							</Link>
						</>
					) : (
						<>
							<h3 className='font-bold text-2xl text-center mb-6 text-gray-800'>
								Change Password
							</h3>
							{response && (
								<div className='text-center mb-6 text-red-800'>{response}</div>
							)}

							<div className='w-full max-w-lg shadow-md mt-3 bg-white p-6 rounded-md'>
								<Formik
									initialValues={{
										password: "",
										confirmPassword: "",
									}}
									validate={(values) => {
										const errors = {};
										if (!values.password) {
											errors.password = "Required";
										}
										if (!values.confirmPassword) {
											errors.confirmPassword = "Required";
										}
										if (values.password !== values.confirmPassword) {
											errors.confirmPassword = "Passwords do not match";
										}
										return errors;
									}}
									onSubmit={async (values, { setSubmitting }) => {
										setSubmitting(true);
										try {
											await handleReset({
												password: values.password,
											});
										} catch (err) {
											console.error("Error resetting password:", err);
										} finally {
											console.log("Password reset process completed.");
											setSubmitting(false);
										}
									}}
								>
									{({ isSubmitting }) => (
										<Form className='space-y-4'>
											<div>
												<label className='block text-gray-700 font-semibold mb-1'>
													New Password
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
											<div>
												<label className='block text-gray-700 font-semibold mb-1'>
													Confirm Password
												</label>
												<Field
													type='password'
													name='confirmPassword'
													className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400'
												/>
												<ErrorMessage
													name='confirmPassword'
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
													{isSubmitting ? "Processing..." : "Reset Password"}
												</button>
											</div>
										</Form>
									)}
								</Formik>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default ResetPasswordToken;
