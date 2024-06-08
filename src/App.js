import styles from './App.module.css';
import { useState } from 'react';

const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const OPERATORS = ['+', '-', '=', 'C'];
export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [total, setTotal] = useState(null);
	const [operatorPush, setOperatorPush] = useState(false);
	const res = total ? total : operand1 + operator + operand2;

	const operatorHandler = (oper) => {
		if (operand1 || total) {
			if (oper === '+' || oper === '-') {
				if (total) {
					setOperand1(total);
					setOperand2('');
					setTotal(null);
					setOperatorPush(true);
					setOperator(oper);
				} else {
					setOperatorPush(true);
					setOperator(oper);
				}
			} else if (oper === 'C') {
				setOperand1('');
				setOperator('');
				setOperand2('');
				setTotal(null);
				setOperatorPush(false);
			} else if (oper === '=') {
				setOperatorPush(false);
				switch (operator) {
					case '+':
						setTotal((newTotal) => Number(operand1) + Number(operand2));
						break;
					case '-':
						setTotal((newTotal) => Number(operand1) - Number(operand2));
				}
			}
		} else if (!operand1 && total) {
			setOperand1(total);
			console.log(operand1);
		}
	};

	return (
		<div className={styles.app}>
			<header className={styles['app-header']}> Калькулятор</header>
			<div className={styles.wrapper}>
				<div className={styles['app-main']}>
					<div
						className={
							styles['app-display'] +
							' ' +
							(total && styles['display-total'])
						}
					>
						{res}
					</div>
					<div className={styles['main-buttons']}>
						<div className={styles['app-nums']}>
							{NUMS.map((num, index) => {
								return (
									<button
										onClick={() => {
											!operatorPush
												? setOperand1(
														(newOperand) => newOperand + num,
												  )
												: setOperand2(
														(newOperand) => newOperand + num,
												  );
										}}
										key={index}
										className={styles['nums-button']}
									>
										{num}
									</button>
								);
							})}
						</div>
						<div className={styles['app-operators']}>
							{OPERATORS.map((elem, index) => {
								return (
									<button
										key={index}
										onClick={() => {
											operatorHandler(elem);
										}}
										className={styles['nums-button']}
									>
										{elem}
									</button>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
