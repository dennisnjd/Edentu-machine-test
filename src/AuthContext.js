import { createContext, useContext, useReducer } from 'react';

// Create a context
export const AuthContext = createContext();

// Define a reducer function to handle token-related actions
const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        default:
            return state;
    }
};

// Initial state
const initialState = {
    token: null,
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Define action to set the token
    const setToken = (token) => {
        dispatch({ type: 'SET_TOKEN', payload: token });
    };

    return (
        <AuthContext.Provider value={{ state, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
