import React, { useEffect } from 'react'
import './App.css';
import Favorite from './favorite/favorite'
import { Route, Switch } from 'react-router-dom'

import Home from './home/home'
import Sale from './ourPianos/ourPianos'
import Buy from './sellUs/sellUs'
import Account from './account/account'
import Accountsummary from './account/accountSummary/accountSummary'
import Payment from './payment/payment'
import Navbar from './navbar/navbar'

import { useState } from 'react';
import { GetAnonimusUser } from './server/server'
import { MyUser } from './userContext'


import { initialDB } from './server/initialDB';
import { GetItemByBarcode } from './server/server';

const getUser = JSON.parse(localStorage.getItem("user"))
var getCurrentDate = require('get-current-date')
var orderDate = new Date()


function App() {

  GetItemByBarcode(98003).then((item) => {
    if (!item) {
      initialDB()
    }
  })
  const [local, setLocal] = useState(["trying"])
   useEffect(() => {
    GetAnonimusUser()
      .then(res => setLocal(res)
    )
  },[])

  if (!localStorage.getItem("user")) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        "id": 2,
        "fname": "My account",
        "email": ""}
      )
    )
  }
  if(!local[0]&!JSON.parse(localStorage.getItem("user")).email){
    localStorage.setItem(
      "user",
      JSON.stringify(
        local
      ))
  }


  const [myuser, setMuser] = useState(JSON.parse(localStorage.getItem("user")))
  function setmyuser() {
    setMuser(JSON.parse(localStorage.getItem("user")));
  }
  return (
    <>
      <MyUser.Provider value={{ myuser, setmyuser }}>
        <Navbar /><br /><br /><br /><br />
        <Switch><div id="app">
          <Route exact component={Home} path="/" />
          <Route exact component={Sale} path="/sale" />
          <Route exact component={Buy} path="/buy" />
          <Route exact component={Favorite} path="/favorite" />
          <Route exact component={Account} path="/account" />
          <Route exact component={Accountsummary} path="/accountsummary" />
          <Route exact component={Payment} path="/payment" />
        </div>
        </Switch>
      </MyUser.Provider>
  
    </>
  );
}
export default App;


