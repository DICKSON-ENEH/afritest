'use client'

import React, {useEffect} from 'react'
import OtherHeader from '../../../../components/static/OtherHeader'
// import OtherHeader from '@/components/static/OtherHeader'
// import Content from '@/components/CmsComponents/Content'
import Content from '../../../../components/CmsComponents/Content'

import { useGetContentByIDQuery } from '../../../../redux/services/cms'
import { useParams } from 'next/navigation'

function Page() {

	const { id:convert } = useParams()
	// console.log(id.toString())
	const id = convert.toString()
	console.log(id)
	const { data: post, isLoading, error } = useGetContentByIDQuery(id)
	console.log("this is single content", post)
	const postToEdit = post?.data.cms
	// console.log('Post to edit', post?.data.cms)

	return (
		<main className="w-full min-h-screen">
			<div className="mb-10 mt-">
				<OtherHeader />
			</div>
			<Content postToEdit={postToEdit} />
		</main>
	)
}

export default Page
