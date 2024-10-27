import { Modal } from 'antd'
import React from 'react'
import StudentForm from '../student-form/StudentForm'
import TeacherForm from '../teacher-form/TeacherForm'

const ModalComponent = ({
	title,
	isModalOpen,
	handleOk,
	handleCancel,
	selected,
	modalLoading,
	form,
}) => {
	return (
		<>
			<Modal
				title={`${title}s ${selected === null ? 'added' : 'save'} modal`}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText={
					selected === null
						? `Added ${title.toLowerCase()}`
						: `Save ${title.toLowerCase()}`
				}
				maskClosable={false}
				confirmLoading={modalLoading}
			>
				{title.toLowerCase() === 'teacher' ? (
					<TeacherForm form={form} handleOk={handleOk} />
				) : (
					<StudentForm form={form} handleOk={handleOk} />
				)}
			</Modal>
		</>
	)
}

export default ModalComponent
