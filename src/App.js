import { Route, Switch } from "react-router-dom";
import ScrollToTop from "./components/Button/ScrollToTop";
import Footer from "./components/Footer/footer";
import NavBar from "./components/Header/navBar";
import Privateroute from "./pages/Admin/AdminDashboard/AdminRouter/privateRoute";
import Dashboard from "./pages/Admin/AdminDashboard/Dashboard";
import BannedAccount from "./pages/Admin/BannedAccountList/BannedAccount";
import Approval from "./pages/Approval/Approval";
import HomePage from "./pages/Newest/HomePage";
import MyOwnBlogTable from "./pages/OwnBlog/MyOwnBlogTable";
import PostBlog from "./pages/PostBlog/PostBlog";
import Profile from "./pages/Profile/Profile";
import BlogContentFeature from "./pages/Showblogcontent/BlogContent";
import BlogContentDetail from "./pages/Showblogcontent/components/BlogContentDetail";
import UpdateBlog from "./pages/UpdateBlog/UpdateBlog";
function App() {
  return (
    <div className="App font-monsterrat">
<<<<<<< HEAD
      <div>
        <header>
          <NavBar />
        </header>
        <div className="min-h-screen">
          <Switch>
            <Privateroute path="/dashboard" component={Dashboard} exact />
            {/* <Route path='/dashboard' component={Dashboard} exact /> */}
            <Route path="/" component={HomePage} exact />
            <Route path="/blogdetail" component={BlogContentFeature} exact />
            <Route path="/dashboard" component={Dashboard} exact />
            <Route path="/createNewPost" component={PostBlog} />
            <Route path="/updateBlog" component={UpdateBlog} exact />
            <Route path="/approval" component={Approval} exact />
            <Route path="/approval/blogdetail" component={BlogContentDetail} />
            <Route path="/ownBlog" component={MyOwnBlogTable} />
            <Route path="/profile" component={Profile} />
            <Route
              path="/about"
              component={() => {
                window.location.href = "https://www.facebook.com/fptudsc/";
                return null;
              }}
            />
            <Route path="/bannedAccountsList" component={BannedAccount} exact />
          </Switch>
        </div>
        <footer></footer>
=======
      <header>
        <NavBar />
      </header>
      <div className="min-h-screen">
        <Switch>
          <Privateroute path='/dashboard' component={Dashboard} exact />
          <Privateroute path="/bannedAccountsList" component={BannedAccount} exact />
          {/* <Route path="/bannedAccountsList" component={BannedAccount} exact /> */}
          {/* <Route path='/dashboard' component={Dashboard} exact /> */}
          <Route path="/" component={HomePage} exact />
          <Route path="/blogdetail" component={BlogContentFeature} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/createNewPost" component={PostBlog} />
          <Route path="/createNewPost" component={PostBlog} />
          <Route path="/updateBlog" component={UpdateBlog} exact />
          <Route path="/approval" component={Approval} exact />
          <Route path="/approval/blogdetail" component={BlogContentDetail} />
          <Route path="/ownBlog" component={MyOwnBlogTable} />
          <Route path="/profile" component={Profile} />
          <Route
            path="/about"
            component={() => {
              window.location.href = "https://www.facebook.com/fptudsc/";
              return null;
            }}
          />
        </Switch>
        <ScrollToTop />
        <footer className="relative left-0 bottom-0 right-0">
          <Footer />
        </footer>
>>>>>>> a885837dbc8c2c8ba40316ad484dcbe8633960ad
      </div>
    </div>
  );
}

export default App;
