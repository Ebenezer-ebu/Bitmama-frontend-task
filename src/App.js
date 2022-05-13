import { Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import UserPage from "./components/UserPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/user/:name" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
