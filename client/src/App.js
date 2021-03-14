import style from "./App.module.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <div className={style.app}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
