import {
	DashboardOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	TeamOutlined,
	UploadOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, Modal, theme } from 'antd'
import React, { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'
import { IS_LOGIN } from '../../constants'
import './Layout.css'
const { Header, Sider, Content } = Layout

const AdminLayout = ({ setIsLogin }) => {
	const location = useLocation()
	const navigate = useNavigate()
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken()

	const logout = () => {
		Modal.confirm({
			title: 'Log Out User',
			content: 'Are you sure you want to log out?',
			onOk: () => {
				navigate('/login')
				setIsLogin(false)
				localStorage.removeItem(IS_LOGIN)
			},
		})
	}
	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className='demo-logo-vertical' />
				<h2
					style={{
						color: 'white',
						textAlign: 'center',
						marginTop: '25px',
						fontSize: '18px',
					}}
				>
					Adminka
				</h2>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={[location.pathname]}
					items={[
						{
							key: '/dashboard',
							icon: <DashboardOutlined />,
							label: <Link to={'/dashboard'}>Dashboard</Link>,
						},
						{
							key: '/teachers',
							icon: <UserOutlined />,
							label: <Link to={'/teachers'}>Teachers</Link>,
						},
						{
							key: '/students',
							icon: <TeamOutlined />,
							label: <Link to={'/students'}>Students</Link>,
						},
						{
							key: '4',
							icon: <UploadOutlined />,
							label: (
								<Button onClick={logout} danger type='primary' to={'/students'}>
									Log out
								</Button>
							),
						},
					]}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				>
					<Button
						type='text'
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	)
}

AdminLayout.propTypes = {
	setIslogin: PropTypes.func,
}
export default AdminLayout
