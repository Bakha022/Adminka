import { Button, Flex, Form, Input, message } from 'antd'
import axios from 'axios'
import PropTypes from 'prop-types'

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IS_LOGIN } from '../constants'

const LoginPage = ({ setIsLogin }) => {
	const navigate = useNavigate()

	const onFinish = values => {
		const req = async datas => {
			try {
				const { data } = await axios.post('https://reqres.in/api/login', datas)
				localStorage.setItem(IS_LOGIN, data.token)
				setIsLogin(true)
				navigate('/dashboard')
				message.success('Login successful!')
			} catch (error) {
				message.error('An error occurred during login!')
				console.log(error)
			}
		}
		req(values)
	}

	return (
		<Flex style={{ height: '100dvh' }} align='center' justify='center'>
			<Form
				name='basic'
				labelCol={{
					span: 24,
				}}
				wrapperCol={{
					span: 24,
				}}
				style={{
					maxWidth: 400,
				}}
				onFinish={onFinish}
				autoComplete='off'
			>
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
					label='Password'
					name='password'
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					wrapperCol={{
						span: 24,
					}}
				>
					<Button style={{ width: '100%' }} type='primary' htmlType='submit'>
						Log in
					</Button>
				</Form.Item>
			</Form>
		</Flex>
	)
}

LoginPage.propTypes = {
	setIslogin: PropTypes.func,
}

export default LoginPage
