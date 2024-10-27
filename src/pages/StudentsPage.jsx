import React from 'react'
import StudentItemsPage from './StudentItemsPage'

import { Typography } from 'antd'
const { Text } = Typography

const StudentsPage = () => {
	return (
		<>
			<Text style={{ marginLeft: '10px' }}>
				Since we can't get all students from mock api, only data with 2-category
				is coming 😔
			</Text>
			<StudentItemsPage />
		</>
	)
}

export default StudentsPage
