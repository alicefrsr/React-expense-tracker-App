import { useContext, useEffect } from 'react';
import Transaction from './Transaction';
import { GlobalContext } from '../context/GlobalState';

const TransactionList = () => {
  // const context = useContext(GlobalContext);
  // console.log(context); // {transactions: [...}]}
  // context.transactions = useContext(GlobalContext);;
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>History</h2>
      <h3>(Total: {transactions.length} transactions)</h3>
      <ul className='list'>
        {transactions.map(transaction => (
          <Transaction
            key={transaction._id}
            transaction={transaction}
          />
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
