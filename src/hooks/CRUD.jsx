import { Form, Modal } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { LIMIT } from '../constants'
import request from '../servers/request'

const CRUD = (url, dataName) => {
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
			const { data } = await request.get(url, { params })
			const { data: totalData } = await request.get(url)

			setTotal(totalData.length)

			setFetchData(data)
		} catch (error) {
			setErrorData(error)
		} finally {
			setLoading(false)
		}
	}, [activePage, url])

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
				await request.post(url, values)
			} else {
				await request.put(`${url}/${selected}`, values)
			}
			getData()
			setIsModalOpen(false)
		} catch (error) {
			console.log(error.response?.data)
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
			let { data } = await request.get(`${url}/${id}`)
			form.setFieldsValue(data)
		} catch (error) {
			console.log(error)
		}
	}

	const handleDelete = ({ id }) => {
		Modal.confirm({
			title: `Deleted ${dataName}`,
			content: `Do you want to deleted this ${dataName}?`,
			onOk: async () => {
				try {
					await request.delete(`${url}/${id}`)
					getData()
				} catch (error) {
					console.log(error)
				}
			},
		})
	}
	return {
		fetchData,
		loading,
		isModalOpen,
		activePage,
		total,
		selected,
		form,
		modalLoading,
		setActivePage,
		showModal,
		handleOk,
		handleCancel,
		handleEdit,
		handleDelete,
	}
}

export default CRUD
