/* global google */

import { useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, DirectionsRenderer } from "@react-google-maps/api";
import CircularProgress from "@mui/material/CircularProgress";
import { mapDivStyle, mapContainerStyle, loadingDivStyle } from "./Maps.styles";

const libraries = ["places"];

const Maps = ({ isLoading, data, directions, setDirections }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		libraries: libraries,
	});

	const center = useMemo(() => {
		if (data?.status === "success") {
			// Return the center of the path by averaging the latitudes and longitudes
			const latitudes = data.path.map((waypoint) => parseFloat(waypoint[0]));
			const longitudes = data.path.map((waypoint) => parseFloat(waypoint[1]));

			const lat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
			const lng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;

			return { lat, lng };
		}
		return { lat: 22.3193, lng: 114.1694 };
	}, [data]);

	useEffect(() => {
		if (!window.google || data?.status !== "success") {
			return;
		}

		const DirectionsService = new google.maps.DirectionsService();

		DirectionsService.route(
			{
				origin: { lat: parseFloat(data.path[0][0]), lng: parseFloat(data.path[0][1]) },
				destination: {
					lat: parseFloat(data.path[data.path.length - 1][0]),
					lng: parseFloat(data.path[data.path.length - 1][1]),
				},
				waypoints: data.path.slice(1, data.path.length - 1).map((waypoint) => ({
					location: { lat: parseFloat(waypoint[0]), lng: parseFloat(waypoint[1]) },
					stopover: true,
				})),
				travelMode: google.maps.TravelMode.DRIVING,
			},
			(result, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					setDirections(result);
				} else {
					console.error(`error fetching directions ${result}`);
				}
			}
		);
	}, [data?.path, data?.status, setDirections]);

	if (loadError)
		return (
			<div style={mapDivStyle}>
				<h1>Error loading maps</h1>
			</div>
		);

	if (!isLoaded)
		return (
			<div style={mapDivStyle}>
				<CircularProgress />
			</div>
		);

	return (
		<div style={mapDivStyle}>
			{isLoading && (
				<div style={loadingDivStyle}>
					<CircularProgress />
				</div>
			)}
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={12}
				options={{ disableDefaultUI: true }}
				center={center}
			>
				{directions && <DirectionsRenderer options={{ directions: directions }} />}
			</GoogleMap>
		</div>
	);
};

export default Maps;
