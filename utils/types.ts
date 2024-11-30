import { iUser } from 'redux/slices/userSlice'
import { HTMLAttributes, ReactNode } from 'react'

export interface iSideData {
	name?: string
	route?: string
	icon?: ReactNode
}

export interface DraftItem {
	title: string
	description: string
	author: string
	dateCreated: string
}

export interface iAuth {
	first_name?: string
	last_name?: string
	email?: string
	password?: string
	user?: iUser
	code?: string
}

export interface iCMS {
	data?: {
		message?: string
	}
	status?: boolean
	title: string
	image: string
	caption: string
	url: string
	postDate: string | Date
	expiryDate: string | Date
	path: string[]
	platform: string
	description: string
	_id?: string
}
export interface iDraft extends Partial<iCMS>{
	author?: string
}

export interface CMSResponse {
	status: boolean
	data: {
		cms: iCMS[] | iCMS
		message: string
	}
}

export interface singleCMSResponse {
	status: boolean
	data: {
		cms: iCMS
		message: string
	}
}

interface VendorAccount {
	bank_name: string
	account_name: string
	account_number: string
}

export interface VendorInfo {
	data?: {
		message?: string
	}
	length?:any
	filter?:any
	first_name: string
	last_name: string
	email: string
	country: string
	phone_number: string
	business_name: string
	business_email: string
	business_country_location: string
	business_city: string
	business_phone_number: string
	business_category: string[]
	business_type: string[]
	business_logo_img: string
	business_cover_page_img: string
	business_support_phone_number: string
	business_support_email: string
	business_tax_identification_doc: string
	business_id_card_doc: string
	status?: boolean

	business_certificate_of_incorperation_doc: string
	business_menulist_of_product_doc: string
	business_account: VendorAccount
}

export interface PackageCategoryType {
	_id: string
	createdAt: string
	description: string
	name: string
	status: string
	updatedAt: string
	category_id: string
	__v: number
}

export interface PackageCategoryResponse {
	data: {
		message: string
		status: boolean
		packages: PackageCategoryType[]
	}
}

export interface SubPackageCategoryType {
	_id: string
	createdAt: string
	description: string
	name: string
	status: string
	updatedAt: string
	category: string
	category_id: string
	__v: number
}

export interface SubPackageCategoryResponse {
	data: {
		message: string
		status: boolean
		sub_packages: SubPackageCategoryType[]
	}
}

export type UpdatePackageType = {
	id: string
	body: Partial<PackageCategoryType>
}

export type UpdateResponseType = {
	status: true
	data: {
		message: string
	}
}
