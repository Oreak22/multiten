import React, { useEffect, useMemo, useState } from "react";
import SideBar from "../layouts/SideBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import AddUser from "../layouts/AddUser";

const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [error, setError] = useState("");
	const [SearchInput, setSearchInput] = useState("");
	const { token } = useParams();
	const [searchResult, setSearchResult] = useState([]);
	const [showAddUser, setShowAddUser] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	const otherUsers = useMemo(async () => {
		if (SearchInput.length > 0) {
			return setSearchResult([data]);
		} else {
			try {
				const others = await axios.get(
					"https://multi-tenancy-system-server-2.onrender.com/api/users/fetchall",
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				);
				const filteredData = await others.data.filter(
					(user) => user.email !== data.email,
				);
				return setSearchResult(filteredData);
			} catch (err) {}
		}
	}, [SearchInput, deleting, showAddUser]);
	useEffect(() => {
		setLoading(true);
		axios
			.get(
				"https://multi-tenancy-system-server-2.onrender.com/api/users/fetch",
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			.then((response) => {
				// handle success
				setData(response.data);
				setLoading(false);
				localStorage.multiten = JSON.stringify(response.data);
			})
			.catch((error) => {
				// handle error
				setError(error.response.data.error);
				if (error.response.data.error === "Invalid or expired token")
					navigate("/");
				setLoading(false);
			})
			.finally(() => {
				// always executed
			});
	}, []);

	const handleDeleteUser = async (userId) => {
		setDeleting(true);
		try {
			const del = await axios.delete(
				`https://multi-tenancy-system-server-2.onrender.com/api/users/delete/${userId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			);
		} catch (err) {
		} finally {
			setDeleting(false);
		}
	};

	if (loading || error) {
		return (
			<div className='w-full h-screen flex justify-center items-center align-middle'>
				<div className={`${error ? "text-red-500" : "text-blue-500"}`}>
					{" "}
					{loading ? "Loading.." : error}.
				</div>
			</div>
		);
	} else {
		return (
			<div className='flex h-screen'>
				<SideBar />
				<div className='flex-1 p-6 bg-gray-100'>
					<h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
					<div className=''>
						Welcome <span className='font-bold text-blue-500'>{data.name}</span>
						.
					</div>
					<div className='mt-4'>
						<h3 className='font-bold text-blue-500'>Search User email:</h3>
						<div className='flex'>
							<input
								type='text'
								onChange={(e) => setSearchInput(e.target.value)}
								className='border-b-2 border-blue-500 p-2 w-full outline-none focus:outline-none focus:border-blue-500'
							/>
							<button
								className='ml-3 hover:cursor-pointer p-3 hover:bg-blue-500 rounded-sm'
								onClick={() => otherUsers}
							>
								<SearchIcon size={20} />
							</button>
						</div>
						<div className='mt-2'>
							<h2 className='font-bold'>Users on this space</h2>
							{searchResult == [] ? (
								<p className='mb-5'> No users found</p>
							) : (
								searchResult.map((user) => (
									<div
										className='capitalize border-b-2 border-blue-500 p-2 shadow-blue-600 shadow-sm mb-1 flex justify-between'
										key={user.email}
									>
										{user.name}
										{data.role == "ADMIN" && (
											<div className='flex g-4'>
												<button
													className='bg-red-500 hover:bg-red-300 cursor-pointer px-3 py-2 text-white rounded-sm disabled:bg-red-200 disabled:cursor-not-allowed'
													onClick={() => handleDeleteUser(user.id)}
													disabled={deleting}
												>
													Delete
												</button>
											</div>
										)}
									</div>
								))
							)}
						</div>
						{data.role == "ADMIN" && (
							<>
								{showAddUser && <AddUser state={setShowAddUser} />}
								<div className='text-center mt-5'>
									<button
										className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
										onClick={() => setShowAddUser(!showAddUser)}
									>
										{showAddUser ? "Cancle" : "Add User"}
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		);
	}
};

export default Dashboard;
