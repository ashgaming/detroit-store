import { CART_ADD_ITEM ,
    CART_REMOVE_ITEM ,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,

} from "../Constants/CartConstants";

export const cartReducer = (state ={cartItems:[],Shipping_Address:{}},action)=>{
    switch(action.type){
        case CART_ADD_ITEM :
            const item = action.payload
            const existItem = state.cartItems.find(x=>x.product === item.product)
            
            if(existItem!==undefined){
                return {
                    ...state,
                    cartItems:state.cartItems.map(x=>x.product === JSON.parse(existItem.product) ? item : x
                    )
                }
            }else{
                return {
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }
        case CART_REMOVE_ITEM :
            return{
                ...state,
                cartItems:state.cartItems.filter(x =>x.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress:action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod:action.payload
            }

        case CART_CLEAR_ITEMS:
            return{
                ...state,
                cartItems:[]
            }
            
        default:
            return state
    }
}