import React, { useState, useEffect, useContext } from 'react'
import '../styles/Header.css'
import User from './User'
// import axios from 'axios'
import { CartContext } from '../App'

function Header() {
    const [cartNum, setCartNum] = useState();
    const { change } = useContext(CartContext);

    useEffect(async () => {
        const response = await fetch('/api/cart/total');
        // .then(res => res.data)
        // .then(data => setCartNum(data ? data[0].sum : ''));
        const total = await response.data;
        await setCartNum(total ? total[0].sum : '');
    }, [change]);
    
    return (
        <div className="header-container">
            <User/>
            <h4><i className="fas fa-store"></i>Store</h4>
            <div><i className="fas fa-shopping-cart header-icon"></i><span>{cartNum != 0 ? cartNum : ''}</span></div>
        </div>
    )
}

export default Header