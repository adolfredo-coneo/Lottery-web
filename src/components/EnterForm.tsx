import React, { useState } from 'react';

interface EnterFormProps {
  onEnter: (amount: string) => void;
}

const EnterForm: React.FC<EnterFormProps> = ({ onEnter }) => {
  const [amount, setAmount] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onEnter(amount);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Want to try your luck?</h4>
      <div className="form-group">
        <label htmlFor="name">Amount of ether to enter: </label>
        <input
          type="text"
          className="form-control"
          id="amount"
          value={amount}
          onChange={handleChange}
          placeholder="0"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Enter
      </button>
    </form>
  );
};

export default EnterForm;
