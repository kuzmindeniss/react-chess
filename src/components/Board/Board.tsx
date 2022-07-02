import React, {useEffect, useRef} from "react";
import styles from "./Board.module.scss";
import {BoardLetters, Colors} from "types";
import Cell from "./Cell";
import {initialPosBlack, initialPosWhite} from "./initialPos";

const Board: React.FC = () => {
  const boardRef = useRef<HTMLUListElement>(null);



  const initCells = (): JSX.Element[] => {
    const cells: JSX.Element[] = [];
    for (let y = 1; y <= 8; y ++) {
      for (let x = 1; x <= 8; x++) {
        const boardLetter = BoardLetters[x];
        if ((y  + x) % 2 !== 0) {
          cells.push(<Cell color={Colors.BLACK} x={boardLetter} y={y} key={`${boardLetter}-${y}`} />)
        } else {
          cells.push(<Cell color={Colors.WHITE} x={boardLetter} y={y} key={`${boardLetter}-${y}`} />)
        }
      }
    }
    return cells;
  }

  const initFigures = () => {
    const figures: JSX.Element[] = [];

    initialPosBlack.forEach(item => {
      figures.push(<Cell color={Colors.BLACK} x={BoardLetters[item.x]} y={item.y}/>);
    });
    initialPosWhite.forEach(item => {
      figures.push(<Cell color={Colors.WHITE} x={BoardLetters[item.x]} y={item.y}/>);
    });

    return figures;
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