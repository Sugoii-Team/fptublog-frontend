import { Route, Switch } from "react-router-dom";
import NavBar from "./components/Header/navBar";
import HomePage from "./pages/Newest/HomePage";
import Markdown from './pages/Markdown/markdown';
import BlogContentFeature from "./pages/Showblogcontent/BlogContent";
import Dashboard from "./pages/AdminDashboard/Dashboard";
function App() {
  return (
    <div className="App font-monsterrat">
      <div>
        <header>
          <NavBar />
        </header>
        <div className="flex justify-center">
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path='/blogdetail' component = {BlogContentFeature} exact/>
            <Route path='/markdown' component = {Markdown} exact/>
            <Route path='/dashboard' component = {Dashboard} exact/>
          </Switch>
        </div>
        <footer></footer>
      </div>
    </div>
  );
}

export default App;
