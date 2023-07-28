import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

// create context using initial state
export const GlobalContext = createContext(initialState);

// create a provider component / ContextProvider for all components within it to have access to context / state
export const GlobalProvider = ({ children }) => {
  // bring in state using either useState, or useReducer. Here we want to use reducer
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  // fetching data from our backend
  async function getTransactions() {
    try {
      const res = await axios.get('/api/v1/transactions'); // using proxy set to http://localhost:5000
      // transactions are in res.data.data;
      dispatch({ type: 'GET_TRANSACTIONS', payload: res.data.data });
    } catch (err) {
      // console.log('Problemo with getTransaction():', err);
      dispatch({ type: 'TRANSACTION_ERROR', payload: err.response.data.error });
    }
  }

  // deleting data from our backend
  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (err) {
      // console.log('Problemo with deleteTransaction():', err);
      dispatch({ type: 'TRANSACTION_ERROR', payload: err.response.data.error });
    }
  } // add as value to GlobalContext Provider - here we pass in the transaction id

  // adding data to our backend
  async function addTransaction(transaction) {
    // with POST req we need a content-type. Axios headers object:
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(`/api/v1/transactions`, transaction, config);
      dispatch({ type: 'ADD_TRANSACTION', payload: res.data.data });
    } catch (err) {
      // console.log('Problemo with addTransaction():', err);
      dispatch({ type: 'TRANSACTION_ERROR', payload: err.response.data.error });
    }
  } // add as value to GlobalContext Provider - here we pass in the entire transaction object

  return (
    <GlobalContext.Provider
      value={{
        // all accessible from everywhere
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions, // we need to call it (component TransactionList)(async - in useEffect hook)
        deleteTransaction,
        addTransaction,
      }}>
      {children}
    </GlobalContext.Provider> // children = all our components
  );
};
