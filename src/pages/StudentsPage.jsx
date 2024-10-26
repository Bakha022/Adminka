import axios from 'axios'
import React, { useEffect } from 'react'

const StudentsPage = () => {
	useEffect(() => {
		const getData = async () => {
			try {
				const data = await axios.get(
					'https://cors-anywhere.herokuapp.com/https://mockapi.io/api/mocks/6718e2bf7fc4c5ff8f4b8742/resources/671b2ee32c842d92c37ed395/data'
				)
				console.log(data)
			} catch (error) {
				console.log(error)
			}
		}

		getData()
	}, [])
	return <div>StudentsPage</div>
}

export default StudentsPage
