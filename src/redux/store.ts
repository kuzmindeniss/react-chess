import { configureStore } from '@reduxjs/toolkit'
import gameReducer from "./gameSlice";


const store = configureStore({
	reducer: {
		game: gameReducer
	},
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch