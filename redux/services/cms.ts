import { CMSResponse, iCMS, iDraft, singleCMSResponse } from '../../utils/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState, store } from '../Store/Store'

export const cmsApi = createApi({
	reducerPath: 'cmsApis',

	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
		prepareHeaders: (header: Headers) => {
			const token: any = store.getState().user.user

			if (token) {
				header.set('Authorization', `Bearer ${token.user as any}`)
			}

			return header
		},
	}),
	endpoints: (build) => ({
		addCMS: build.mutation<iCMS, iCMS>({
			query: (body) => ({
				url: '/cms',
				method: 'POST',
				body,
			}),
		}),
		saveDraft: build.mutation<iDraft, iDraft>({
			query: (body) => ({
				url: '/cms/save-draft',
				method: 'POST',
				body,
			}),
		}),
	}),
})

export const cmsGetApi = createApi({
	reducerPath: 'cmsGetApis',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
		prepareHeaders: (headers, { getState }) => {
			const token: any = store.getState().user.user
			if (token) {
				headers.set('Authorization', `Bearer ${token.user}`)
			}
			return headers
		},
	}),
	endpoints: (build) => ({
		getCMS: build.query<any, CMSResponse>({
			query: () => ({
				url: '/cms',
				method: 'GET',
			}),
		}),
	}),
})

export const cmsDeleteApi = createApi({
	reducerPath: 'cmsDeleteApis',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
		prepareHeaders: (headers: Headers) => {
			const token: any = store.getState().user.user
			if (token) {
				headers.set('Authorization', `Bearer ${token.user}`)
			}
			return headers
		},
	}),
	endpoints: (build) => ({
		deleteCMS: build.mutation<{ id: string }, any>({
			query: (id) => ({
				url: `/cms/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
})

export const cmsGetContentByIdApi = createApi({
	reducerPath: 'cmsGetContentByIdApis',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
		prepareHeaders: (headers: Headers) => {
			const token: any = store.getState().user.user
			if (token) {
				headers.set('Authorization', `Bearer ${token.user}`)
			}
			return headers
		},
	}),
	endpoints: (build) => ({
		getContentByID: build.query<singleCMSResponse, string>({
			query: (id) => ({
				url: `/cms/${id}`,
				method: 'GET',
			}),
		}),
	}),
})

export const cmsUpdateApi = createApi({
	reducerPath: 'cmsUpdateApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
		prepareHeaders: (headers: Headers) => {
			const token: any = store.getState().user.user
			if (token) {
				headers.set('Authorization', `Bearer ${token.user}`)
			}
			return headers
		},
	}),
	endpoints: (build) => ({
		updateCMS: build.mutation<CMSResponse, any>({
			query: (data: { id: string; body: iCMS }) => {
				const { id, body } = data
				return {
					url: `/cms/${id}`,
					method: 'PUT',
					body,
				}
			},
		}),
	}),
})

export const { useGetCMSQuery } = cmsGetApi
export const { useAddCMSMutation,useSaveDraftMutation } = cmsApi
export const { useDeleteCMSMutation } = cmsDeleteApi
export const { useGetContentByIDQuery } = cmsGetContentByIdApi
export const { useUpdateCMSMutation } = cmsUpdateApi
