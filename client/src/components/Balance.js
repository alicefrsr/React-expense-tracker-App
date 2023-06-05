import { GlobalContext } from '../context/GlobalState';
import { useContext } from 'react';

const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  // make an array of all the amounts
  const amounts = transactions.map(t => t.amount);
  // add them up, get 2 decimal places
  const total = amounts.reduce((total, amount) => total + amount, 0).toFixed(2);

  return (
    <>
      <h2>Your Balance</h2>
      <p className='balance'>€ {total}</p>
    </>
  );
};

export default Balance;
