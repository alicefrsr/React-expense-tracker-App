import { GlobalContext } from '../context/GlobalState';
import { useContext } from 'react';

const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((total, amount) => total + amount, 0).toFixed(2);

  return (
    <>
      <h2>Your Balance</h2>
      <p className='balance'>€ {total}</p>
    </>
  );
};

export default Balance;
