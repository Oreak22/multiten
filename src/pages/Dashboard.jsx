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
	const [searchInput, setSearchInput] = useState("");
	const { token } = useParams();
	const [searchResult, setSearchResult] = useState([]);
	const [showAddUser, setShowAddUser] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const navigate = useNavigate();

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
				setData(response.data);
				localStorage.setItem("multiten", JSON.stringify(response.data));
			})
			.catch((error) => {
				setError(error.response?.data?.error || "An error occurred");
				if (error.response?.data?.error === "Invalid or expired token")
					navigate("/");
			})
			.finally(() => setLoading(false));
	}, [navigate, token]);

	useEffect(() => {
		if (searchInput.length > 0) {
			setSearchResult(data.filter((user) => user.email.includes(searchInput)));
		} else {
			axios
				.get(
					"https://multi-tenancy-system-server-2.onrender.com/api/users/fetchall",
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				)
				.then((response) => {
					setSearchResult(
						response.data.filter((user) => user.email !== data.email),
					);
				})
				.catch(() => {});
		}
	}, [searchInput, deleting, showAddUser, token, data]);

	const handleDeleteUser = async (userId) => {
		setDeleting(true);
		try {
			await axios.delete(
				`http://localhost:3001/api/users/delete/${userId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			);
		} catch {
		} finally {
			setDeleting(false);
		}
	};

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen text-blue-500 text-lg font-semibold'>
				Loading...
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex justify-center items-center h-screen text-red-500 text-lg font-semibold'>
				{error}
			</div>
		);
	}

	return (
		<div className='flex h-screen bg-gray-50'>
			<SideBar />
			<div className='flex-1 p-3 md:p-8 bg-white shadow-lg rounded-lg md:mx-6 my-4 overflow-y-auto'>
				<h1 className='text-3xl font-bold text-gray-800 mb-6'>Dashboard</h1>
				<p className='text-lg text-gray-700'>
					Welcome,{" "}
					<span className='font-semibold text-blue-600'>{data.name}</span>.
				</p>

				<div className='mt-8'>
					<h3 className='text-lg font-semibold text-blue-600 mb-2'>
						Search User Email:
					</h3>
					<div className='flex items-center border border-gray-300 rounded-md p-2'>
						<input
							type='text'
							placeholder='Enter email...'
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							className='flex-1 outline-none bg-transparent px-2 text-gray-700'
						/>
						<button className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
							<SearchIcon size={20} />
						</button>
					</div>
				</div>

				<div className='mt-6'>
					<h2 className='text-xl font-semibold text-gray-800 mb-3'>
						Users in this Space
					</h2>
					{searchResult.length === 0 ? (
						<p className='text-gray-500 mt-2'>No users found</p>
					) : (
						searchResult.map((user) => (
							<div
								key={user.email}
								className='flex justify-between items-center p-4 border border-gray-300 bg-white shadow-md rounded-lg mt-2'
							>
								<span className='text-gray-800 font-medium capitalize'>
									{user.name}
								</span>
								{data.role === "ADMIN" && (
									<button
										className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed'
										onClick={() => handleDeleteUser(user.id)}
										disabled={deleting}
									>
										Delete
									</button>
								)}
							</div>
						))
					)}
				</div>

				{data.role === "ADMIN" && (
					<div className='text-center mt-8'>
						{showAddUser && <AddUser state={setShowAddUser} />}
						<button
							className='bg-gray-700 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-md'
							onClick={() => setShowAddUser(!showAddUser)}
						>
							{showAddUser ? "Cancel" : "Add User"}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
