import React, { useEffect, useState } from "react";
import { LayoutDashboard, Users, LogOut, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SidebarAndBottomNav = () => {
	const [token, setToken] = useState("");
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const navigate = useNavigate();

	const logout = () => {
		localStorage.clear();
		navigate("/");
	};

	useEffect(() => {
		const checkToken = async () => {
			const storedToken = localStorage.getItem("token");
			if (!storedToken) {
				navigate("/");
			} else {
				setToken(storedToken);
			}
		};
		checkToken();
	}, [navigate]);

	return (
		<>
			{/* Sidebar for medium screens */}
			<div className='hidden md:flex md:flex-col md:w-64 bg-gray-900 text-white h-screen p-5 transition-all duration-300'>
			
				<nav className='flex flex-col space-y-4'>
					<Link
						to={`/dashboard/${token}`}
						className='flex items-center space-x-3'
					>
						<LayoutDashboard />
						<span>Dashboard</span>
					</Link>
					<Link
						to={`/profile/${token}`}
						className='flex items-center space-x-3'
					>
						<Users />
						<span>Users</span>
					</Link>
					<button onClick={logout} className='flex items-center space-x-3'>
						<LogOut />
						<span>Logout</span>
					</button>
				</nav>
			</div>

			{/* Bottom Navigation for large screens */}
			<div className='fixed bottom-0 left-0 w-full bg-gray-900 text-white flex justify-around py-3 shadow-lg md:hidden'>
				<Link to={`/dashboard/${token}`} className='flex flex-col items-center'>
					<LayoutDashboard size={24} />
					<span className='text-xs'>Dashboard</span>
				</Link>
				<Link to={`/profile/${token}`} className='flex flex-col items-center'>
					<Users size={24} />
					<span className='text-xs'>Users</span>
				</Link>
				<button onClick={logout} className='flex flex-col items-center'>
					<LogOut size={24} />
					<span className='text-xs'>Logout</span>
				</button>
			</div>
		</>
	);
};

export default SidebarAndBottomNav;
