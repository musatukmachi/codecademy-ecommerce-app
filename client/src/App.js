import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Checkout from './components/Checkout/Checkout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'

function App() {
  const [loggedIn, setLoggedIn] = useState('false');
  const [user, setUser] = useState();
  const [cartNum, setCartNum] = useState(0);
  const [order, setOrder] = useState();

  useEffect(() => {
    axios.get('/api/auth/check')
    .then(res => setLoggedIn(res.data.result));
    console.log('Logged in? ', loggedIn);

    if(loggedIn){
      axios.get('/api/auth/user')
      .then(res => setUser(res.data.result));
      console.log('google user: ', user);
    }
  }, [loggedIn]);

  const createTempUserOrder =  () => {
    console.log('is the fucntion even runnning');
    var tempUser = parseInt(Date.now());
    console.log('temp user 1:', tempUser);
    setUser(tempUser);
    
    console.log('the response...');
  }

  useEffect(() => {
    console.log('user i just set: ', user);
    if(user){
      console.log('user == tempuser success...');
      console.log('sending users post request');
      axios({
        method: 'post',
        url: '/api/auth/tempuser',
        data: {
          id: user
        }
      })
      .then(res => {
        console.log('sending orders post request');
        axios({
            method: 'post',
            url: '/api/orders',
            data: {
                user_id: user
            }
        });
      })
      .then(res => {
        axios.get(`/api/orders/getorder/${user}`)
        .then(res => res.data)
        .then(data => setOrder(data[0] ? data[0].id : 0));
        console.log('order i just created: ', order );
      });
    }
  }, [user]);

  const userLoginStatus = () => {
    if(loggedIn === true) {
        return <a href="/api/auth/logout">Logout</a>;
    } else {
        return <a href="/api/auth/google">Login</a>;
    }
  }

  const handleCartChange = (value) => {
    setCartNum(value);
  }

  return (
    <div className="App">
      <Router>
        <Header user={user} userStatus={userLoginStatus} createTempUser={createTempUserOrder} order={order} cartNum={cartNum} cartChange={handleCartChange} />
        <div className="main-body-container">
          <Switch>
            <Route exact path="/">
              <Main order={order} cartNum={cartNum} cartChange={handleCartChange} />
            </Route>
            <Route path="/checkout">
              <Checkout cartNum={cartNum} order={order} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
