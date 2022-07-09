import React, {useRef} from "react";
import styles from './Main.module.scss'
import RadioButton from "../RadioButton/RadioButton";
import {Link} from "react-router-dom";
import {selectColor, setColor} from "redux/gameSlice";
import store from "redux/store";
import {useAppDispatch, useAppSelector} from "redux/hooks";
import {Colors} from "types";


const Main: React.FC = () => {
	const color = useAppSelector(selectColor);
	const dispatch = useAppDispatch();

	const radioChanged = (id: string) => {
		dispatch(setColor(id as Colors));
	}

	return <div className={styles.wrapper}>
		<div className={styles.logo}></div>
		<h2>Choose side</h2>
			<form>
				<RadioButton value="White" handleChange={radioChanged} name="radio" isChecked={color === 'white'}/>
				<RadioButton value="Black" handleChange={radioChanged} name="radio" isChecked={color === 'black'}/>
			</form>
		<Link to="game" className={styles.button}>Start game</Link>
	</div>
}

export default Main;