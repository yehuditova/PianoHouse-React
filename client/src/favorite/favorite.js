//A function that draws to the screen only the pianos that the user has specified as his favorite
import React from 'react'
import Favoriteitems from './favoriteitems/favoriteitems'
import './favorite.scss'

export default()=>{
    return(
        <div className="favorite">
        <Favoriteitems userid={JSON.parse(localStorage.getItem("user"))._id}/>
    </div>
    )
}