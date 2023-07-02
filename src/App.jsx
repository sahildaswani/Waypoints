import { QueryClient, QueryClientProvider } from "react-query";
import Test from "./components/Test";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Test />
		</QueryClientProvider>
	);
};

export default App;
