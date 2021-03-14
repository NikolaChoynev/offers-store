import style from "./Main.module.css";

import Offers from "../Offers";

const Main = () => {
  return (
    <main className={style.main}>
      <h1> Active offers </h1>

      <Offers />
    </main>
  );
};

export default Main;
