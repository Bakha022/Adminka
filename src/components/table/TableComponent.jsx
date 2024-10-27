import { Button, Flex, Table, Typography } from 'antd'

import React, { Fragment } from 'react'

const TableComponent = ({
	title,
	total,
	showModal,
	loading,
	fetchData,
	columns,
}) => {
	const { Title } = Typography
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
							<Title level={2}>
								{title}s Page ({total})
							</Title>
							<Button onClick={showModal} type='dashed'>
								Add {title}
							</Button>
						</Flex>
					</Fragment>
				)}
				columns={columns}
				loading={loading}
				dataSource={fetchData}
				rowKey='id'
			/>
		</>
	)
}

export default TableComponent
