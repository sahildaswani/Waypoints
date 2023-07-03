import { render, screen } from "@testing-library/react";
import Maps from "./Maps";

describe("Maps", () => {
	it("renders the loading spinner when isLoading prop is true", () => {
		render(<Maps isLoading={true} />);

		// Assert that the loading spinner is displayed
		expect(screen.getByRole("progressbar")).toBeInTheDocument();
	});
});
