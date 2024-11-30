// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { iAuth } from "../../utils/types";
import {
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setUserStatus } from "../slices/userSlice";

type PostsResponse = iAuth[];

export const authApi = createApi({
	reducerPath: "postsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
	}),
	tagTypes: ["auth"],
	endpoints: (build) => ({
		addPost: build.mutation<iAuth, Partial<iAuth>>({
			query(body) {
				return {
					url: `post`,
					method: "POST",
					body,
				};
			},

			invalidatesTags: [{ type: "auth", id: "LIST" }],
		}),
		getPost: build.query<iAuth, number>({
			query: (id) => `post/${id}`,
			providesTags: (result, error, id) => [{ type: "auth", id }],
		}),
		signUp: build.mutation<iAuth, Partial<iAuth>>({
			query(data) {
				const { first_name, last_name, email, password } = data;
				return {
					url: `/auth/register`,
					method: "POST",
					body: { first_name, last_name, email, password },
				};
			},

			invalidatesTags: (result, error) => [{ type: "auth" }],
		}),
		signIn: build.mutation<iAuth, Partial<iAuth>>({
			query(data) {
				const { email, password } = data;
				return {
					url: `/auth/login`,
					method: "POST",
					body: { email, password },
				};
			},
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					console.log(data)
					dispatch(
						setUserStatus({ isLoggedIn: true, user: data?.user! })
					);
				} catch (error) {
					// Handle error
					console.log(error);
				}
			},
			invalidatesTags: (result, error) => [{ type: "auth" }],
		}),
		verifyOtp: build.mutation<iAuth, Partial<iAuth>>({
			query(data) {
				const { code, email } = data;
				return {
					url: `/auth/verify-code`,
					method: "POST",
					body: { code, email },
				};
			},

			invalidatesTags: (result, error) => [{ type: "auth" }],
		}),

		resendOtp: build.mutation<iAuth, Partial<iAuth>>({
			query(data) {
				const { email } = data;
				return {
					url: `/auth/resend-code`,
					method: "POST",
					body: { email },
				};
			},

			invalidatesTags: (result, error) => [{ type: "auth" }],
		}),
	}),
});

export const {
	useAddPostMutation,
	useGetPostQuery,
	useSignUpMutation,
	useSignInMutation,
	useVerifyOtpMutation,
	useResendOtpMutation,
} = authApi;
