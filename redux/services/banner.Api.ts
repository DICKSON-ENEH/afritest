import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../Store/Store'
import {
	PackageCategoryResponse,
	SubPackageCategoryResponse,
	UpdatePackageType,
	UpdateResponseType,
} from '../../utils/types'

export const bannerApi = createApi({
	reducerPath: 'bannerApis',
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
		getBanners: build.query<any, void>({
			query: () => ({
				url: '/banner',
				method: 'GET',
			}),
		}),
		addBanners: build.mutation<any, any>({
			query: (body:any) => {
		
				return {
					url: '/banner',
					method: 'POST',
					body,
				}
			},
		}),

		
		  editBanner: build.mutation< any,  any>({
		  query: ({ selectedBanner, body }) => {
			//   const newBody = JSON.stringify(body)
			//   console.log('this is the body', newBody)
			  return {
				  url: `/banner/${selectedBanner}`,
				  method: 'PUT',
				  body,
			  }
		  },
	  }),
	  deleteProduct: build.mutation<any, { selectedBanner: string }>({
		query: ({ selectedBanner }) => ({
		  url: `/banner/${selectedBanner}`,
		  method: 'DELETE',
		}),
	  }),
	  





	getSingleBanner: build.query<any, { selectedBanner: string }>({
		query: ({ selectedBanner }) => ({
		  url: `/products/${selectedBanner}`,
		  method: 'GET',
		}),
	  }),

	
	
	}),
})

export const {
useAddBannersMutation
	
} = bannerApi
