import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import InputFields from "./InputFields";

describe("InputFields", () => {
	it("renders the component correctly", () => {
		render(<InputFields />);

		// Assert that the starting location and drop-off location input fields are rendered
		expect(screen.getByLabelText("Starting location")).toBeInTheDocument();
		expect(screen.getByLabelText("Drop-off location")).toBeInTheDocument();

		// Assert that the submit and reset buttons are rendered
		expect(screen.getByText("Submit")).toBeInTheDocument();
		expect(screen.getByText("Reset")).toBeInTheDocument();

		expect(screen.queryByText("Distance:")).not.toBeInTheDocument();
		expect(screen.queryByText("Time:")).not.toBeInTheDocument();
	});

	it("renders the data correctly", () => {
		render(
			<InputFields
				data={{
					status: "success",
					total_distance: 100,
					total_time: 100,
				}}
			/>
		);

		// Assert that the distance and time are rendered
		expect(screen.getByText("Distance:")).toBeInTheDocument();
		expect(screen.getByText("Time:")).toBeInTheDocument();

		// The divider is also rendered
		expect(screen.getByRole("separator")).toBeInTheDocument();
	});

	it("handles submit button click and calls the appropriate functions", () => {
		const fetchDataMock = vi.fn();
		const resetMock = vi.fn();
		const setPickupValueMock = vi.fn();
		const setDropoffValueMock = vi.fn();
		const setDirectionsMock = vi.fn();

		render(
			<InputFields
				fetchData={fetchDataMock}
				reset={resetMock}
				setPickupValue={setPickupValueMock}
				pickupValue="Location A"
				dropoffValue="Location B"
				setDropoffValue={setDropoffValueMock}
				setDirections={setDirectionsMock}
			/>
		);

		// Enter values in the input fields
		const startingLocationInput = screen.getByLabelText("Starting location");
		const dropoffLocationInput = screen.getByLabelText("Drop-off location");
		fireEvent.change(startingLocationInput, { target: { value: "Location A" } });
		fireEvent.change(dropoffLocationInput, { target: { value: "Location B" } });

		// Click the submit button
		const submitButton = screen.getByText("Submit");
		fireEvent.click(submitButton);

		// Assert that the fetchData function is called with the correct parameters
		expect(fetchDataMock).toHaveBeenCalledWith({
			origin: "Location A",
			destination: "Location B",
		});
	});

	it("handles reset button click and calls the appropriate functions", () => {
		const resetMock = vi.fn();
		const setPickupValueMock = vi.fn();
		const setDropoffValueMock = vi.fn();
		const setDirectionsMock = vi.fn();

		render(
			<InputFields
				reset={resetMock}
				setPickupValue={setPickupValueMock}
				setDropoffValue={setDropoffValueMock}
				setDirections={setDirectionsMock}
			/>
		);

		// Click the reset button
		const resetButton = screen.getByText("Reset");
		fireEvent.click(resetButton);

		// Assert that the reset function and the setPickupValue, setDropoffValue, setDirections functions are called
		expect(resetMock).toHaveBeenCalled();
		expect(setPickupValueMock).toHaveBeenCalledWith("");
		expect(setDropoffValueMock).toHaveBeenCalledWith("");
		expect(setDirectionsMock).toHaveBeenCalledWith(null);
	});
});
