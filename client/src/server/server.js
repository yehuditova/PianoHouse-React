import { parse } from 'query-string';
import { v4 as uuid } from 'uuid'
const mongoose = require('mongoose');

const URL = 'http://localhost:400'
const URL_DB = 'http://localhost:8080'
const HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
}

//items
export function CreateItem(item) {
    fetch(`${URL_DB}/api/item/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    });
}

export function GetListItems() {
    return fetch(`${URL_DB}/api/item/findAll`, {
        'Content-Type': 'application/json',
    }
    ).then((res) => res.json())

}


export function GetItemsById(itemid) {
    return fetch(`${URL_DB}/api/item/findByID?${itemid}`, {
        'Content-Type': 'application/json',
    }
    ).then((res) => res.json()
        .then((data) => data[0])
    )
}

export function GetItemByBarcode(barcode) {
    return fetch(`${URL_DB}/api/item/findOne?barcode=${barcode}`, {
        'Content-Type': 'application/json',
    }
    ).then((res) => res.json()
        .then((data) => data[0])
    )
}

//end items

//favorite

export function GetUserFavorite(userId) {
    return fetch(`${URL_DB}/api/favorite/findAll?userid=${userId}`, {
        'Content-Type': 'application/json',
    })
        .then((res) => res.json()
        ).then((ui) => {
            if (ui[0]) {
                const items = ui.map((singleItem) => {
                   return singleItem.itemid
                })
                return items
            }
            else {
                return []
            }
        })
}

export function GetUserFavoriteItem(userId, itemId) {
    return fetch(`${URL_DB}/api/favorite/findOne?userid=${userId}&itemid=${itemId}`, {
        'Content-Type': 'application/json',
    })
        .then((res) => res.json()
        ).then((ui) => {
            if (ui._id) {
                return ui
            }
            else {
                return null
            }
        })
}

export function deleteUserFavoriteItem(userid, itemid) {

    return fetch(`${URL_DB}/api/favorite/delete/?userid=${userid}&itemid=${itemid}`, {
        method: "DELETE"
    }).then((res) => res.json());
}

export function createUserFavoriteItem(item) {


    return fetch(`${URL_DB}/api/favorite/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
}

export function UpdatetUserFavorite(userId, itemId) {

    return GetUserFavoriteItem(userId, itemId)
        .then(res => {
            if (res) {
                deleteUserFavoriteItem(userId, itemId)
            }
            else {
               
                createUserFavoriteItem({ userid: userId, itemid: itemId })
            }
        }
        )
}

//end favorite

//users

export function GetUserByEmailAndPassword(email, password) {
   
    return fetch(`${URL_DB}/api/user/findOne?email=${email}&password=${password}`, {
        'Content-Type': 'application/json',
    })
        .then((res) => res.json()
        )
   
}

export function GetUserByEmail(email) {

    return fetch(`${URL_DB}/api/user/find?email=${email}`, {
        'Content-Type': 'application/json',
    })
        .then((res) => res.json()
        )
}

export function createUser(user) {
    GetUserByEmail(user.email).then((res) => {
        if (!res[0]) {

            return fetch(`${URL_DB}/api/user/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fname: user.fname,
                    lname: user.lname,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    city: user.city,
                    postalCode: user.postalCode,
                    password: user.password
                })
            })
            .then((res) => res.json()).then(res =>
                GetUserByEmail(res.email).then((res =>
                    localStorage.setItem(
                        "user",
                        JSON.stringify(
                            res[0]
                        )
                    )
                ))
            )
        }
    }
    )

}



export function updateUser(user) {

    return fetch(`${URL_DB}/api/user/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },   
        body: JSON.stringify(user),
    })
    .then((res) => res.json())

}


export function GetAnonimusUser() {
    return(GetUserByEmail("our"))


}

//end users

//images

export function createUserImage(item) {
    return fetch(`${URL_DB}/api/image/create`, {
        headers:   {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify({
            userid: item.userid,
            data_url: item.data_url

        }),
    })

}




export function GetUserImages(userId) {

    return fetch(`${URL_DB}/api/image/findAll?userid=${userId}`, {
        'Content-Type': 'application/json',
    })
        .then((res) => res.json()
        ).then((ui) => {
            return ui
        })
}


//end images

//orders

export function createOrder(order) {
    return fetch(`${URL_DB}/api/order/create`, {
        headers:{'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify({
            userid: order.userid,
            date: order.date,
            price: order.price,
            barcode: order.barcode,
            company: order.company,
            color: order.color,
            image: order.image
        }),
    })
}



export function GetOrderByUserid(userid) {
    return fetch(`${URL_DB}/api/order/findOne?userid=${userid}`, {
        'Content-Type': 'application/json',
    })
        .then((res) => res.json()
        )
}

//end orders
