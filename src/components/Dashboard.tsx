import React, { useEffect, useState } from 'react';

import lottery from '../contract/lottery';
import web3 from '../metamask/web3';

import EnterForm from './EnterForm';

const Dashboard: React.FC = () => {
  const [manager, setManager] = useState<string>('Loading...');
  const [players, setPlayers] = useState<string[]>([]);
  const [balance, setBalance] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchContractData = async () => {
      const manager = await lottery.methods.manager().call();
      setManager(manager);

      const players = await lottery.methods.getPlayers().call();
      setPlayers(players);

      const balance = await web3.eth.getBalance(lottery.options.address);
      setBalance(balance.toString());
    };
    fetchContractData();
  }, []);

  const onEnter = async (amount: string) => {
    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transaction success...');

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(amount.toString(), 'ether'),
    });

    setMessage('You have been entered!');
  };

  const onPickWinner = async () => {
    //const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transaction success...');

    await lottery.methods.pickWinner().send({
      from: manager,
    });

    setMessage('A winner has been picked!');
  };

  return (
    <div>
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {manager}. There are currently{' '}
          {players.length} people entered, competing to win{' '}
          {web3.utils.fromWei(balance, 'ether')} ether!
        </p>
        <hr />
        <EnterForm onEnter={onEnter} />
      </div>
      <hr />
      <div>
        <h4>Ready to pick a winner</h4>
        <button onClick={onPickWinner}>Pick a winner!</button>
      </div>
      <hr />
      <div>
        <h1>{message}</h1>
      </div>
    </div>
  );
};

export default Dashboard;
