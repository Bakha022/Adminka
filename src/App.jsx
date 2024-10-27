import React, { Fragment, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout'
import { IS_LOGIN } from './constants'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import NotFound from './pages/NotFound'
import StudentItemsPage from './pages/StudentItemsPage'
import StudentsPage from './pages/StudentsPage'
import TeachersPage from './pages/TeachersPage'
const App = () => {
	const [isLogin, setIsLogin] = useState(
		Boolean(localStorage.getItem(IS_LOGIN)) || false
	)
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Navigate to={'/login'} />} />
				<Route path='login' element={<LoginPage setIsLogin={setIsLogin} />} />
				{isLogin ? (
					<Fragment>
						<Route element={<AdminLayout setIsLogin={setIsLogin} />}>
							<Route path='dashboard' element={<Dashboard />} />
							<Route path='teachers' element={<TeachersPage />} />
							<Route
								path='teachers/students/:id'
								element={<StudentItemsPage />}
							/>
							<Route path='students/:id' element={<StudentsPage />} />
						</Route>
					</Fragment>
				) : null}
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
