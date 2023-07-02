import { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Autocomplete from "./Autocomplete";
import { InputFieldsPaperStyles, ButtonGroupStyles } from "./InputFields.styles";

const InputFields = ({
	pickupValue,
	setPickupValue,
	dropoffValue,
	setDropoffValue,
	fetchData,
	reset,
	setDirections,
}) => {
	const [clear, setClear] = useState(false);
	const [pickupError, setPickupError] = useState(false);
	const [dropoffError, setDropoffError] = useState(false);

	const handleReset = () => {
		setClear(true);
		setDropoffValue("");
		setPickupValue("");
		setDirections(null);
		setPickupError(false);
		setDropoffError(false);
		reset();
	};

	const handleSubmit = () => {
		if (pickupValue === "") {
			setPickupError(true);
		}
		if (dropoffValue === "") {
			setDropoffError(true);
		}

		if (pickupValue !== "" && dropoffValue !== "") {
			fetchData({
				origin: pickupValue,
				destination: dropoffValue,
			});
		}
	};

	return (
		<Paper sx={InputFieldsPaperStyles}>
			<Autocomplete
				label="Starting location"
				inputValue={pickupValue}
				setInputValue={setPickupValue}
				clear={clear}
				setClear={setClear}
				error={pickupError}
				setError={setPickupError}
			/>
			<Autocomplete
				label="Drop-off location"
				inputValue={dropoffValue}
				setInputValue={setDropoffValue}
				clear={clear}
				setClear={setClear}
				error={dropoffError}
				setError={setDropoffError}
			/>
			<div style={ButtonGroupStyles}>
				<Button variant="contained" onClick={handleSubmit} fullWidth>
					Submit
				</Button>
				<Button variant="contained" onClick={handleReset} fullWidth>
					Reset
				</Button>
			</div>
		</Paper>
	);
};

export default InputFields;
