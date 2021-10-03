
export const crudReducer = (state = [], action) => {

    switch (action.type) {
        case "add":
            return [...state, action.payload];
        case "delete":
            return state.filter( registro => registro.id !== action.payload )           
    
        default:
            return state;
    }


}

