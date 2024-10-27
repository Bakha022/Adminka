import { Flex, Pagination } from 'antd'
import React from 'react'

const PaginationComponents = ({ total, activePage, setActivePage }) => {
	return (
		<>
			<Flex style={{ marginTop: '20px' }} justify='end'>
				<Pagination
					total={total}
					current={activePage}
					onChange={page => setActivePage(page)}
				/>
			</Flex>
		</>
	)
}

export default PaginationComponents
