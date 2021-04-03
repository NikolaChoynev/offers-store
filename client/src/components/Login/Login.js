import style from "./Login.module.css";
import * as userServices from "../../services/userServices";

const Login = ({ history }) => {
  const onLoginFormSubmitHandler = (e) => {
    e.preventDefault();

    const password = e.target.password.value;
    const email = e.target.email.value;
    const role = e.target.role.value;
    userServices
      .login(email, password, role)
      .then((user) => {
        history.push("/");
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("loggedIn", true);
      })
      .catch((err) => console.log(err));
    };

  return (
    <section className={style.login}>
      <form onSubmit={onLoginFormSubmitHandler}>
        <fieldset>
          <legend>Login</legend>
          <p>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Email" />
          </p>

          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </p>
          <p>
            <label htmlFor="role">Role</label>
            <input
              type="text"
              name="role"
              id="role"
              placeholder="User/Company"
            />
          </p>
          <input type="submit" name="login" id="login" value="Login" />
        </fieldset>
      </form>
    </section>
  );
};

export default Login;
