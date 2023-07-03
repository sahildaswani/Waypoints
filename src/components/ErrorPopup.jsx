import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ErrorPopup = ({ open, setOpen, data, isError }) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			open={open}
			onClose={() => setOpen(false)}
		>
			<Alert
				variant="filled"
				onClose={() => setOpen(false)}
				severity={isError ? "error" : "warning"}
				fullWidth
			>
				{isError ? "An error occurred" : data?.error}
			</Alert>
		</Snackbar>
	);
};

export default ErrorPopup;
