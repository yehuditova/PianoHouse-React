import React from'react'

const getUser= JSON.parse(localStorage.getItem("user"))


export const MyUser=React.createContext(getUser)

