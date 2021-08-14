import "./App.css";
import Navbar from "./components/navbar";
import Login from "./components/account/login";
import Profile from "./components/account/profile";
import { Route, Switch } from "react-router-dom";
import Register from "./components/account/register";
import Logout from "./components/account/logout";
function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </>
  );
}

export default App;
