//The component that takes care of managing everything related to the current user
import React, { useState, useEffect,useContext } from 'react'
import Login from './login/login'
import RegistrationForm from './registrationForm/registrationForm'
import Logout from './logout/logout'
import { MyUser } from '../userContext'
import './account.scss'

export default ()=>{
    const { myuser, setmyuser } = useContext(MyUser)
    //A function that allows you to log out of a user only if there is a user who is actually logged in
    const logout=()=>{
        if(myuser.email!="our"){
        return(
            <Logout/>
        )
        }
    }
     return(
         <div className="account">
         <div className="loginComponent">
            <p><b>Login</b></p>
         <Login/>
         </div>
         <div  className="registerComponent">
         <p><b>Register</b></p>
         <RegistrationForm type="register"/>
         </div>
         <div className="logoutComponent">
         {logout()}
         </div>
         </div>
     )
}


