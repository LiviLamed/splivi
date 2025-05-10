import React from "react";
import { RouterProvider } from "react-router-dom";
import { AppRouting } from "./routes/AppRouter";

import { initializeStoreFromLocalStorage } from "./utils/initializeStoreFromLocalStorage";

initializeStoreFromLocalStorage();

function App() {
  return (
    <div className="App">
      <RouterProvider router={AppRouting} />
    </div>
  );
}

export default App;
