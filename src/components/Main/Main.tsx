import React, {useRef} from "react";
import styles from './Main.module.scss'
import RadioButton from "../RadioButton/RadioButton";
import {Link} from "react-router-dom";

const Main: React.FC = () => {
	const color = useRef<string>('white');

	const radioChanged = (id: string) => {
		color.current = id;
		console.log(color.current);
	}

	return <div className={styles.wrapper}>
		<div className={styles.logo}></div>
		<h2>Choose side</h2>
			<form>
				<RadioButton value="White" handleChange={radioChanged} name="radio" isChecked={true}/>
				<RadioButton value="Black" handleChange={radioChanged} name="radio"/>
			</form>
		<Link to="game" className={styles.button}>Start game</Link>
	</div>
}

export default Main;