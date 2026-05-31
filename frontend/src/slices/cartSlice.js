import {createSlice} from "@reduxjs/toolkit";
import {updateCart} from "../utls/cart";
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers:{
        addToCart(state, action){
            const item = action.payload;
            
            const existItem = state.cartItems.find(x => x._id === item._id);
            if(existItem){
                state.cartItems = state.cartItems.map(x => x === existItem ? item : x);
            }else{
                state.cartItems = [...state.cartItems, item];
            }
             updateCart(state);
            localStorage.setItem('cart', JSON.stringify(state));
        },
       removeFromCart(state, action){
            const productId = action.payload;
            state.cartItems = state.cartItems.filter(x => x._id !== productId);
            updateCart(state);
            localStorage.setItem('cart', JSON.stringify(state));
    },
        saveShippingAddress(state, action){
            state.shippingAddress = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },
    
        savePaymentMethod(state, action){
            state.paymentMethod = action.payload;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCartItems(state){
            state.cartItems = [];
            updateCart(state);
            localStorage.setItem('cart', JSON.stringify(state));
    },
}
    
});

export const {addToCart,removeFromCart , saveShippingAddress,savePaymentMethod,clearCartItems} = cartSlice.actions;

export default cartSlice.reducer;