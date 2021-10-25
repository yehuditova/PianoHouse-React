import React, { useContext } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import emailjs from 'emailjs-com'
import { init } from 'emailjs-com';
import { createOrder } from '../server/server'
init("user_opfGOYNkTiQ1ix3ho4hAZ");



export default class MyApp extends React.Component {

    render() {

        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            console.log("The payment was succeeded!", payment);
            emailjs.send('Yt0533110791', 'template_m4nq73n', { 'name': this.props.user.fname, 'email': this.props.user.email, 'message':  'Piano Barcode:'+this.props.item.barcode+"   Sum:"+this.props.item.price, 'days': 14 }, 'user_opfGOYNkTiQ1ix3ho4hAZ');
            createOrder({userid:this.props.user._id,barcode:this.props.item.barcode,company:this.props.item.company,color:this.props.item.color,image:this.props.item.image,price:this.props.item.price,date:parseInt(new Date()/100000000)})
    
        }

        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            emailjs.send('Yt0533110791', 'template_dz5kdcq', { 'name': this.props.user.fname, 'email': this.props.user.email, 'message': 'Piano Barcode:'+this.props.item.barcode, 'days': 14 }, 'user_opfGOYNkTiQ1ix3ho4hAZ');
            // createOrder({userid:this.props.user.id,barcode:this.props.item.barcode,company:this.props.item.company,color:this.props.item.color,image:this.props.item.image,price:this.props.item.price,date:parseInt(new Date()/100000000)})
        }

        const onError = (err) => {
            console.log("Error!", err);
        }

        let env = 'sandbox'; 
        let currency = 'USD'; 
        let total =this.props.item.price; 

        const client = {
            sandbox: 'AVnC3wmOyaPiNgA1XQxAem1ajecV8c6950IYE-Bq311LEvw7tLjz9rTUrapqEq9Buu6GReB1cgjc3srY',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
    
        return (
            <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        );
    }
}