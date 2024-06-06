import axios from "axios";
import { 
    CART_ADD_ITEM,CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD 
} from "../Constants/CartConstants";
import { imgUrl , url } from '../Connections/connection'


export const addToCart = (id,qtyy) => async (dispatch,getState)=>{
    const {data} = await axios.get(url+`api/products/${id}`)
    const qty = parseInt(qtyy)
    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            product:data._id,
            name:data.name,
            Image:imgUrl + data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty
        }
    }) 
    if(getState().cart.cartItems !== undefined){
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
    }
    
   // localStorage.setItem('cartItems',JSON.stringify(data))
    
}

export const removeFromCart = (id) =>(dispatch,getState)=>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItem))
}

export const saveShippingAddress = (data) =>(dispatch)=>{
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress',JSON.stringify(data))
}

export const savePaymentMethod = (data) =>(dispatch)=>{
    dispatch({
        type:CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod',JSON.stringify(data))
}