import "./App.css";
import Navbar from "./components/navbar";
import Login from "./components/account/login";
import Profile from "./components/account/profile";
function App() {
  return (
    <>
      <Navbar />
      <Login />
      <Profile />
    </>
  );
}

export default App;
