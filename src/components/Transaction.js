import { GlobalContext } from '../contexts/GlobalState';
import { useContext } from 'react';

const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.desc}
      <span>
        {sign} €{Math.abs(transaction.amount)}
      </span>
      <button
        className='delete-btn'
        onClick={() => deleteTransaction(transaction.id)}>
        x
      </button>
    </li>
  );
};

export default Transaction;
