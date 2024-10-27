import { Button, Image, Space } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import ModalComponent from '../components/modal/ModalComponent'
import PaginationComponents from '../components/pagination/PaginationComponents'
import TableComponent from '../components/table/TableComponent'
import CRUD from '../hooks/CRUD'

const TeachersPage = () => {
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
	} = CRUD('teachers', 'teacher')

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
			<TableComponent {...tablePorps} title={'Teacher'} />
			<PaginationComponents {...paginationProps} />
			<ModalComponent {...modalProps} title={'Teacher'} />
		</>
	)
}

export default TeachersPage
