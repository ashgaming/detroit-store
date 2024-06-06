import {combineReducers} from 'redux'

import { productListReducers,
    productDetailsReducers,
    productDeleteReducers,
    productCreateReducers,
    productUpdateReducers ,
    productCreateReviewReducers ,
    productTopRatedReducer,
} from './Reducers/productReducers'

    import { orderCreateReducer,
        orderDetailsReducer,
        orderPayReducer,
        orderDeliveredReducer,
        myorderlistReducer ,
        orderlistReducer,
    } from "./Reducers/orderReducers"

    import {
        userLoginReducers,
        userRegisterReducers,
        userDetailsReducers,
        userUpdateProfileReducers,
        userListReducer,
        userDeleteReducer,
        userUpdateReducer,
    } from "./Reducers/userReducers";
    import {colorThemeReducers} from "./Reducers/themeReducers";
    import { cartReducer } from "./Reducers/cartReducers"



export const reducer = combineReducers({
    productlist: productListReducers,
    productDetails: productDetailsReducers,
    productDelete:productDeleteReducers,
    productCreate:productCreateReducers,
    productUpdate:productUpdateReducers,
    productCreateReview:productCreateReviewReducers,
    productTopRated: productTopRatedReducer,

    cart: cartReducer,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    userList:userListReducer,
    userDelete:userDeleteReducer,

    orderlist:orderlistReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderDeliver:orderDeliveredReducer,
    myorderlist:myorderlistReducer,
    userUpdate:userUpdateReducer,
    colorTheme:colorThemeReducers,

})