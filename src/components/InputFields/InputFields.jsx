import { useState } from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RouteIcon from "@mui/icons-material/Route";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Autocomplete from "./Autocomplete";
import {
	InputFieldsPaperStyles,
	ButtonGroupStyles,
	InfoItemStyles,
	bold,
} from "./InputFields.styles";

const InputFields = ({
	pickupValue,
	setPickupValue,
	dropoffValue,
	setDropoffValue,
	data,
	isError,
	isLoading,
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
				<Button variant="contained" onClick={handleSubmit} fullWidth disabled={isLoading}>
					{isLoading ? "Loading..." : isError || data?.status ? "Retry" : "Submit"}
				</Button>
				<Button variant="contained" onClick={handleReset} fullWidth>
					Reset
				</Button>
			</div>

			{/* Only render distance and time when request is sucessful */}
			{data?.status === "success" && (
				<>
					<Divider />
					<div>
						<div style={InfoItemStyles}>
							<RouteIcon />
							<Typography variant="body1" component="p">
								<span style={bold}>Distance: </span>
								{data?.total_distance}
							</Typography>
						</div>
						<div style={InfoItemStyles}>
							<AccessTimeIcon />
							<Typography variant="body1" component="p">
								<span style={bold}>Time: </span>
								{data?.total_time}
							</Typography>
						</div>
					</div>
				</>
			)}
		</Paper>
	);
};

export default InputFields;
