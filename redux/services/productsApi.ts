import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../Store/Store'
import {
	PackageCategoryResponse,
	SubPackageCategoryResponse,
	UpdatePackageType,
	UpdateResponseType,
} from '../../utils/types'

export const productsApi = createApi({
	reducerPath: 'productsApis',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
		prepareHeaders: (headers, { getState }) => {
			const token: any = (getState() as RootState).user.user
			if (token) {
				headers.set('Authorization', `Bearer ${token.user as any}`)
			}
			return headers
		},
	}),
	endpoints: (build) => ({
		getPackageCategory: build.query<PackageCategoryResponse, void>({
			query: () => ({
				url: '/packages',
				method: 'GET',
			}),
		}),
		addPackageCategory: build.mutation<any, any>({
			query: (body: {
				name: string
				description: string
				category_id: string
			}) => {
				const newBody = JSON.stringify(body)
				console.log('this is the body', newBody)
				return {
					url: '/packages',
					method: 'POST',
					body,
				}
			},
		}),

		getPackageCategoryById: build.query<
			PackageCategoryResponse,
			{ id: string }
		>({
			query: ({ id }) => ({
				url: `/packages/${id}`,
				method: 'GET',
			}),
		}),

		updatePackageCategory: build.mutation<
			UpdateResponseType,
			UpdatePackageType
		>({
			query: ({ id, body }) => {
				const newBody = JSON.stringify(body)
				console.log('this is the body', newBody)
				return {
					url: `/packages/${id}`,
					method: 'PUT',
					body,
				}
			},
		}),

		// Sub packages
		addSubPackageCategory: build.mutation<any, any>({
			query: (body: {
				name: string
				description: string
				category_id: string
			}) => {
				const newBody = JSON.stringify(body)
				console.log('this is the body', newBody)
				return {
					url: '/packages/subpackage',
					method: 'POST',
					body,
				}
			},
		}),
		getAllSubPackageCategory: build.query<SubPackageCategoryResponse, void>({
			query: () => ({
				url: '/packages/get-all-subpackage ',
				method: 'GET',
			}),
		}),
		getSubPackageCategoryById: build.query<
			SubPackageCategoryResponse,
			{ id: string }
		>({
			query: ({ id }) => ({
				url: `/packages/subpackage/${id}`,
				method: 'GET',
			}),
		}),

		deactivateSubPackageCategory: build.mutation<any, { id: string }>({
			query: ({ id }) => {
				return {
					url: `/packages/subpackage/status/deactivate/${id}`,
					method: 'PUT',
				}
			},
		}),

		activateSubPackageCategory: build.mutation<any, { id: string }>({
			query: ({ id }) => {
				return {
					url: `/packages/subpackage/status/activate/${id}`,
					method: 'PUT',
				}
			},
		}),

		deleteSubPackageCategory: build.mutation<any, { id: string }>({
			query: ({ id }) => ({
				url: `/packages/subpackage/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
})

export const {
	useGetPackageCategoryQuery,
	useAddPackageCategoryMutation,
	useUpdatePackageCategoryMutation,
	useAddSubPackageCategoryMutation,
	useGetAllSubPackageCategoryQuery,
	useActivateSubPackageCategoryMutation,
	useDeactivateSubPackageCategoryMutation,
	useDeleteSubPackageCategoryMutation,
} = productsApi
