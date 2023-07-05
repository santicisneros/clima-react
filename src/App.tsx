import React from "react";
import "./assets/css/App.css";
import NavBar from "./components/NavBar";
import ClimaPred from "./components/ClimaPred";
function App() {
  return (
    <div className="App">
      <NavBar />
      <ClimaPred />
    </div>
  );
}

export default App;
