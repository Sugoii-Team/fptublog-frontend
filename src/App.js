import { Route, Switch } from "react-router-dom";
import NavBar from "./components/Header/navBar";
import HomePage from "./pages/Newest/HomePage";
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
          </Switch>
        </div>
        <footer></footer>
      </div>
    </div>
  );
}

export default App;
