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
import { Fragment, React } from 'react'
import { useParams } from 'react-router-dom'
import CRUD from '../hooks/CRUD'

const StudentItemsPage = () => {
	const {id} = useParams()

	const { Title } = Typography
	const {
		handleEdit,
		handleDelete,
		total,
		showModal,
		loading,
		fetchData,
		activePage,
		setActivePage,
		isModalOpen,
		handleCancel,
		handleOk,
		selected,
		modalLoading,
		form,
	} = CRUD(`teachers/${id}/students`, 'student')

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
							<Title level={2}>Single Student Page ({total})</Title>
							<Button onClick={showModal} type='dashed'>
								Add Student
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

export default StudentItemsPage
