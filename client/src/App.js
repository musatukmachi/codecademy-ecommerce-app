import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import { BrowserRouter as Router } from 'react-router-dom'

export const CartContext = React.createContext(
  {
    change: 0,
    setChange: () => {}
  }
);

function App() {
  const [change, setChange] = useState();
  const value = { change, setChange };

  return (
    <div className="App">
      <Router>
        <CartContext.Provider value={value}>
          <Header />
          <div className="main-body-container">
            <Main />
          </div>
        </CartContext.Provider>
      </Router>
    </div>
  );
}

export default App;
