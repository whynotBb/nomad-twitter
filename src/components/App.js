import React, { useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fBase";

function App() {
  console.log(authService, authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
