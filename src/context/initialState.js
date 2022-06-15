import { fetchCart, fetchUser } from '../utils/fetchLocalStorageData'

const userInfo = fetchUser()
const cartInfo = fetchCart()
// Here we define the initial state of user 
export const initialState = {
     user: userInfo,
     foodItems: null,
     cartShow: false,
     cartItems : cartInfo
};