import React, { useEffect, useState } from 'react';
import './App.css';
//import web3 from './web3';
import lottery from './lottery';

function App() {
  const [manager, setManager] = useState<string>('Loading...');
  //web3.eth.getAccounts().then(console.log);

  useEffect(() => {
    const fetchManager = async () => {
      const manager = await lottery.methods.manager().call();
      setManager(manager);
    };
    fetchManager();
  }, []);

  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
    </div>
  );
}

export default App;
