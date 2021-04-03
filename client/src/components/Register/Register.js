import style from "./Register.module.css";

const Register = () => {
  return (
    <section className={style.register}>
      <form action="#" method="post">
        <fieldset>
          <legend>Register</legend>
          <p>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
          </p>

          <p>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Email" />
          </p>
          <p>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
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
            <label htmlFor="re-password">Re-Password</label>
            <input
              type="password"
              name="re-password"
              id="re-password"
              placeholder="Re-Password"
            />
          </p>

          <input type="submit" name="addOffer" id="addOffer" value="Register" />
        </fieldset>
      </form>
    </section>
  );
};

export default Register;
