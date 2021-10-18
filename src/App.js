import { Route, Switch } from "react-router-dom";
import NavBar from "./components/Header/navBar";
import SubmitForm from "./pages/Admin/AdminDashboard/components/UpdateUserDialog/SubmitForm/SubmitForm";
import Dashboard from "./pages/Admin/AdminDashboard/Dashboard";
import Approval from "./pages/Approval/components/Approval";
import HomePage from "./pages/Newest/HomePage";
import PostBlog from "./pages/PostBlog/PostBlog";
import BlogContentFeature from "./pages/Showblogcontent/BlogContent";
function App() {
  // const loggedInUser = useSelector((state) => state.user.current);
  return (
    <div className="App font-monsterrat">
      <div>
        <header>
          {/* {contains("ADMIN",loggedInUser?.role)? <NavBar/>:<DashboardHeader/>} */}
          <NavBar />
        </header>
        <div>
          <Switch>
            {/* <Privateroute path='/dashboard' component={Dashboard} exact /> */}
            <Route path='/dashboard' component={Dashboard} exact />
            <Route path="/" component={HomePage} exact />
            <Route path='/blogdetail' component={BlogContentFeature} exact />
            <Route path="/createNewPost" component={PostBlog} />
            <Route path="/approval" component={Approval} />
            <Route path="/submitform" component = {SubmitForm} exact />
          </Switch>
        </div>
        <footer></footer>
      </div>
    </div>
  );
}

export default App;
