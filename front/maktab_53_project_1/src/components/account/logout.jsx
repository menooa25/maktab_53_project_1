import React from "react";
import { Redirect } from "react-router-dom";

function Logout(props) {
  sessionStorage.clear();
  window.location.replace("/");
}

export default Logout;
