import "./App.css";
import Navbar from "./components/navbar";
import Login from "./components/account/login";
import Profile from "./components/account/profile";
import { Route, Switch } from "react-router-dom";
import Register from "./components/account/register";
import Logout from "./components/account/logout";
import ProfilePage from "./components/account/profilePage";
import CreatePost from "./components/posts/createPost";
import Home from "./components/home";
import EditPosts from "./components/posts/editPosts";
function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/logout" component={Logout} />
        <Route path="/profile_info" component={Profile} />
        <Route path="/create_post" component={CreatePost} />
        <Route path="/edit_post" component={EditPosts} />
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
