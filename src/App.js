import { Route, Switch } from "react-router-dom";
import NavBar from "./components/Header/navBar";
import Privateroute from "./pages/Admin/AdminDashboard/AdminRouter/privateRoute";
import Dashboard from "./pages/Admin/AdminDashboard/Dashboard";
import BannedAccount from "./pages/Admin/BannedAccountList/BannedAccount";
import Approval from "./pages/Approval/Approval";
import HomePage from "./pages/Newest/HomePage";
import PostBlog from "./pages/PostBlog/PostBlog";
import BlogContentFeature from "./pages/Showblogcontent/BlogContent";
import BlogContentDetail from "./pages/Showblogcontent/components/BlogContentDetail";
function App() {
  return (
    <div className="App font-monsterrat">
      <div>
        <header>
          <NavBar />
        </header>
        <div>
          <Switch>
            <Privateroute path='/dashboard' component={Dashboard} exact />
            <Privateroute path = "/bannedAccountsList" component = {BannedAccount} exact/>
            {/* <Route path='/dashboard' component={Dashboard} exact /> */}
            <Route path="/" component={HomePage} exact />
            <Route path="/blogdetail" component={BlogContentFeature} exact />
            <Route path="/dashboard" component={Dashboard} exact />
            <Route path="/createNewPost" component={PostBlog} />
            <Route path="/approval" component={Approval} exact />
            <Route path="/approval/blogdetail" component={BlogContentDetail} />
            <Route
              path="/about"
              component={() => {
                window.location.href = "https://www.facebook.com/fptudsc/";
                return null;
              }}
            />
          </Switch>
        </div>
        <footer></footer>
      </div>
    </div>
  );
}

export default App;
