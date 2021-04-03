import { Route, Switch } from "react-router-dom";

import style from "./Main.module.css";

import Offers from "../Offers";
import Details from "../Details";
import Create from "../Create";
import Login from "../Login";
import Register from "../Register";

const Main = () => {
  return (
    <main className={style.main}>
      <Switch>
        <Route path="/" component={Offers} exact />
        <Route path="/offers/details/:id" component={Details} exact />
        <Route path="/offers/create" component={Create} exact />
        <Route path="/users/login" component={Login} exact />
        <Route path="/users/register" component={Register} exact />

      </Switch>{" "}
    </main>
  );
};

export default Main;
