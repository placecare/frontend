import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { userReducer } from '@placecare/domains/user'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { professionalApi } from '@placecare/domains/professional'

export const rootReducer = combineReducers({
  user: userReducer,
  [professionalApi.reducerPath]: professionalApi.reducer
})

export function setupStore(preloadedState?: never) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    })
    .concat(professionalApi.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']