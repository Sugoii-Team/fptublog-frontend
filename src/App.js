import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import ScrollToTopButton from "./components/Button/ScrollToTopButton";
import Footer from "./components/Footer/footer";
import NavBar from "./components/Header/navBar";
import ScrollToTop from "./components/WindowAction/ScrollToTop";
import AddFieldOrCategoryPage from "./pages/Admin/AddFieldOrCategory/AddFieldOrCategoryPage";
import Dashboard from "./pages/Admin/AdminDashboard/Dashboard";
import BannedAccount from "./pages/Admin/BannedAccountList/BannedAccount";
import CommentManage from "./pages/Admin/CommentsManage/CommentManage";
import FieldList from "./pages/Admin/ListOfFieldAndCategoryToDelete/FieldList";
import CategoryList from "./pages/Admin/ListOfFieldAndCategoryToDelete/CategoryList";
import Approval from "./pages/Approval/Approval";
import BlogByCategoryHomePage from "./pages/BlogBasedOnCategory/BlogByCategoryHomePage";
import BlogByFieldHomePage from "./pages/BlogBasedOnField/BlogByFieldHomePage";
import BlogByTagHomePage from "./pages/BlogBasedOnTag/BlogByTagHomePage";
import GiveAwardTable from "./pages/GiveAward/GiveAwardTable";
import MentorDashboard from "./pages/Mentor/MentorDashboardDetail/MentorDashboard";
import StudentBannedDashboard from "./pages/Mentor/StudentsBannedDashboard/StudentBannedDashboard";
import HomePage from "./pages/Newest/HomePage";
import MyOwnBlogTable from "./pages/OwnBlog/MyOwnBlogTable";
import PostBlog from "./pages/PostBlog/PostBlog";
import Profile from "./pages/Profile/Profile";
import SearchResult from "./pages/SearchResult/SearchResult";
import BlogContentFeature from "./pages/Showblogcontent/BlogContent";
import BlogContentDetail from "./pages/Showblogcontent/components/BlogContentDetail";
import UpdateBlog from "./pages/UpdateBlog/UpdateBlog";
import categoryApi from "./services/categoryApi";
import fieldApi from "./services/fieldAPI";

function App() {

  const [fieldList, setFieldList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const fieldListReponse = await fieldApi.getAllFields();
        const categoriesReponse = await categoryApi.getCategories();
        setFieldList(fieldListReponse.data);
        setCategoriesList(categoriesReponse.data);
      } catch (error) {
        console.log("Fail to load field list (nav bar component)", error);
      }
    })();
  }, []);

  return (
    <div className="App font-monsterrat">
      <div>
        <header>
          <NavBar fieldList={fieldList} categoriesList={categoriesList} />
        </header>
        <div className="min-h-screen">
          <div >
            <ScrollToTop />
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/dashboard" component={Dashboard} exact />
              <Route path="/blogdetail" component={BlogContentFeature} exact />
              <Route path="/createNewPost" component={PostBlog} />
              <Route path="/updateBlog" component={UpdateBlog} exact />
              <Route path="/approval" component={Approval} exact />
              <Route path="/approval/blogdetail" component={BlogContentDetail} />
              <Route path="/ownBlog" component={MyOwnBlogTable} />
              <Route path="/profile" component={Profile} exact />
              <Route path="/bannedAccountsList" component={BannedAccount} exact />
              <Route path="/mentorDashboard" component={MentorDashboard} exact />
              <Route path="/studentBannedDashboard" component={StudentBannedDashboard} exact />
              <Route path="/blogBaseOnField" component={BlogByFieldHomePage} exact />
              <Route path="/blogBaseOnCategory" component={BlogByCategoryHomePage} exact />
              <Route path="/commentsManage" component={CommentManage} exact />
              <Route path="/searchResult" component={SearchResult} exact />
              <Route path="/giveAward" component={GiveAwardTable} exact />
              <Route path="/blogBaseOnTopTag" component = {BlogByTagHomePage} exact/>
              <Route path = "/addFieldOrCategory" component = {AddFieldOrCategoryPage} exact/>
              <Route path = "/listOfCategory" component = {CategoryList} exact/>
              <Route path = "/listOfField" component = {FieldList} exact />
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
      </div>
      <ScrollToTopButton />
      <footer className="relative left-0 bottom-0 right-0">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
