import { Button, Image, Space, Typography } from 'antd'
import { React } from 'react'
import { useParams } from 'react-router-dom'
import ModalComponent from '../components/modal/ModalComponent'
import PaginationComponents from '../components/pagination/PaginationComponents'
import TableComponent from '../components/table/TableComponent'
import CRUD from '../hooks/CRUD'

const StudentItemsPage = () => {
	const { id } = useParams()

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
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			render: data => data,
		},
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
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			render: link => <a href={`mailto:${link}`}> {link} </a>,
		},

		{
			title: 'Birthday',
			dataIndex: 'birthday',
			key: 'birthday',
			render: data => data.slice(0, 10),
		},

		{
			title: 'Phone number',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
			render: link => <a href={`tel:${link}`}> {link} </a>,
		},
		{
			title: 'Is merried',
			dataIndex: 'IsMerried',
			key: 'IsMerried',
			render: data => (data ? 'Yes' : 'No'),
		},
		{
			title: 'Is work',
			dataIndex: 'isWork',
			key: 'isWork',
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

	const tablePorps = { total, showModal, loading, fetchData, columns }
	const paginationProps = { total, activePage, setActivePage }
	const modalProps = {
		isModalOpen,
		handleOk,
		handleCancel,
		selected,
		modalLoading,
		form,
	}

	return (
		<>
			<TableComponent {...tablePorps} title={'Student'} />
			<PaginationComponents {...paginationProps} />
			<ModalComponent {...modalProps} title={'Student'} />
		</>
	)
}

export default StudentItemsPage
