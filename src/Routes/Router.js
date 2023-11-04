import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import Index from "../Pages/Index";
import ViewPage from "../Pages/ViewPage";
import AddMoviePage from "../Pages/AddMoviePage";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Index} exact></Route>
          <Route path="/view_page/:id" component={ViewPage} exact></Route>
          <Route path="/add" component={AddMoviePage} exact></Route>
          <Route path="/login" component={Login} exact></Route>
          <Route path="/profile" component={Profile} exact></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;
