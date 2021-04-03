import style from './Login.module.css';

const Login = () => {
    return (
        <section className={style.login}>
            <form action="#" method="post">
                <fieldset>
                    <legend>Login</legend>
                    <p>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Email"/>
                    </p>
                    
                    <p>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password"/>
                    </p>
                    <input type="submit" name="addOffer" id="addOffer" value="Login" />
                    
                </fieldset>
            </form>
        </section>
    );
};

export default Login;