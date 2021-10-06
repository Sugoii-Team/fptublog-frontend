import { Route, Switch } from "react-router-dom";
import NavBar from "./components/Header/navBar";
import Approval from "./pages/Approval/components/Approval";
import HomePage from "./pages/Newest/HomePage";
import PostBlog from "./pages/PostBlog/PostBlog";
function App() {
  return (
    <div className="App font-monsterrat">
      <div>
        <header>
          <NavBar />
        </header>
        <div>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/createNewPost" component={PostBlog} />
            <Route path="/approval" component={Approval} />
          </Switch>
        </div>
        <footer></footer>
      </div>
    </div>
  );
}

export default App;
