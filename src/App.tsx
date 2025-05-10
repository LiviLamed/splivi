import React from "react";
import { RouterProvider } from "react-router-dom";
import { AppRouting } from "./routes/AppRouter";

import { initializeStoreFromLocalStorage } from "./utils/initializeStoreFromLocalStorage";
import { ThemeProvider } from "@mui/material";
import { theme } from "./mui-theme/mui-theme";

initializeStoreFromLocalStorage();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <RouterProvider router={AppRouting} />
      </ThemeProvider>
    </div>
  );
}

export default App;
