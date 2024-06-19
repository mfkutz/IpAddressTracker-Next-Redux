import { configureStore } from '@reduxjs/toolkit'
import { geoLocApi } from './services/geoLoc'
import { setupListeners } from '@reduxjs/toolkit/query'
import locationReducer from './services/locationSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        [geoLocApi.reducerPath]: geoLocApi.reducer,
        location:locationReducer
    },
    middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware()
            .concat(geoLocApi.middleware),
  })
}

setupListeners(makeStore().dispatch)

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export type AppState = RootState;