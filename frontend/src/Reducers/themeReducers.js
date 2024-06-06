import {
    DARK,
    RED,BLUE,
    WHITE

} from '../Constants/themeConstants'

export const colorThemeReducers = (state = { color:'black',backgroundColor:'lightGrey',navColor:'dark',navBackgound:'dark'}, action) => {
    switch (action.type) {
        case DARK:
            return { color:'white',backgroundColor:'black', navBackgound:'light' , navColor:'black'}

        case BLUE:
            return { color:'skyblue',backgroundColor:'blue', navBackgound:'primary' ,navColor:'skyblue'}
            
        case WHITE:
            return { color:'black',backgroundColor:'white', navBackgound:'dark' ,navColor:'white'}
            
        case RED:
            return { color:'black',backgroundColor:'red', navBackgound:'danger' ,navColor:'black'}

        default:
            return state
    }
}