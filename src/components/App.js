import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fBase";

function App() {
  // firebase가 초기화될때 까지 기다려줘야 함
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  //userObj 가 있는지 여부를 이용해 상태를 체크하면, isLoggedIn useState 필요 없음
  const [userObj, setUserObj] = useState(null);

  //onAuthStateChanged - 로그인 상태가 변경 된 것을 감지
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(true);
        setUserObj(user);
      }
      // else {
      //   setIsLoggedIn(false);
      // }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
