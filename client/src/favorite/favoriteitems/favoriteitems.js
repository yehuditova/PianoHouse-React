import React from 'react'
import { GetItemsById, GetUserFavorite, UpdatetUserFavorite } from '../../server/server'
import { useState, useEffect } from 'react'

//The function that draws a specific item and its detailsto the screen
function ITEM(props) {
    return (
        <div className="cards">
            <div className="card mb-3" >
                <div class="row g-0">
                    <div className="col-md-4">
                        <img src={props.image} alt="" className='bgimg' />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title"><b>Piano</b></h5>
                            <p className="card-text">
                            Company: <b>{props.company}</b><br />
                            Color: <b>{props.color}</b><br />
                            Price: <b>{props.price}</b><br />
                            Barcode: <b>{props.barcode}</b><br/>
                              <b> My favorite piano!</b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

//The function goes over each item from the favorites list and sends it to another function that will draw it to the screen
function LITEMS(props) {
    return (
        <>
            {props.list.map((item) => {
                return <>
                    <ITEM
                        key={item._id}
                        company={item.company}
                        color={item.color}
                        price={item.price}
                        image={item.image}
                        barcode={item.barcode}>
                    </ITEM>
                </>
            })}
        </>
    )
}

export default (props) => {
    //The variable items will hold a list of favorite items
    const [items, setItems] = useState([]);
    useEffect(() => {
        if (props.userid) {
            GetUserFavorite(props.userid)
            .then((res)=>
            {
                if(res){
                       setItems(res)
                }
            });
        }
    }, [props.userid]);
    return (
        <>
            <LITEMS list={items} userid={props.userid} />
        </>
    )
}



