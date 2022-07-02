import React from "react";
import styles from "./Board.module.scss";
import {Colors} from "../../types";
import classNames from "classnames/bind";


interface CellProps {
  color: Colors,
  x: string,
  y: number,
}

const Cell: React.FC<CellProps> = (props: CellProps) => {
  return (
    <li id={`cell-${props.x}-${props.y}`} className={
      classNames(styles.cell, {
        [styles.cellWhite]: props.color === Colors.WHITE ? true : false,
        [styles.cellBlack]: props.color === Colors.BLACK ? true : false,
      })
    }></li>
  )
}

export  default Cell;