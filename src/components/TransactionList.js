import { GlobalContext } from '../contexts/GlobalState';
import { useContext } from 'react';
import Transaction from './Transaction';

const TransactionList = () => {
  // const context = useContext(GlobalContext);
  // console.log(context); // {transactions: [...}]}
  // context.transactions = useContext(GlobalContext);;
  const { transactions } = useContext(GlobalContext);

  return (
    <>
      <h2>History</h2>
      <ul className='list'>
        {transactions.map(transaction => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
