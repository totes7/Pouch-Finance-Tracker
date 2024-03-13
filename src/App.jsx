import { useState } from 'react';
import './App.css';
import AccountAccess from './components/AccountAccess';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AccountAccess />
    </>
  )
}

export default App
