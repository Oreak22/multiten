import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SignUp from "../layouts/SignUp";
import Login from "../layouts/Login";

const Index = () => {
	const { tenantId } = useParams();
	const [action, setAction] = useState("signIn");

	return (
		<div className='w-screen h-screen flex flex-col justify-center items-center bg-gray-100 px-4'>
			<h3 className='font-bold text-3xl text-center mb-6 text-gray-800'>
				Welcome to MultiTen
			</h3>
			<div className='flex w-full max-w-lg shadow-md rounded-md overflow-hidden bg-white'>
				<button
					className={`flex-1 py-3 text-lg font-semibold transition-colors duration-300 ${
						action === "signIn"
							? "bg-gray-900 text-white"
							: "bg-gray-100 text-gray-700 hover:bg-gray-200"
					}`}
					onClick={() => setAction("signIn")}
				>
					Sign In
				</button>
				<button
					className={`flex-1 py-3 text-lg font-semibold transition-colors duration-300 ${
						action === "signUp"
							? "bg-gray-900 text-white"
							: "bg-gray-100 text-gray-700 hover:bg-gray-200"
					}`}
					onClick={() => setAction("signUp")}
				>
					Sign Up
				</button>
			</div>
			<div className='w-full max-w-lg shadow-md mt-4 bg-white p-6 rounded-md'>
				{action === "signIn" ? (
					<Login tenantId={tenantId} />
				) : (
					<SignUp setState={setAction} />
				)}
			</div>
		</div>
	);
};

export default Index;
