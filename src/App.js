import { Route, Switch } from "react-router-dom";
import ScrollToTopButton from "./components/Button/ScrollToTopButton";
import Footer from "./components/Footer/footer";
import NavBar from "./components/Header/navBar";
import ScrollToTop from "./components/WindowAction/ScrollToTop";
import Dashboard from "./pages/Admin/AdminDashboard/Dashboard";
import BannedAccount from "./pages/Admin/BannedAccountList/BannedAccount";
import CommentManage from "./pages/Admin/CommentsManage/CommentManage";
import Approval from "./pages/Approval/Approval";
import GiveAwardTable from "./pages/GiveAward/GiveAwardTable";
import HomePage from "./pages/Newest/HomePage";
import MyOwnBlogTable from "./pages/OwnBlog/MyOwnBlogTable";
import PostBlog from "./pages/PostBlog/PostBlog";
import Profile from "./pages/Profile/Profile";
import SearchResult from "./pages/SearchResult/SearchResult";
import BlogContentFeature from "./pages/Showblogcontent/BlogContent";
import BlogContentDetail from "./pages/Showblogcontent/components/BlogContentDetail";
import UpdateBlog from "./pages/UpdateBlog/UpdateBlog";
function App() {
  return (
    <div className="App font-monsterrat">
      <div>
        <header>
          <NavBar />
        </header>
        <div className="min-h-screen">
          <ScrollToTop />
          <Switch>
            <Route path="/dashboard" component={Dashboard} exact />
            <Route path="/" component={HomePage} exact />
            <Route path="/blogdetail" component={BlogContentFeature} exact />
            <Route path="/dashboard" component={Dashboard} exact />
            <Route path="/createNewPost" component={PostBlog} />
            <Route path="/updateBlog" component={UpdateBlog} exact />
            <Route path="/approval" component={Approval} exact />
            <Route path="/approval/blogdetail" component={BlogContentDetail} />
            <Route path="/ownBlog" component={MyOwnBlogTable} />
            <Route path="/profile" component={Profile} exact />
            <Route path="/bannedAccountsList" component={BannedAccount} exact />
            <Route path="/commentsManage" component={CommentManage} exact />
            <Route path="/searchResult" component={SearchResult} exact />
            <Route path="/giveAward" component={GiveAwardTable} exact />
            <Route
              path="/about"
              component={() => {
                window.location.href = "https://www.facebook.com/fptudsc/";
                return null;
              }}
            />
          </Switch>
        </div>
      </div>
      <ScrollToTopButton />
      <footer className="relative left-0 bottom-0 right-0">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
