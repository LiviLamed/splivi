import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouting from "./routes/AppRouter";

import { initializeStoreFromLocalStorage } from "./utils/initializeStoreFromLocalStorage";

initializeStoreFromLocalStorage();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouting />
      </BrowserRouter>
    </div>
  );
}

export default App;
