import React, { ChangeEvent, useCallback } from "react";
import styles from "./Select.module.scss";

type SelectProps<Option> = {
	selectedOption: Option;
	options: readonly Option[];
	onChange: (option: Option) => void;
	getLabel: (option: Option) => string;
};

function Select<Option>({
	selectedOption,
	options,
	onChange,
	getLabel,
}: SelectProps<Option>) {
	const onChangeCallback = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const selectedIndex = event.currentTarget.selectedIndex;
			const selectedOption = options[selectedIndex];

			if (selectedOption !== undefined) {
				onChange(selectedOption);
			}
		},
		[options, onChange]
	);

	return (
		<select
			className={styles.select}
			value={options.indexOf(selectedOption)}
			onChange={onChangeCallback}
		>
			{options.map((option, index) => (
				<option key={index} value={index} className={styles.selectOption}>
					{getLabel(option)}
				</option>
			))}
		</select>
	);
}

export default Select;
