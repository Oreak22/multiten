import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const AddUser = () => {
	const { token } = useParams();
	const [name, setname] = useState("");
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [error, seterror] = useState("");
	const [success, setsuccess] = useState("");
	const [loading, setloading] = useState(false);

	const handleAddUser = async (e) => {
		e.preventDefault();
		setloading(true);
		seterror("");
		setsuccess("");
		if (!name || !email || !password) {
			seterror("Please fill all fields");
			setloading(false);
			return;
		}
		try {
			const response = await axios.post(
				"https://multi-tenancy-system-server-2.onrender.com/api/users/create",
				{ name, email, password },
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			);
			setsuccess(response.data.message);
		} catch (error) {
			console.log('error');
		} finally {
			setloading(false);
		}
	};
	return (
		<div>
			<div className='flex-1 p-6 bg-gray-100'>
				{success ? (
					<div className='text-green-500 text-center'>{success}</div>
				) : (
					<div>
						<h1 className='text-2xl font-bold mb-4'>Add User</h1>
						<form onSubmit={handleAddUser}>
							{error && <p className='text-red-500 text-center'>{error}</p>}
							<div className='flex flex-col mt-5'>
								<div className='flex flex-col'>
									<label className='text-gray-700 font-bold mb-2'>Name</label>
									<input
										required
										type='text'
										onChange={(e) => setname(e.target.value)}
										className='border border-gray-300 rounded-md p-2 mb-4'
										value={name}
									/>
								</div>
								<div className='flex flex-col'>
									<label className='text-gray-700 font-bold mb-2'>Email</label>
									<input
										required
										onChange={(e) => setemail(e.target.value)}
										type='email'
										className='border border-gray-300 rounded-md p-2 mb-4'
										value={email}
									/>
								</div>
								<div className='flex flex-col'>
									<label className='text-gray-700 font-bold mb-2'>
										Password
									</label>
									<input
										required
										onChange={(e) => setpassword(e.target.value)}
										type='password'
										className='border border-gray-300 rounded-md p-2 mb-4'
										value={password}
									/>
								</div>
								<div className='text-center'>
									<button
										className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
										onClick={handleAddUser}
										disabled={loading}
									>
										{loading ? "Adding..." : "Add User"}
									</button>
								</div>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default AddUser;
