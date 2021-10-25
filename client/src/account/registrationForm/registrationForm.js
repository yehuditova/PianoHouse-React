import React, { useState, useEffect, useContext } from 'react'
import { MyUser } from '../../userContext'
import Validation from './validation'
import { GetUserByEmail } from '../../server/server'
import { updateUser } from '../../server/server'
import { createUser } from '../../server/server'
import { withRouter } from 'react-router-dom'



const RegistrationForm = (props, { history }) => {
    const { myuser, setmyuser } = useContext(MyUser)

    const [userExist, setUserExist] = useState([])

    const [registerd, setRegisterd] = useState(props.type == "update" ? myuser : [])
    const [error, setError] = useState({ fname:[null,registerd.fname?false:true], lname: [null,registerd.lname?false:true], password: [null,registerd.password?false:true], email: [null,registerd.email?false:true], phone: [null,registerd.phone?false:true], address: [null,registerd.address?false:true], city: [null,registerd.city?false:true], postalCode:[null,registerd.postalCode?false:true], submit: null })


    const updateRegisterdAndError = (event) => {
        setRegisterd({
            ...registerd,
            [event.target.name]: event.target.value
        })
        setError({
            ...error,
            [event.target.name]:[Validation(event.target.value, [event.target.name]), false]
        }
        )
    }

    const updateEmptyFields = () => {
        if (error.postalCode[1]) {
            setError({
                ...error,
                postalCode: ["Postal Code Empty", false]
            }
            )
        }
        if (error.city[1]) {
            setError({
                ...error,
                city: ["City Empty", false]
            }
            )
        }
        if (error.address[1]) {
            setError({
                ...error,
                address: ["Address Empty", false]
            }
            )
        }
        if (error.phone[1]) {
            setError({
                ...error,
                phone: ["Phone Empty", false]
            }
            )
        }
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
        if (error.lname[1]) {
            setError({
                ...error,
                lname: ["Lname Empty", false]
            }
            )
        }
        if (error.fname[1]) {
            setError({
                ...error,
                fname: ["Fname Empty", false]
            }
            )
        }
    }

    const updateRegisterSpecificError = (status) => {
   if(status){
        setError({
            ...error,
            registerd: ("This email is already associated with an existing account")
        }
        )
    }
    else{
        setError({
            ...error,
            registerd: null
        }
        )
    }
    }



    useEffect(() => {
        GetUserByEmail(registerd.email)
            .then(res => {
                if (res[0]) {
                    setUserExist(res[0])
                }
                else {
                    setUserExist(null)
                }
            })
    }, [registerd.email])

    const handleOnSubmit = (event) => {
        event.preventDefault()
        updateEmptyFields()
        var is_valid = (error.email[1] || error.password[1] ||error.lname[1] || error.fname[1]||error.address[1] || error.phone[1]||error.city[1] || error.postalCode[1])? false : true


        if (error.fname[0]||error.lname[0]||error.email[0]) {
            is_valid = false
        }


        if (error.password[0]||error.phone[0]||error.address[0]||error.city[0]||error.postalCode[0]) {
            is_valid = false
        }

        if ((props.type == "register" && userExist && userExist._id != 1) || (props.type == "update" && userExist && userExist._id != 1 && registerd.email != myuser.email)) {
            updateRegisterSpecificError(true)
        }



        else if (is_valid) {
            updateRegisterSpecificError(false)
            props.type == "register" ? createUser(registerd) : updateUser(registerd)
            setmyuser()
            props.history.push('/')

        }
    }
    const fnameField = () => {
        if (!error.fname[0]) {
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.fname} onChange={updateRegisterdAndError} type="text" id="floatingInput" name="fname" placeholder="Enter your fname" className="form-control" />
                    <label htmlfor="floatingInput">First name:</label>
                </div>
            )
        }
        else {
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.fname} onChange={updateRegisterdAndError} type="text" id="floatingInputInvalid" name="fname" placeholder="Enter your fname" className="form-control is-invalid" />
                    <label htmlfor="floatingInputInvalid">{error.fname[0]}</label>
                </div>
            )
        }
    }

    const lnameField = () => {
        if (!error.lname[0]) {
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.lname} onChange={updateRegisterdAndError} type="text" id="floatingInput" name="lname" placeholder="Enter your lname" className="form-control" />
                    <label htmlfor="floatingInput">Last name:</label>
                </div>
            )
        }
        else {
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.lname} onChange={updateRegisterdAndError} type="text" id="floatingInputInvalid" name="lname" placeholder="Enter your lname" className="form-control is-invalid" />
                    <label htmlfor="floatingInputInvalid">{error.lname[0]}</label>
                </div>
            )
        }
    }

    const emailField = () => {
        if (!error.email[0]&&!error.registerd) {
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.email} onChange={updateRegisterdAndError} type="email" id="floatingInput" name="email" placeholder="Enter your email adress" className="form-control" />
                    <label htmlfor="floatingInput">Email:</label>
                </div>
            )
        }
        else if(error.email[0]){
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.email} onChange={updateRegisterdAndError} type="email" id="floatingInputInvalid" name="email" placeholder="Enter your email adress" className="form-control is-invalid" />
                    <label htmlfor="floatingInputInvalid">{error.email[0]}</label>
                </div>
            )
        }
        else if(error.registerd[0]){
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.email} onChange={updateRegisterdAndError} type="email" id="floatingInputInvalid" name="email" placeholder="Enter your email adress" className="form-control is-invalid" />
                    <label htmlfor="floatingInputInvalid">{error.registerd}</label>
                </div>
            )
        }
    }
    const passwordField = () => {
        if (!error.password[0]) {
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.password} onChange={updateRegisterdAndError} type={props.type=="update"?"text":"password"} id="floatingInput" name="password" placeholder="Enter your password" className="form-control" />
                    <label htmlfor="floatingInput">Password:</label>
                </div>
            )
        }
        else {
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.password} onChange={updateRegisterdAndError} type={props.type=="update"?"text":"password"} id="floatingInputInvalid" name="password" placeholder="Enter your password" className="form-control is-invalid" />
                    <label htmlfor="floatingInputInvalid">{error.password[0]}</label>
                </div>
            )
        }
    }
    const phoneField = () => {
        if (!error.phone[0]) {
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.phone} onChange={updateRegisterdAndError} type="number" id="floatingInput" name="phone" placeholder="Enter your phone" className="form-control" />
                    <label htmlfor="floatingInput">Phone:</label>
                </div>
            )
        }
        else {
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.phone} onChange={updateRegisterdAndError} type="number" id="floatingInputInvalid" name="phone" placeholder="Enter your phone" className="form-control is-invalid" />
                    <label htmlfor="floatingInputInvalid">{error.phone[0]}</label>
                </div>
            )
        }
    }
    const addressField = () => {
        if (!error.address[0]) {
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.address} onChange={updateRegisterdAndError} type="text" id="floatingInput" name="address" placeholder="Enter your address" className="form-control" />
                    <label htmlfor="floatingInput">Address:</label>
                </div>
            )
        }
        else {
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.address} onChange={updateRegisterdAndError} type="text" id="floatingInputInvalid" name="address" placeholder="Enter your address" className="form-control is-invalid" />
                    <label htmlfor="floatingInputInvalid">{error.address[0]}</label>
                </div>
            )
        }
    }
    const cityField = () => {
        if (!error.city[0]) {
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.city} onChange={updateRegisterdAndError} type="text" id="floatingInput" name="city" placeholder="Enter your city" className="form-control" />
                    <label htmlfor="floatingInput">City:</label>
                </div>
            )
        }
        else {
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.city} onChange={updateRegisterdAndError} type="text" id="floatingInputInvalid" name="city" placeholder="Enter your city" className="form-control is-invalid" />
                    <label htmlfor="floatingInputInvalid">{error.city[0]}</label>
                </div>
            )
        }
    }
    const postalCodeField = () => {
        if (!error.postalCode[0]) {
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.postalCode} onChange={updateRegisterdAndError} type="number" id="floatingInput" name="postalCode" placeholder="Enter your postalCode" className="form-control" />
                    <label htmlfor="floatingInput">Postal Code:</label>
                </div>
            )
        }
        else {
            return (
                <div className="form-floating mb-3">
                    <input value={registerd.postalCode} onChange={updateRegisterdAndError} type="number" id="floatingInputInvalid" name="postalCode" placeholder="Enter your postalCode" className="form-control is-invalid" />
                    <label htmlfor="floatingInputInvalid">{error.postalCode[0]}</label>
                </div>
            )
        }
    }
    return (
        <div className="registrationform">

            <form onSubmit={handleOnSubmit} noValidate autocomplete="off">

                {fnameField()}
                {lnameField()}
                {emailField()}
               {passwordField()}
               {phoneField()}
               {addressField()}
               {cityField()}
               {postalCodeField()}
                <div>
                    <label htmlfor={props.type}></label>
                    <input value={props.type} type="submit" id={props.type} name={props.type} className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
export default withRouter(RegistrationForm)


