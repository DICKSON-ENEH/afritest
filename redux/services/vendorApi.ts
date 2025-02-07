import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../Store/Store'
import { VendorInfo, VendorInfoResponse } from '../../utils/types'

export const vendorApi = createApi({
	reducerPath: 'vendorApi',
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
		addVendor: build.mutation<any, VendorInfo>({
			query: (data: VendorInfo) => ({
				url: `/vendor`,
				method: 'POST',
				body: data,
			}),
		}),
		getVendors: build.query<VendorInfoResponse, void>({
			query: () => ({
				url: '/vendor',
				method: 'GET',
			}),
		}),
	}),
})

export const { useAddVendorMutation, useGetVendorsQuery } = vendorApi
