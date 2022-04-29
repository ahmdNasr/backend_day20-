import { useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../api/api";
import DefaultPage from "../components/DefaultPage";

const RegistrationPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const doRegister = async (event) => {
        event.preventDefault()

        if(password.length < 8) {
            setError("Password must be at least 8 charachters!")
            return
        }

        if(password !== passwordConfirm) {
            setError("Password must match with password confirmation!")
            return
        }

        try {
            const response = await fetch(apiUrl + "/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })
            const result = await response.json()
            console.log("result", result.err)
            if(result.err) {
                console.log("result.err should be set now...")
                setError(result.err)
            } else if(result.acknowledged === true && result.insertedId){
                // console.log(result)
                setSuccess("Your account was created successfully, please login now!")
                // reset errors & fields
                setError("")
                // reset input fields
                setName("")
                setEmail("")
                setPassword("")
                setPasswordConfirm("")
            }
        } catch(error) {
            console.log("error:", error)
            setError("There was a problem with your account registration.")
        }
    }

    return ( 
        <DefaultPage title="Create a new Account">
            <form>
                <label htmlFor="name-input">
                    Name:
                </label><br/>
                <input id="name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <br/>
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
                <label htmlFor="password-confirm-input">
                    Confirm Password:
                </label><br/>
                <input id="password-confirm-input" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                <br/>
                <button className="login-button" onClick={doRegister}>Create my Account</button>
           
                <br/>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
            Already have an account? <Link to="/login">Login</Link>
        </DefaultPage>
    );
}
 
export default RegistrationPage;