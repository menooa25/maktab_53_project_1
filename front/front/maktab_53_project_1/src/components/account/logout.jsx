// todo: mr. gachpazha craete me!
import React from "react";

function Logout(props) {
  sessionStorage.clear();
  window.location.replace("/");
}

export default Logout;