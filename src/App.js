import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header></Header>
        <Shop></Shop>
      </header>
    </div>
  );
}

export default App;
