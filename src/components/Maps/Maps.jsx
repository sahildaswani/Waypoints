import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { mapDivStyle, mapContainerStyle } from "./Maps.styles";

const libraries = ["places"];

const Maps = () => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		libraries: libraries,
	});

	if (loadError)
		return (
			<div style={mapDivStyle}>
				<h1>Error loading maps</h1>
			</div>
		);
	if (!isLoaded)
		return (
			<div style={mapDivStyle}>
				<h1>Loading maps</h1>
			</div>
		);

	return (
		<div style={mapDivStyle}>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={8}
				options={{ disableDefaultUI: true }}
				center={{ lat: -34.397, lng: 150.644 }}
			/>
		</div>
	);
};

export default Maps;
