import React from "react";
import Header from "./components/Header";
import List from "./components/List"

import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <List />
      </main>
    </div>
  );
}

export default App;
