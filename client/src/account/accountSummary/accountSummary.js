// A component that draws the user's account information to the screen and allows him to change it

import React, { useContext } from 'react'
import { MyUser } from '../../userContext'
import RegistrationForm from '../registrationForm/registrationForm'
import './accountSummary.scss'

const AccountSummary=() => {
   const { myuser} = useContext(MyUser)
   return(
    
   <div className="accountSummary">
    <p><b>Hello {myuser.fname} {myuser.lname}</b></p>
    <div className="reg">
   <RegistrationForm type="update"/>
   </div>
   </div>
   )
}
export default AccountSummary;
