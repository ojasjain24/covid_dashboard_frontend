import "./App.css";
import "./styles.css";
import Navbar from "./Navbar";
import AverageChart from "./AverageChart";
import DailyChart from "./DailyChart";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <AverageChart></AverageChart>
      <DailyChart />
      <footer>
        <h4>Made with ❤️</h4>
      </footer>
    </div>
  );
}
export default App;
