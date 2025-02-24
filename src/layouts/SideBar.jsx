import React, { useEffect, useState } from "react";
import {
	Menu,
	LayoutDashboard,
	Users,
	Settings,
	LogOutIcon,
	LogOut,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

const SideBar = ({ isOpen }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [token, setToken] = useState("");

	const navigate = useNavigate();
	const logout = () => {
		localStorage.clear();
		navigate("/");
	};

	const toggleSidebarHandler = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	useEffect(() => {
		const checkToken = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				navigate("/");
			} else {
				setToken(token);
			}
		};
		checkToken();
	}, []);
	return (
		<div
			className={`bg-gray-900 text-white h-screen p-5 ${
				isSidebarOpen ? "w-64" : "w-20"
			} transition-all duration-300`}
		>
			<button onClick={toggleSidebarHandler} className='mb-5'>
				<Menu size={24} />
			</button>
			<nav className='flex flex-col space-y-4'>
				<Link
					to={`/dashboard/${token}`}
					className='flex items-center space-x-3'
				>
					<LayoutDashboard />
					{isSidebarOpen && <span>Dashboard</span>}
				</Link>
				<Link to={`/profile/${token}`} className='flex items-center space-x-3'>
					<Users />
					{isSidebarOpen && <span>Users</span>}
				</Link>

				<button onClick={logout} className='flex items-center space-x-3'>
					<LogOut />
					{isSidebarOpen && <span>Logout</span>}
				</button>
			</nav>
		</div>
	);
};

export default SideBar;
