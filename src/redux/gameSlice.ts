import {FigureData} from "types";
import {initialFigures} from "components/Board/initialPos";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "./store";
import store from "redux/store";

interface GameState {
	color: string;
	figures: { [key: string]: FigureData };
}

const initialState: GameState = {
	color: 'white',
	figures: initialFigures
}

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setColor: (state, action: PayloadAction<string>) => {
			state.color = action.payload;
		},
		changeFigurePosition: (state, action: PayloadAction<{figure: FigureData, x: number, y: number}>) => {
			state.figures[action.payload.figure.id].x = action.payload.x;
			state.figures[action.payload.figure.id].y = action.payload.y;
		},
		removeFigure: (state, action: PayloadAction<FigureData>) => {
			delete state.figures[action.payload.id];
		}
	}
})

export const { setColor, changeFigurePosition, removeFigure} = gameSlice.actions;

export const selectFigures = (state: RootState) => state.game.figures;

export default gameSlice.reducer