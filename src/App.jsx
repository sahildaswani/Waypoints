import { useState, useEffect } from "react";
import InputFields from "./components/InputFields/InputFields";
import Maps from "./components/Maps/Maps";
import ErrorPopup from "./components/ErrorPopup";
import useWaypointApi from "./hooks/useWaypointApi";
import "./App.css";

const App = () => {
	const { data, isLoading, isError, fetchData, reset } = useWaypointApi();

	const [pickupValue, setPickupValue] = useState("");
	const [dropoffValue, setDropoffValue] = useState("");
	const [isErrorShown, setIsErrorShown] = useState(false);
	const [directions, setDirections] = useState(null);

	useEffect(() => {
		if (isError || data?.status === "failure") {
			setIsErrorShown(true);
		}
	}, [isError, data]);

	return (
		<>
			<Maps
				isLoading={isLoading}
				data={data}
				directions={directions}
				setDirections={setDirections}
			/>
			<div id="ui-container">
				<InputFields
					pickupValue={pickupValue}
					setPickupValue={setPickupValue}
					dropoffValue={dropoffValue}
					setDropoffValue={setDropoffValue}
					fetchData={fetchData}
					reset={reset}
					setDirections={setDirections}
				/>

				<ErrorPopup open={isErrorShown} setOpen={setIsErrorShown} data={data} isError={isError} />
			</div>
		</>
	);
};

export default App;
