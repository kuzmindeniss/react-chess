import React, {useEffect, useRef, useState} from "react";
import styles from "./Board.module.scss";
import {BoardLettersByNumber, Colors, FigureData, Figures} from "types";
import Cell from "./Cell";
import {initialFigures} from "./initialPos";
import Figure from "components/Figure/Figure";


const Board: React.FC = () => {
	const [figures, setFigures] = useState<{ [key: string]: FigureData }>(initialFigures);

	const boardRef = useRef<HTMLUListElement>(null);
	const [choseFigurePos, setChoseFigurePos] = useState<{
		figure: FigureData
		availableCells: { [key: string]: boolean }
	} | null>(null);

	const cellsFigure: { [key: string]: FigureData | null } = {}

	const isAvailableCellForMove = (x: number, y: number): boolean => {
		if (choseFigurePos && choseFigurePos.availableCells[`${x}-${y}`]) {
			return true;
		}
		return false;
	}

	const isCellHavingFigure = (x: number, y: number): boolean => {
		return cellsFigure[`${x}-${y}`] ? true : false;
	}

	const moveOn = (figure: FigureData, x: number, y: number) => {
		cellsFigure[`${figure.x}-${figure.y}`] = null;
		cellsFigure[`${x}-${y}`] = figure;
		setFigures(state => {
			return {
				...state,
				[figure.id]: {
					...figure,
					x,
					y
				}
			};
		})
		setChoseFigurePos(null);
	}

	const cellClicked = (x: number, y: number): void => {
		if (!choseFigurePos) return;
		if (!choseFigurePos.availableCells[`${x}-${y}`]) return;

		moveOn(choseFigurePos.figure, x, y);
	}

	const initCells = (): JSX.Element[] => {
		const cells: JSX.Element[] = [];
		for (let y = 8; y >= 1; y--) {
			for (let x = 1; x <= 8; x++) {
				cellsFigure[`${x}-${y}`] = null;
				const boardLetter = BoardLettersByNumber[x];
				if ((y + x) % 2 !== 0) {
					cells.push(<Cell
						color={Colors.BLACK} x={boardLetter} y={y}
						key={`${boardLetter}-${y}`}
						isAvailableForMove={isAvailableCellForMove(x, y)}
						isHavingFigure={isCellHavingFigure(x, y)}
						cellClicked={cellClicked}
					/>)
				} else {
					cells.push(<Cell
						color={Colors.WHITE} x={boardLetter} y={y}
						key={`${boardLetter}-${y}`}
						isAvailableForMove={isAvailableCellForMove(x, y)}
						isHavingFigure={isCellHavingFigure(x, y)}
						cellClicked={cellClicked}
					/>)
				}
			}
		}
		return cells;
	}

	const isEatableFigure = (figure: FigureData): boolean => {
		if (!choseFigurePos) return false;
		return choseFigurePos.availableCells[`${figure.x}-${figure.y}`];
	}

	const initFigures = (): JSX.Element[] => {
		const figuresJSX: JSX.Element[] = [];

		for (let item in figures) {
			cellsFigure[`${figures[item].x}-${figures[item].y}`] = figures[item];
			figuresJSX.push(<Figure
				figureClicked={figureClicked}
				key={figures[item].id}
				figure={figures[item]}
				isEatable={isEatableFigure(figures[item])}
			/>);
		}

		return figuresJSX;
	}

	const resizeBoard = () => {
		if (boardRef.current) {
			const board = boardRef.current;
			board.style.height = '';
			board.style.width = '';

			const boardRect = board.getBoundingClientRect();
			const boardWidth = boardRect.width;
			const boardHeight = boardRect.height;

			if (boardHeight > boardWidth) {
				board.style.height = boardWidth + 'px';
			} else {
				board.style.width = boardHeight + 'px';
			}
		}
	}

	const figureClicked = (figure: FigureData) => {
		if (choseFigurePos && choseFigurePos.availableCells[`${figure.x}-${figure.y}`] && choseFigurePos.figure.color !== figure.color) {
			moveOn(choseFigurePos.figure, figure.x, figure.y);
			eatFigure(figure);
			return;
		}

		if (choseFigurePos && choseFigurePos.figure.name === figure.name && figure.x === choseFigurePos.figure.x && choseFigurePos.figure.y === figure.y && choseFigurePos.figure.color === figure.color) {
			setChoseFigurePos(null);
			return;
		}

		setChoseFigurePos({
			figure,
			availableCells: getAvailableCells(figure)
		});
	}

	const eatFigure = (figure: FigureData) => {
		setFigures(state => {
			const newState = {...state};
			delete newState[figure.id];
			return newState;
		});
	}

	const getAvailableCells = (figure: FigureData): { [key: string]: boolean } => {
		const way: { y: number, x: number }[] = [];

		const toStopWay = (x: number, y: number): boolean => {
			if (cellsFigure[`${x}-${y}`] === undefined) return true;
			if (cellsFigure[`${x}-${y}`]) return true;
			return false;
		}

		const verticalTop = (toY: number, fromY: number = figure.y) => {
			for (let i = fromY + 1; i <= toY; i++) {
				if (toStopWay(figure.x, i)) return;
				way.push({y: i, x: figure.x});
			}
		}

		const verticalBottom = (toY: number, fromY: number = figure.y) => {
			for (let i = fromY - 1; i >= toY; i--) {
				if (toStopWay(figure.x, i)) return;
				way.push({y: i, x: figure.x});
			}
		}

		const horizontalLeft = (toX: number, fromX: number = figure.x) => {
			for (let i = fromX - 1; i >= toX; i--) {
				if (toStopWay(i, figure.y)) return;
				way.push({x: i, y: figure.y});
			}
		}

		const horizontalRight = (toX: number, fromX: number = figure.x) => {
			for (let i = fromX + 1; i <= toX; i++) {
				if (toStopWay(i, figure.y)) return;
				way.push({x: i, y: figure.y});
			}
		}

		const isEatableCell = (x: number, y: number): boolean => {
			if (cellsFigure[`${x}-${y}`] && figure.color !== cellsFigure[`${x}-${y}`]?.color) return true;
			return false;
		}

		const checkEatableCell = (x: number, y: number): boolean => {
			if (isEatableCell(x, y)) {
				way.push({x, y})
				return true;
			}
			return false;
		}

		const checkEatableOrAlliesCell = (x: number, y: number): boolean => {
			if (cellsFigure[`${x}-${y}`] && cellsFigure[`${x}-${y}`]?.color === figure.color) return true;
			if (isEatableCell(x, y)) {
				way.push({x, y})
				return true;
			}
			return false;
		}

		// PAWN
		const checkEatableFiguresByPawn = () => {
			if (figure.color === Colors.BLACK) {
				checkEatableCell(figure.x - 1, figure.y - 1);
				checkEatableCell(figure.x + 1, figure.y - 1);
			} else {
				checkEatableCell(figure.x - 1, figure.y + 1);
				checkEatableCell(figure.x + 1, figure.y + 1);
			}
		}

		if (figure.name === Figures.PAWN) {
			if (figure.color === Colors.BLACK) {
				verticalBottom(figure.y - 2);
			}
			if (figure.color === Colors.WHITE) {
				verticalTop(figure.y + 2);
			}
			checkEatableFiguresByPawn();
		}

		// ROOK
		const checkEatableFiguresByRook = () => {
			// check top
			for (let i = figure.y + 1; i <= 8; i++) {
				console.log(i);
				if (checkEatableOrAlliesCell(figure.x, i)) break;
			}
			// check bottom
			for (let i = figure.y - 1; i >= 0; i--) {
				if (checkEatableOrAlliesCell(figure.x, i)) break;
			}
			// check left
			for (let i = figure.x - 1; i >= 0; i--) {
				if (checkEatableOrAlliesCell(i, figure.y)) break;
			}
			// check right
			for (let i = figure.x + 1; i <= 8; i++) {
				if (checkEatableOrAlliesCell(i, figure.y)) break;
			}
		}

		if (figure.name === Figures.ROOK) {
			verticalBottom(0);
			verticalTop(8);
			horizontalLeft(0);
			horizontalRight(8);
			checkEatableFiguresByRook();
		}

		const obj: { [key: string]: boolean } = {};

		way.forEach(el => {
			obj[`${el.x}-${el.y}`] = true;
		});

		return obj;
	}

	useEffect(() => {
		resizeBoard();
		window.addEventListener('resize', resizeBoard);
	}, [])

	return <div className={styles.boardWrapper}>
		<ul className={styles.boardLeft}>
			<li className={styles.boardLeftItem}>1</li>
			<li className={styles.boardLeftItem}>2</li>
			<li className={styles.boardLeftItem}>3</li>
			<li className={styles.boardLeftItem}>4</li>
			<li className={styles.boardLeftItem}>5</li>
			<li className={styles.boardLeftItem}>6</li>
			<li className={styles.boardLeftItem}>7</li>
			<li className={styles.boardLeftItem}>8</li>
		</ul>

		<ul className={styles.boardBottom}>
			<li className={styles.boardBottomItem}>A</li>
			<li className={styles.boardBottomItem}>B</li>
			<li className={styles.boardBottomItem}>C</li>
			<li className={styles.boardBottomItem}>D</li>
			<li className={styles.boardBottomItem}>E</li>
			<li className={styles.boardBottomItem}>F</li>
			<li className={styles.boardBottomItem}>G</li>
			<li className={styles.boardBottomItem}>H</li>
		</ul>

		<ul className={styles.board} ref={boardRef}>
			{initCells()}
			{initFigures()}
		</ul>
	</div>
}

export default Board;