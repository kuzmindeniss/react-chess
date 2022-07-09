import {Colors, FigureData} from "types";
import {initialFigures} from "components/Board/initialPos";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "./store";
import store from "redux/store";

interface GameState {
	color: Colors;
	figures: { [key: string]: FigureData };
	gameWon: Colors | null;
}

const initialState: GameState = {
	color: Colors.WHITE,
	figures: initialFigures,
	gameWon: null
}

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setColor: (state, action: PayloadAction<Colors>) => {
			state.color = action.payload;
		},
		changeFigurePosition: (state, action: PayloadAction<{figure: FigureData, x: number, y: number}>) => {
			state.figures[action.payload.figure.id].x = action.payload.x;
			state.figures[action.payload.figure.id].y = action.payload.y;
		},
		removeFigure: (state, action: PayloadAction<FigureData>) => {
			delete state.figures[action.payload.id];
		},
		setGameWon: (state, action: PayloadAction<Colors>) => {
			state.gameWon = action.payload;
		},
		resetGame: (state) => {
			state.gameWon = initialState.gameWon;
			state.figures = initialState.figures;
		}
	}
})

export const { setColor, changeFigurePosition, removeFigure, setGameWon} = gameSlice.actions;

export const selectFigures = (state: RootState) => state.game.figures;
export const selectColor = (state: RootState) => state.game.color;
export const selectGameWon = (state: RootState) => state.game.gameWon;

export default gameSlice.reducer