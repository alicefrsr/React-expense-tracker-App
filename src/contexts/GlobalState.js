import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// initial state
const initialState = {
  transactions: [
    { id: 1, desc: 'Petrol', amount: -56 },
    { id: 2, desc: 'Salary', amount: 2500 },
    { id: 3, desc: 'Book', amount: -20 },
    { id: 4, desc: 'Camera (sold on ebay)', amount: 550 },
  ],
};

// create context using initial state
export const GlobalContext = createContext(initialState);

// create ContextProvider for all components within it to have access to context / state
export const GlobalProvider = ({ children }) => {
  // bring in state using either useState, or useReducer. Here we want to use reducer
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteTransaction(id) {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  } // add as value to GlobalCOntext Provider - here we pass in the transaction id

  function addTransaction(transaction) {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  } // add as value to GlobalCOntext Provider - here we pass in the entire transaction object

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
