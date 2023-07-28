// reducer function: where we specify how state changes in response to certain actions

const AppReducer = (state, action) => {
  switch (action.type) {
    // fetch data from API
    case 'GET_TRANSACTIONS':
      return {
        ...state, // actions already there
        loading: false,
        transactions: action.payload, // action.payload is the res.data.data we get back
      };

    // create new state depending on these actions
    case 'DELETE_TRANSACTION':
      return {
        ...state, // actions already there
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload),
      };

    // (in todoApp we did:
    // const addTodo = newTask => {
    //     const newTodos = [...todos, { id: uuidv4(), task: newTask, isCompleted: false }];
    //     setTodos(newTodos);
    // }; // translates into this HERE, BUT THE REST IS THE SAME AS BEFORE IN ADD TRANSACTION FORM)
    case 'ADD_TRANSACTION':
      return {
        ...state, // actions already there
        // transactions: [action.payload, ...state.transactions], // + new actions in the payload
        transactions: [...state.transactions, action.payload],
      };
    // action.payload IS the transaction object we passed in IN ADD TRANSACTION FORM on handleSubmit
    // {
    //    id: uuid(),
    //    desc: transaction.desc,
    //    amount: transaction.amount,
    // }
    case 'TRANSACTION_ERROR':
      return {
        ...state, // actions already there
        loading: false,
        error: action.payload, // action.payload is the err.response.data.error we get back
      };
    default:
      return state;
  }
};

export default AppReducer;
