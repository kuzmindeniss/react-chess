export enum Colors {
	WHITE = "white",
	BLACK = "black",
}

export enum Figures {
	BISHOP = 'bishop',
	KING = 'king',
	KNIGHT = 'knight',
	PAWN = 'pawn',
	QUEEN = 'queen',
	ROOK = 'rook',
}

export const BoardLettersByNumber: {[key: number]: string} = {
	1: 'A',
	2: 'B',
	3: 'C',
	4: 'D',
	5: 'E',
	6: 'F',
	7: 'G',
	8: 'H',
}

export const BoardNumberByLetter: {[key: string]: number} = {
	'A': 1,
	'B': 2,
	'C': 3,
	'D': 4,
	'E': 5,
	'F': 6,
	'G': 7,
	'H': 8,
}


export interface FigureData {
	id: string,
	name: Figures,
	x: number,
	y: number,
	color: Colors
}
