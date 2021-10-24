
export const crudReducer = (state = [], action) => {

    switch (action.type) {
        case "add":
            return [...state, action.payload];
        case "delete":
            return state.filter( registro => registro.id !== action.payload )         
        case "update": {
            return state.map(el=>
                (el.id === action.payload.id)
                    ? {...el, description: action.payload.description, amount: action.payload.amount}
                    : el
            )
        }
            
        default:
            return state;
    }
}

