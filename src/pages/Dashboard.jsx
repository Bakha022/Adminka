import { Typography } from 'antd'
import React from 'react'

const Dashboard = () => {
	const { Title } = Typography
	return (
		<>
			<Title level={2}>Dashboard Page</Title>
			<img
				style={{ userSelect: 'none' }}
				src='/Frame.svg'
				alt='dashboard-img'
			/>
		</>
	)
}

export default Dashboard
