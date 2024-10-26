import {
	Button,
	Checkbox,
	Flex,
	Form,
	Image,
	Input,
	Modal,
	Pagination,
	Space,
	Table,
	Typography,
} from 'antd'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LIMIT } from '../constants'
import request from '../servers/request'

const TeachersPage = () => {
	const { Title } = Typography

	const [fetchData, setFetchData] = useState([])
	const [loading, setLoading] = useState(false)
	const [errorData, setErrorData] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [activePage, setActivePage] = useState(1)
	const [total, setTotal] = useState(0)
	const [selected, setSelected] = useState(null)
	const [modalLoading, setmodalLoading] = useState(false)
	const [form] = Form.useForm()

	const getData = useCallback(async () => {
		try {
			setLoading(true)
			let params = {
				page: activePage,
				limit: LIMIT,
			}
			const { data } = await request.get('teachers', { params })
			const { data: totalData } = await request.get('teachers')

			setTotal(totalData.length)

			setFetchData(data)
		} catch (error) {
			setErrorData(error)
		} finally {
			setLoading(false)
		}
	}, [activePage])

	useEffect(() => {
		getData()
	}, [getData])

	const showModal = () => {
		setSelected(null)
		setIsModalOpen(true)
		form.resetFields()
	}
	const handleOk = async () => {
		try {
			setmodalLoading(true)
			let values = await form.validateFields()
			if (selected === null) {
				await request.post('teachers', values)
			} else {
				await request.put(`teachers/${selected}`, values)
			}
			getData()
			setIsModalOpen(false)
		} catch (error) {
			console.log(error)
		} finally {
			setmodalLoading(false)
		}
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const handleEdit = async ({ id }) => {
		try {
			setIsModalOpen(true)
			setSelected(id)
			let { data } = await request.get(`teachers/${id}`)
			form.setFieldsValue(data)
		} catch (error) {
			console.log(error)
		}
	}

	const handleDelete = ({ id }) => {
		Modal.confirm({
			title: 'Deleted Teacher',
			content: 'Do you want to deleted this teacher?',
			onOk: async () => {
				try {
					await request.delete(`teachers/${id}`)
					getData()
				} catch (error) {
					console.log(error)
				}
			},
		})
	}

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
			key: 'id',
			render: id => (
				<Space size='middle'>
					<Button onClick={() => handleEdit(id)} type='primary'>
						Edit
					</Button>
					<Button onClick={() => handleDelete(id)} danger type='primary'>
						Deleted
					</Button>
					<Link to={`students/${id.id}`}>Students</Link>
				</Space>
			),
		},
	]

	return (
		<>
			<Table
				pagination={false}
				scroll={{
					x: 1000,
				}}
				title={() => (
					<Fragment>
						<Flex align='center' justify='space-between'>
							<Title level={2}>Teachers Page ({total})</Title>
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
			<Flex style={{ marginTop: '20px' }} justify='end'>
				<Pagination
					total={total}
					current={activePage}
					onChange={page => setActivePage(page)}
				/>
			</Flex>
			<Modal
				title='Teachers added modal'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText={selected === null ? 'Added teacher' : 'Save teacher'}
				maskClosable={false}
				confirmLoading={modalLoading}
			>
				<Form
					labelCol={{
						span: 24,
					}}
					wrapperCol={{
						span: 24,
					}}
					autoComplete='off'
					initialValues={{
						IsMerried: false,
					}}
					form={form}
					onFinish={handleOk}
				>
					<Form.Item
						label='First name'
						name='firstName'
						rules={[
							{
								required: true,
								message: 'Please input your First name!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Last name'
						name='lastName'
						rules={[
							{
								required: true,
								message: 'Please input your Last name!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Image'
						name='avatar'
						rules={[
							{
								required: true,
								message: 'Please input your image!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						name='IsMerried'
						valuePropName='checked'
						wrapperCol={{
							span: 24,
						}}
					>
						<Checkbox>Is Married</Checkbox>
					</Form.Item>

					<Form.Item
						wrapperCol={{
							span: 24,
						}}
					></Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default TeachersPage
