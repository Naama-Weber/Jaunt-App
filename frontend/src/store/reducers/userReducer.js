let localLoggedinUser = null
if (sessionStorage.loggedinUser) localLoggedinUser = JSON.parse(sessionStorage.loggedinUser)

const initialState = {
  loggedInUser: localLoggedinUser,
  loginErr: null,
  orders: []
}

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.order] }
    case 'CANCEL_ORDER':
      return { ...state, orders: state.orders.filter(order => order._id !== action.orderId) }
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order._id === action.order._id ? action.order : order
        )
      }
    case 'SET_USER':
      return { ...state, loggedInUser: action.user }
    case 'ADD_USER':
      return { ...state, user: action.user }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId)

      }

    default:
      return state
  }
}
