//A component that allows you to disconnect from an existing user and switch to anonymous mode
import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { MyUser } from '../../userContext'
import { GetAnonimusUser } from '../../server/server'
import './logout.scss'

const Logout = ({ history }) => {
    const { myuser, setmyuser } = useContext(MyUser)
    //The variable anonimususer holds the value of the anonymous variable defined in the program
    const [anonimususer, setAnonimususer] = useState([])
    useEffect(()=>{
        GetAnonimusUser()
            .then(res => {
                setAnonimususer(res)
            })
    },[])
    //A function that when the user clicks on logout he will go into anonymous mode
    const handleOnSubmit = (event) => {
        event.preventDefault()
        localStorage.setItem(
            "user",
            JSON.stringify(
                anonimususer[0]
            )
        )
        setmyuser()
        history.push('/')
    }
    //What the component returns ...
    return (
        <div className="logout">
            <p><b>Logout</b></p>
            <form onSubmit={handleOnSubmit}>
                <p id="p" >Not {JSON.parse(localStorage.getItem("user")).fname}  {JSON.parse(localStorage.getItem("user")).lname}?</p>
                <div>
                    <label htmlfor="logout"></label>
                    <input value="logout" type="submit" id="logout" name="logout" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
export default withRouter(Logout);