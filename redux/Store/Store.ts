import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authApi } from '../services/auth'
import { userReducer } from '../slices/userSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import {
	cmsApi,
	cmsDeleteApi,
	cmsGetApi,
	cmsGetContentByIdApi,
	cmsUpdateApi,
} from '../services/cms'
import { vendorApi } from '../services/vendorApi'
import { bannerApi } from '../services/banner.Api'
import { productsApi } from '../services/productsApi'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user'],
}

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[cmsApi.reducerPath]: cmsApi.reducer,
	[cmsGetApi.reducerPath]: cmsGetApi.reducer,
	[cmsDeleteApi.reducerPath]: cmsDeleteApi.reducer,
	[cmsGetContentByIdApi.reducerPath]: cmsGetContentByIdApi.reducer,
	[cmsUpdateApi.reducerPath]: cmsUpdateApi.reducer,
	[vendorApi.reducerPath]: vendorApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
	[bannerApi.reducerPath]: bannerApi.reducer,
	user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(
			authApi.middleware,
			cmsGetApi.middleware,
			cmsApi.middleware,
			cmsDeleteApi.middleware,
			cmsGetContentByIdApi.middleware,
			cmsUpdateApi.middleware,
			vendorApi.middleware,
			bannerApi.middleware,
			productsApi.middleware
		),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
