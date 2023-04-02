import { authService } from "fBase";
import React from "react";
import { Navigate } from "react-router-dom";
const Profile = () => {
  const onLogOutClick = () => {
    authService.signOut();
    Navigate("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
