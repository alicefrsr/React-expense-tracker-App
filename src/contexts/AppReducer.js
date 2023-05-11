// reducer function:
// where we specify how state changes in response to certain actions

export default (state, action) => {
  switch (action.type) {
    // create new state depending on these actions
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload),
      };
    // before we did:
    // const addTodo = newTask => {
    //     const newTodos = [...todos, { id: uuidv4(), task: newTask, isCompleted: false }];
    //     setTodos(newTodos);
    // }; // translates into this HERE, BUT THE REST HAPPENS LIKE BEFORE IN ADD TRANSACTION FORM
    case 'ADD_TRANSACTION':
      return {
        ...state, // actions already there
        transactions: [action.payload, ...state.transactions], // + new actions in the payload
      };
    // action.payload IS the transaction object we passed in IN ADD TRANSACTION FORM on handleSubmit
    // {
    //    id: uuid(),
    //    desc: transaction.desc,
    //    amount: transaction.amount,
    // }
    default:
      return state;
  }
};
