//The component responsible for payment
import React, { useContext, useState, useEffect } from 'react'
import Paypal from './paypal'
import { MyUser } from '../userContext'
import { GetOrderByUserid } from '../server/server'
import { GetItemByBarcode } from '../server/server'
import './payment.scss'

var currentDate = parseInt(new Date() / 100000000)
export default ({ history }) => {
    const { myuser } = useContext(MyUser)
    const [barcode, setBarcode] = useState()
    const [item, setItem] = useState()
    const [orders, setOrders] = useState()
    const updateBarcode = (event) => {
        setBarcode(event.target.value)
    }
    useEffect(() => {
        // GetItemByBarcode(barcode).then((res) => { return setItem(res ? res[0] : null) })
          GetItemByBarcode(barcode).then((res) => setItem(res) )
    }, [barcode])
    useEffect(() => {
        GetOrderByUserid(myuser._id).then((res) => { return setOrders(res ? res : null) })
    }, [barcode])
         //The user is a mechanical barcode and accordingly a payment option is created for this piano
    return (
        <div className="pay">
            <>
       
                <div id="form">
                    <div className="form-floating mb-3">
                        <input value={barcode} onChange={updateBarcode} type="number" id="floatingInput" name="barcode" placeholder="Enter Barcode" className="form-control" />
                        <label htmlfor="floatingInput"><b>Piano barcode to order:</b></label>
                    </div>
                </div>

                {item && <div className="cards">
                    <div className="card mb-3" >
                        <div class="row g-0">
                            <div className="col-md-4">
                                <img src={item.image} alt="" className='bgimg' />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title"><b>The best piano for you</b></h5>
                                    <p className="card-text">
                                        Company: <b>{item.company}</b><br />
                                        Color: <b>{item.color}</b><br />
                                        Price: <b>{item.price}</b><br />
                                        Barcode: <b>{item.barcode}</b><br />
                                    </p>
                                </div>
                                <div id="paypal">
                                <Paypal history={history} user={JSON.parse(localStorage.getItem("user"))} item={item} />   
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                }

                {
                    orders && orders.map((item) => {
                        GetItemByBarcode(item.barcode)
                        return ((14 + item.date - currentDate) > 0 &&
                            <div className="cards">
                                <div className="card mb-3" >
                                    <div class="row g-0">
                                        <div className="col-md-4">
                                            <img src={item.image} alt="" className='bgimg' />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title"><b>The order was successfully placed!</b></h5>
                                                <p className="card-text">
                                                    Company: <b>{item.company}</b><br />
                                                    Color: <b>{item.color}</b><br />
                                                    Price: <b>{item.price}</b><br />
                                                    Barcode: <b>{item.barcode}</b><br />
                                                </p>
                                                <p className="card-text">
                                                    Your order will be delivered in {14 + item.date - currentDate} days
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }


            </>
        </div>
    )
}