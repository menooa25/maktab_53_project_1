import "./App.css";
import Navbar from "./components/navbar";
import Login from "./components/account/login";
import Register from "./components/account/register";
import Profile from "./components/account/profile";

function App() {
  return (
    <>
      <Navbar />
      <Login />
      <Profile/>
      {/* <Register/> */}
    </>
  );
}

export default App;
