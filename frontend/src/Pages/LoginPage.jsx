import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../api/api";
import DefaultPage from "../components/DefaultPage";

const LoginPage = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const doLogin = (event) => {
        event.preventDefault()
        fetch(apiUrl + "/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then((response) => response.json())
        .then(result => {
            if(result.err) {
                setError("There was a problem with your login.")
            } else {
                setError("")
                
                const token = result.token
                props.setToken(token)
                navigate("/")
            }
        })
        .catch(() => console.log("errrrror"))
        .finally(() => {
            // reset input fields
            // egal ob es bereits im then oder im catch war
            setEmail("")
            setPassword("")
        })
    }

    return ( 
        <DefaultPage title="Login">
            <form>
                <label htmlFor="email-input">
                    E-Mail:
                </label><br/>
                <input id="email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br/>
                <label htmlFor="password-input">
                    Password:
                </label><br/>
                <input id="password-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br/>
                <button className="login-button" onClick={doLogin}>Login</button>
           
                <br/>
               {error && <p className="error-message">{error}</p>}
             </form>
            <br/>
            <Link to="/register">Create an Account</Link>
        </DefaultPage>
        
     );
}
 
export default LoginPage;