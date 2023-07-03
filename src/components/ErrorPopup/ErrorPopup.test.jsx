import React from "react";
import { render, fireEvent, getByText, queryByRole } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ErrorPopup from "./ErrorPopup";

describe("ErrorPopup", () => {
	test("Does not render when open is false", () => {
		const { queryByRole } = render(
			<ErrorPopup open={false} setOpen={() => {}} data={null} isError={true} />
		);

		expect(queryByRole("alert")).not.toBeInTheDocument();
	});

	test("Renders error snackbar", () => {
		const { getByTestId } = render(
			<ErrorPopup open={true} setOpen={() => {}} data={null} isError={true} />
		);

		const alertElement = getByTestId("error-popup");
		expect(alertElement).toHaveTextContent("An error occurred");
		expect(alertElement).toHaveClass("MuiAlert-filledError");
	});

	test("Renders warning snackbar", () => {
		const { getByTestId } = render(
			<ErrorPopup
				open={true}
				setOpen={() => {}}
				data={{ error: "Test warning message" }}
				isError={false}
			/>
		);

		const alertElement = getByTestId("error-popup");
		expect(alertElement).toHaveTextContent("Test warning message");
		expect(alertElement).toHaveClass("MuiAlert-filledWarning");
	});
});
