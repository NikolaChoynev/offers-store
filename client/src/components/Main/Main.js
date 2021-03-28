import { Route, Switch } from "react-router-dom";

import style from "./Main.module.css";

import Offers from "../Offers";
import Details from "../Details";
import Create from "../Create";

const Main = () => {
  return (
    <main className={style.main}>
      <Switch>
        <Route path="/" component={Offers} exact />
        <Route path="/offers/details/:id" component={Details} exact />
        <Route path="/offers/create" component={Create} exact />
      </Switch>{" "}
    </main>
  );
};

export default Main;
