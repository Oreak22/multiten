import React, { useEffect, useState } from "react";
import SideBar from "../layouts/SideBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProfie = () => {
	const { token } = useParams();
	const [data, setData] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, sertSuccess] = useState("");
	const fetchData = async () => {
		try {
			const res = await axios.get("https://multi-tenancy-system-server-2.onrender.com/api/users/fetch", {
				headers: { Authorization: `Bearer ${token}` },
			});
			console.log(res.data);
			setData(res.data);
			setName(res.data.name);
			setEmail(res.data.email);
		} catch (error) {
			setError(error.message);
			console.log(error);
		}
	};

	const handleUpdate = async (e) => {
		setError("");
		setLoading(true);
		const local = localStorage.getItem("multiten");
		const userId = JSON.parse(local)._id;
		try {
			e.preventDefault();
			const res = await axios.post(
				"https://multi-tenancy-system-server-2.onrender.com/api/users/update",
				{ name, email, password }, // Request body (data being sent)
				{
					headers: { Authorization: `Bearer ${token}` }, // Headers
				},
			);

			console.log(res.data);
			setData(res.data.user)
            sertSuccess(res.data.message);
		} catch (error) {
			console.log(error);
			setError(error.response.data.error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!token) navigate("/");
		fetchData();
	}, []);
	return (
		<div className='flex h-screen'>
			<SideBar />
			<div className='flex-1 p-6 bg-gray-100'>
				<h1 className='text-2xl font-bold mb-4'>Edit Profile</h1>
				{success && <p className='text-green-500 text-center'>{success}</p>}
				{error && <p className='text-red-500 text-center'>{error}</p>}
				<div className='flex flex-col mt-5'>
					<div className='flex flex-col'>
						<label className='text-gray-700 font-bold mb-2'>Name</label>
						<input
							type='text'
							className='border border-gray-300 rounded-md p-2 mb-4'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className='flex flex-col'>
						<label className='text-gray-700 font-bold mb-2'>Email</label>
						<input
							disabled
							type='email'
							className='border border-gray-300 rounded-md p-2 mb-4'
							value={email}
						/>
					</div>
					<div className='flex flex-col'>
						<label className='text-gray-700 font-bold mb-2'>Password</label>
						<input
							type='password'
							className='border border-gray-300 rounded-md p-2 mb-4'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className='text-center'>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-blue-200'
							onClick={handleUpdate}
                            disabled={loading}
						>
							{loading ? "Updating..." : "Update"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfie;
