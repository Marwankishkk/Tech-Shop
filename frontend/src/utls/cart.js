
export const updateCart = (state) => {
    state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    state.taxPrice = Number((0.1 * state.itemsPrice).toFixed(2));
    state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
    state.totalPrice = Number((state.itemsPrice + state.taxPrice + state.shippingPrice).toFixed(2));
    return state;

};
