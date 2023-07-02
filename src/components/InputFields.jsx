import { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Autocomplete from "./Autocomplete";

const InputFields = ({
	pickupValue,
	setPickupValue,
	dropoffValue,
	setDropoffValue,
	fetchData,
	reset,
}) => {
	const [clear, setClear] = useState(false);

	const handleReset = () => {
		setClear(true);
		setDropoffValue("");
		setPickupValue("");
		reset();
	};

	return (
		<Paper
			sx={{
				display: "flex",
				flexDirection: "column",
				padding: "1rem",
				gap: "1rem",
			}}
		>
			<Autocomplete
				label="Starting location"
				inputValue={pickupValue}
				setInputValue={setPickupValue}
				clear={clear}
				setClear={setClear}
			/>
			<Autocomplete
				label="Drop-off location"
				inputValue={dropoffValue}
				setInputValue={setDropoffValue}
				clear={clear}
				setClear={setClear}
			/>
			<div
				style={{
					display: "flex",
					gap: "1rem",
				}}
			>
				<Button
					variant="contained"
					onClick={() => {
						fetchData({
							origin: pickupValue,
							destination: dropoffValue,
						});
					}}
					fullWidth
				>
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
