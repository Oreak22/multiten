import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import Dashboard from "../pages/Dashboard";
import EditProfie from "../pages/EditProfie";

function App() {
	const [count, setCount] = useState(0);

	return (
		<Routes>
			<Route path='/' element={<Index />} />
			<Route path='/:tenantId' element={<Index />} />
			<Route path='/dashboard/:token' element={<Dashboard />}/>
			<Route path='/profile/:token' element={<EditProfie />}/>
		</Routes>
	);
}

export default App;
