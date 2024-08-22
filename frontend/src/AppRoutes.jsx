import { Route, Routes } from "react-router-dom"
import ButtonForm from "./pages/ButtonForm"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"

export default function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<Dashboard />} />
			<Route path='/create' element={<ButtonForm />} />
			<Route path='/edit/:id' element={<ButtonForm />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}
