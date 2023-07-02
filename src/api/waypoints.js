const URL = import.meta.env.VITE_WAYPOINT_API_URL;

const postRoute = async (origin, destination) => {
	try {
		const response = await fetch(`${URL}/route`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ origin, destination }),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error("Error posting route");
	}
};

const getRoute = async (token) => {
	try {
		const response = await fetch(`${URL}/route/${token}`);
		const data = await response.json();
		if (data.status === "in progress") {
			return await getRoute(token);
		}
		return data;
	} catch (error) {
		throw new Error("Error getting route");
	}
};

export { getRoute, postRoute };
