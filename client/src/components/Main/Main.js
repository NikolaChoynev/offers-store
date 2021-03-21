import { Route, Switch } from 'react-router-dom';

import style from "./Main.module.css";

import Offers from "../Offers";
import { Details } from "../Details";

const Main = () => {
  return (
    <main className={style.main}>
      <Switch>
        <Route path="/" component={Offers} exact />
        <Route path="/details/:id" component={Details} exact />
      </Switch>
      
    </main>
  );
};

export default Main;
