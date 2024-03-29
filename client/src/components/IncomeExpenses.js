import { GlobalContext } from '../context/GlobalState';
import { useContext } from 'react';

const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  console.log(transactions);

  const amounts = transactions.map(t => t.amount);

  // make an array of all the expensesfilter only neg values, add them up
  const totalExp = amounts
    .filter(exp => exp < 0)
    .reduce((total, amount) => total + amount, 0)
    .toFixed(2);

  // smae with income
  const totalInc = amounts
    .filter(exp => exp > 0)
    .reduce((total, amount) => total + amount, 0)
    .toFixed(2);

  return (
    <div className='inc-exp-container'>
      <div>
        <h3>Income</h3>
        <p className='money plus'>€ {totalInc}</p>
      </div>
      <div>
        <h3>Expenses</h3>
        <p className='money minus'>€ {totalExp}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
