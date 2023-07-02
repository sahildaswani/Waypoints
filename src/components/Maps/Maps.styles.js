const mapContainerStyle = {
	position: "relative",
	width: "100%",
	height: "100%",
};

const mapDivStyle = {
	position: "absolute",
	zIndex: 0,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: "100vw", // or you can use width: '100vw'
	height: "100vh", // or you can use height: '100vh'
};

const loadingDivStyle = {
	position: "absolute",
	backgroundColor: "black",
	opacity: 0.5,
	width: "100%",
	height: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	zIndex: 1,
};

export { mapContainerStyle, mapDivStyle, loadingDivStyle };
