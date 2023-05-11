import { GlobalContext } from '../contexts/GlobalState';
import { useContext } from 'react';
import { v4 as uuid } from 'uuid';

import { useState } from 'react';

const AddTransactionForm = ({ onAdd }) => {
  // const [desc, setDesc] = useState('');
  // const [amount, setAmount] = useState(0);

  // multiple inputs:
  const [formData, setFormData] = useState({
    desc: '',
    amount: '',
  });

  const { addTransaction } = useContext(GlobalContext);

  const handleChange = e => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData(currFD => {
      return {
        ...currFD,
        [name]: value,
      };
    });
    // console.log(formData);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.desc !== '' && formData.amount !== '') {
      // const newTransaction = { id: uuid(), desc: desc, amount: Number(amount) };
      // const newTransaction = { id: uuid(), desc: desc, amount: parseInt(amount) };
      const newTransaction = { id: uuid(), desc: formData.desc, amount: +formData.amount };
      addTransaction(newTransaction);
    }
  };
  return (
    <>
      <h2>Add new transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='description'>Description</label>
          <input
            id='description'
            type='text'
            name='desc'
            // value={desc}
            // onChange={e => setDesc(e.target.value)}
            onChange={handleChange}
            placeholder='Enter text...'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='amount'>
            Amount <br />
            (negative: expense / positive: income)
          </label>
          <input
            id='amount'
            type='number'
            name='amount'
            // value={amount}
            // onChange={e => setAmount(e.target.value)}
            onChange={handleChange}
            placeholder='Enter amount...'
          />
        </div>
        <button
          className='btn'
          type='submit'>
          Add transaction
        </button>
      </form>
    </>
  );
};

export default AddTransactionForm;
