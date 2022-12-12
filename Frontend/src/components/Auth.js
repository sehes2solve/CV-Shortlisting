import ScriptTag from 'react-script-tag';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Cookies from "js-cookie";

const Auth = ({isLogin}) => {
    const navigate=useNavigate()
    const [user, setUser] = useState({username: "", password: ""});
    // this method is for both login and register
    const login = async (e) => {
        e.preventDefault()
        const url = isLogin ? "login" : "signup";
        console.log(user)
        const x=await fetch(`http://localhost:3000/users/${url}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });
        const y=await x.json();
        console.log("hhhhhhhhh");
        console.log(y.token)
        if(y.success){
            Cookies.set("token",y.token)

            navigate("/")
        }else{
            alert("failed")
        }
    }
    return (
        <html lang="en">
        <head>
            <ScriptTag type="text/javascript" src="assets/js/main.js"/>
            <title>{isLogin ? "Login" : "Register"}</title>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>

        </head>
        <body>

        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt">
                        <img src="assets/images/img-01.png" alt="IMG"/>
                    </div>

                    <form className="login100-form validate-form">
					<span className="login100-form-title">
						Member {isLogin ? "Login" : "Register"}
					</span>

                        <div className="wrap-input100 validate-input"
                             data-validate="Username is required">
                            <input className="input100" type="text" name="username" placeholder="Username" onChange=
                                {(e) => setUser({username: e.target.value, password: user.password})}/>
                            <span className="focus-input100"/>
                            <span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"/>
						</span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <input className="input100" type="password" name="password" placeholder="Password" onChange=
                                {(e) => setUser({username: user.username, password: e.target.value})}/>
                            <span className="focus-input100"/>
                            <span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"/>
						</span>
                        </div>

                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" onClick={login}>
                                {isLogin ? "Login" : "Register"}
                            </button>
                        </div>


                        <div className="text-center p-t-136">
                            <Link className="txt2" to={isLogin ? "/register" : "/login"}>
                                {isLogin ? "Create your Account" : "Login"}
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"/>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        </body>
        </html>
    )
}
export default Auth
