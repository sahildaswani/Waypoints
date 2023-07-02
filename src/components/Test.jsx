import useWaypointApi from "../hooks/useWaypointApi";

const Test = () => {
	const { data, isLoading, isError, fetchData, reset } = useWaypointApi();

	return (
		<div>
			<p>Test</p>
			<button
				onClick={() => {
					fetchData({
						origin: "London",
						destination: "Birmingham",
					});
				}}
			>
				Test
			</button>

			<button
				onClick={() => {
					reset();
				}}
			>
				Reset
			</button>

			{isLoading && <p>Loading...</p>}

			{isError && <p>An error occurred</p>}

			{data?.status === "failure" && <p>{data.error}</p>}

			{data?.status === "success" && <p>{data.total_distance}</p>}
		</div>
	);
};

export default Test;
