// A component that allows an existing user to reconnect

import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import Validation from '../registrationForm/validation'
import { GetUserByEmailAndPassword } from '../../server/server'
import { MyUser } from '../../userContext'



const Login = ({ history }) => {
    const { myuser, setmyuser } = useContext(MyUser)
    // The variable userExist checks if the account to whom the user trying to connect really exists
    const [userExist, setUserExist] = useState([])
    // The login variable saves the current details that the user enters
    const [login, setlogin] = useState({
        email: myuser.email
    })
    // The variable error checks whether the information the user enters is correct
    const [error, setError] = useState({ email: [null, login.email ? false : true], password: [null, true], submit: null })
    // A function that updates each change the login and error
    const updateLoginAndError = (event) => {
        setlogin({
            ...login,
            [event.target.name]: event.target.value
        })
        setError({
            ...error,
            [event.target.name]: [Validation(event.target.value, [event.target.name]), false]
        }
        )
    }
    //A function that runs at initialization and its function is to make sure that the fields are not empty
    const updateEmptyFields = () => {
        if (error.password[1]) {
            setError({
                ...error,
                password: ["Password Empty", false]
            }
            )
        }
        if (error.email[1]) {
            setError({
                ...error,
                email: ["Email Empty", false]
            }
            )
        }
    }
    //A function that updates the error in which the user does not exist
    const updateLoginSpecificError = () => {
        setError({
            ...error,
            login: "user not exist"
        }
        )
    }
    //A function that updates the variable userExist every moment according to what the user enters
    useEffect(() => {
        GetUserByEmailAndPassword(login.email, login.password)
            .then(res => {
                if (res[0]) {
                    setUserExist(res[0])
                }
                else {
                    setUserExist(null)
                }
            })
    }, [login])
   // A function that runs while the user presses the button login
    const handleOnSubmit  =  async (event) => {
        event.preventDefault()
        updateEmptyFields()
        //The variable is_valid checks whether the entire form is correct
        var is_valid = error.email[1] || error.password[1] ? false : true
        if (error.email[0]||error.password[0]) {
            is_valid = false
        }
        if (is_valid && !userExist) {
            updateLoginSpecificError()
        }
        
        //In case the entire form is correct update the current user and go to the page with his account details
        else if (is_valid) {
            localStorage.setItem(
                "user",
                JSON.stringify(
                    userExist
                )
            )
            setmyuser()
            history.push('./accountsummary')

        }
    }
    //Here, functions that draw the fields of the form itself to the screen in case the value entered 
    //into the field is correct and in case not
    const emailField = () => {
        if (!error.email[0]) {
            return (
                <div className="form-floating mb-3">
                    <input value={login.email} onChange={updateLoginAndError} type="email" id="floatingInput" name="email" placeholder="Enter your email adress" className="form-control" />
                    <label htmlfor="floatingInput">Email:</label>
                </div>
            )
        }
        else {
            return (
                <div className="form-floating mb-3">
                    <input value={login.email} onChange={updateLoginAndError} type="email" id="floatingInputInvalid" name="email" placeholder="Enter your email adress" className="form-control is-invalid" />
                    <label htmlfor="floatingInputInvalid">{error.email[0]}</label>
                </div>
            )
        }
    }
    const passwordField = () => {
        if (!error.password[0] && !error.login) {
            return (
                <div className="form-floating mb-3">
                    <input value={login.password} onChange={updateLoginAndError} type="password" id="floatingInput" name="password" placeholder="Enter your password" className="form-control" />
                    <label htmlfor="floatingInput">Password:</label>
                </div>
            )
        }
        else if (error.password[0]) {
            return (
                <div className="form-floating mb-3">
                    <input value={login.password} onChange={updateLoginAndError} type="password" id="floatingInputInvalid" name="password" placeholder="Enter your password" className="form-control is-invalid" />
                    <label htmlfor="floatingInputInvalid">{error.password[0]}</label>
                </div>
            )
        }
        //Here, we examine the case where the error is because the user does not exist
        else if (error.login) {
            return (
                <div className="form-floating mb-3">
                    <input value={login.password} onChange={updateLoginAndError} type="password" id="floatingInputInvalid" name="password" placeholder="Enter your password" className="form-control is-invalid" />
                    <label htmlfor="floatingInputInvalid">{error.login}</label>
                </div>
            )
        }

    }
    //What the entire component returns: drawing the fields to the screen and a connect button
    return (
        <div className="login">
            <form onSubmit={handleOnSubmit} noValidate autocomplete="off">
                {emailField()}
                {passwordField()}
                <div className="form-floating mb-3">
                    <label htmlfor="login"></label>
                    <input value="login" type="submit" id="login" name="login" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
export default withRouter(Login);