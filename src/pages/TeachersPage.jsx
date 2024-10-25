import { Button, Flex, Image, Modal, Space, Table, Typography } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import request from '../servers/request'

const TeachersPage = () => {
	const { Title } = Typography

	const [fetchData, setFetchData] = useState([])
	const [loading, setLoading] = useState(false)
	const [errorData, setErrorData] = useState(null)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const showModal = () => {
		setIsModalOpen(true)
	}
	const handleOk = () => {
		setIsModalOpen(false)
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}

	useEffect(() => {
		const getData = async () => {
			try {
				setLoading(true)
				const { data } = await request.get('teachers')

				setFetchData(data)
			} catch (error) {
				setErrorData(error)
			} finally {
				setLoading(false)
			}
		}

		getData()
	}, [])

	const columns = [
		{
			title: 'Avatar',
			dataIndex: 'avatar',
			key: 'avatar',
			render: data => <Image width={30} src={data} />,
		},
		{
			title: 'First name',
			dataIndex: 'firstName',
			key: 'firstName',
			render: text => text,
		},
		{
			title: 'Last name',
			dataIndex: 'lastName',
			key: 'lastName',
		},

		{
			title: 'Is merried',
			dataIndex: 'IsMerried',
			key: 'IsMerried',
			render: data => (data ? 'Yes' : 'No'),
		},
		{
			title: 'Action',
			key: 'action',
			render: () => (
				<Space size='middle'>
					<Button type='primary'>Edit</Button>
					<Button danger type='primary'>
						Deleted
					</Button>
				</Space>
			),
		},
	]

	return (
		<>
			<Table
				title={() => (
					<Fragment>
						<Flex align='center' justify='space-between'>
							<Title level={2}>Teachers Page</Title>
							<Button onClick={showModal} type='dashed'>
								Add Teacher
							</Button>
						</Flex>
					</Fragment>
				)}
				columns={columns}
				loading={loading}
				dataSource={fetchData}
				rowKey='id'
			/>
			<Modal
				title='Teachers added modal'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				
			</Modal>
		</>
	)
}

export default TeachersPage
