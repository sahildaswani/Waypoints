import { useState } from "react";
import { postRoute, getRoute } from "../api/waypoints";

const useWaypointApi = () => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const fetchData = async (origin, destination) => {
		setData(null);
		setIsLoading(true);
		setIsError(false);
		try {
			const { token } = await postRoute(origin, destination);
			const data = await getRoute(token);
			setData(data);
		} catch (error) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const reset = () => {
		setData(null);
		setIsLoading(false);
		setIsError(false);
	};

	return { data, isLoading, isError, fetchData, reset };
};

export default useWaypointApi;
