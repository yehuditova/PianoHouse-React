import React from 'react'
import Item from './item'

import Search from '../search/search'
import './ourPianos.scss'

export default({history})=>{
    return(
        <>
          <Search/>
        <div className="ourPianos">
          <br/>
          <br/>
          <Item history={history}/>
    </div>
    </>
    )
}
