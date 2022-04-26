import React, { createContext, useReducer } from "react"


// 1.create context
export const StoreContext = createContext()

//1. create action types
export const ACTION_TYPES = {
    SET_LAT_LONG: "SET_LAT_LONG",
    SET_COFFEE_STORES: "SET_COFFEE_STORES"
}
// 3.create reducer
const storeReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_LAT_LONG: {
            return { ...state, latLong: action.payload.latLong }

        }
        case ACTION_TYPES.SET_COFFEE_STORES: {
            return { ...state, coffeeStores: action.payload.coffeeStores }
        }
        default:
            throw new Error("Unhandled action type")
    }
}

//4. create provider
const StoreProvider = ({ children }) => {
    const initialState = {
        latLong: "",
        coffeeStores: []
    }
    const [state, dispatch] = useReducer(storeReducer, initialState)

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider
