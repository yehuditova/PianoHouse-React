//The component that draws the pianos to the screen
import React, { useState, useEffect, useContext } from 'react'
import { GetListItems } from '../server/server'
import { UpdatetUserFavorite } from '../server/server'
import { MyUser } from '../userContext'
import QueryString from 'query-string'
import { GetUserFavoriteItem } from '../server/server'

function ITEM(props) {
    const { myuser } = useContext(MyUser)
    //A variable whose job it is to take care of the update of the favorite pianos
    const [currentFavorite, setCurrentFavorite] = useState([])
    useEffect(() => {
        GetUserFavoriteItem(myuser._id, props.id).then(res =>
            setCurrentFavorite(res)
        )
    }, []);

    const updateFavorite = (itemid) => {
        UpdatetUserFavorite(myuser._id, itemid)
        GetUserFavoriteItem(myuser._id, props.id).then(res =>
            setCurrentFavorite(!res)
        )
    }

    //The function is responsible for updating the appropriate icon - to the screen
    const drawheartbutton = () => {
        if (currentFavorite)
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                </svg>
            )
        if (!currentFavorite)
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suit-heart" viewBox="0 0 16 16">
                    <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                </svg>
            )
    }

    return (
        <div className='singleitem'>
            <div className="card"  >
                <div >
                    <img src={props.image} className="card-img-top" alt="" />
                    <div className="local-card-body">
                            <h5 className="card-title"><b>Piano</b></h5>
                            <p className="card-text">
                           Company: <b>{props.company}</b><br />
                            Color: <b>{props.color}</b><br />
                            Price: <b>{props.price}</b><br />
                            Barcode: <b>{props.barcode}</b><br/>
                        </p>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={() => { updateFavorite(props.id) }}>
                    {drawheartbutton()}
                </button >
            </div>
        </div>
    )
}

function LITEMS(props) {
    return (
        <>
            {props.list.map((item) => { 
                return < >

                    <ITEM
                        key={item._id}
                        company={item.company}
                        color={item.color}
                        price={item.price}
                        image={item.image}
                        history={props.history}
                        barcode={item.barcode}
                        id={item._id}
                       >
                    </ITEM>
                </>

            })}
        </>
    )
}

//A function that filters the appropriate items according to the search value entered by the user
export default ({ history }) => {
    const [items, setItems] = useState([])
    useEffect(() => {
        const objString = QueryString.parse(history.location.search)
       
        GetListItems()
            .then(res => {
                const selectedByCompany = res.filter((singleItem) => {
                    return (singleItem.company == objString.company || objString.company === undefined || objString.company == "")
                })
                const selectedByColor = selectedByCompany.filter((singleItem) => {
                    return (singleItem.color == objString.color || objString.color === undefined || objString.color == "")
                })
                const SelectedByPrice = selectedByColor.filter((singleItem) => {
                    return (singleItem.price <= objString.price || objString.price === undefined || objString.price == "")
                })
                setItems(SelectedByPrice)
            }
            )
    }, [history.location])
    return (
        <div>
            <LITEMS list={items} history={history} />
        </div>
    )
}

