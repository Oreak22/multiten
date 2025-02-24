import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SignUp from "../layouts/SignUp";
import Login from "../layouts/Login";

const Index = () => {
	const { tenantId } = useParams();
	const [action, setAction] = useState("signIn");
	return (
		<div className=' w-screen h-screen flex justify-center flex-col align-middle bg-amber-100 px-3 md:px-0'>
			<h3 className='font-bold text-2xl text-center mb-5'>
				Welcome To MultiTen
			</h3>
			<div className='flex w-[90%] h-fit mx-auto md:w-[80%] lg:w-[60%] shadow-amber-50 rounded-sm bg-white '>
				<button
					className={`w-[50%] p-2 ${action === "signIn" ? "bg-amber-400" : ""}`}
					onClick={() => setAction("signIn")}
				>
					Sign In
				</button>
				<button
					className={`w-[50%] p-2 ${action === "signUp" ? "bg-amber-400" : ""}`}
					onClick={() => setAction("signUp")}
				>
					Sign Up
				</button>
			</div>
			<div className='flex w-[90%] h-fit mx-auto md:w-[80%] lg:w-[60%] shadow-amber-50 mt-2  bg-white p-2 text-black'>
				{action === "signIn" ? (
					<Login tenantId={tenantId && tenantId} />
				) : (
					action === "signUp" && <SignUp setState={setAction} />
				)}
			</div>
		</div>
	);
};

export default Index;
