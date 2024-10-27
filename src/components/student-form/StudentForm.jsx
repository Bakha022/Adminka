import { Checkbox, Form, Input } from 'antd'
import React from 'react'

const StudentForm = ({form, handleOk}) => {
	return (
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
						isWork: false,
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
						label='Phone number'
						name='phoneNumber'
						rules={[
							{
								required: true,
								message: 'Please input your Phone number!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Email'
						name='email'
						rules={[
							{
								required: true,
								message: 'Please input your email!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label='Date of birthday'
						name='birthday'
						rules={[
							{
								required: true,
								message: 'Please input your birthday!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name='isWork'
						valuePropName='checked'
						wrapperCol={{
							span: 12,
						}}
					>
						<Checkbox>Is work</Checkbox>
					</Form.Item>

					<Form.Item
						name='IsMerried'
						valuePropName='checked'
						wrapperCol={{
							span: 12,
						}}
					>
						<Checkbox>Is Married</Checkbox>
					</Form.Item>
				</Form>
	)
}

export default StudentForm