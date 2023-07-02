import Test from "./components/Test";
import Maps from "./components/Maps/Maps";
import "./App.css";

const App = () => {
	return (
		<>
			<Maps />
			<div id="ui-container">
				<Test />
			</div>
		</>
	);
};

export default App;
