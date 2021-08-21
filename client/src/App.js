import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Checkout from './components/Checkout/Checkout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export const CartContext = React.createContext(
  {
    cartNum: 0,
    setCartNum: () => {}
  }
);

function App() {
  const [cartNum, setCartNum] = useState();
  const value = { cartNum, setCartNum };

  return (
    <div className="App">
      <Router>
        <CartContext.Provider value={value}>
          <Header />
          <div className="main-body-container">
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <Route path="/checkout">
                <Checkout />
              </Route>
            </Switch>
          </div>
        </CartContext.Provider>
      </Router>
    </div>
  );
}

export default App;
