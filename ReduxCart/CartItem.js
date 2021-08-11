export const ADD_USER = 'ADD_USER'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const ADD_TO_ORDER = 'ADD_TO_ORDER'
export const CANCEL_FROM_ORDER = 'CANCEL_FROM_ORDER'

const initialState = {
  users:'',
  cart: [],
  total: 0,
  order:[]
}
export const getBasketTotal = (cart) => 
    cart?.reduce((amount, item) => item.sale_price*item.quantity + amount, 0);

const removeProductFromCart = (productId, state) => {
      console.log("Removing product with id: " + productId);
      const updatedCart = [...state.cart];
      const updatedItemIndex = updatedCart.findIndex(item => item.id === productId);
    
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      updatedItem.quantity--;
      if (updatedItem.quantity <= 0) {
        updatedCart.splice(updatedItemIndex, 1);
      } else {
        updatedCart[updatedItemIndex] = updatedItem;
      }
      return { ...state, cart: updatedCart };
    };

const cartItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: action.payload,...state.users
         }

    case ADD_TO_CART:      
        const updatedCart = [...state.cart];
        const item = updatedCart.findIndex(x=>x.id===action.payload.id);
        if(item<0)
        {
          updatedCart.push({...action.payload,quantity: 1} );
        }
        else{
          
          const updatedItem = {
            ...updatedCart[item]
            
          };
          updatedItem.quantity++;
          updatedCart[item] = updatedItem;
        }
         return {
             ...state,
             cart: updatedCart,
         }
    
      
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item, i) => i !== action.payload.index),
    }
      
    case ADD_TO_ORDER:
      return {
        ...state,
        order: [action.payload, ...state.order],
    }
    case CANCEL_FROM_ORDER:
      return {
        ...state,
        order: state.order.filter(orderItem => orderItem.id !== action.payload.id),
    }
  }
  return state
}

export default cartItemsReducer