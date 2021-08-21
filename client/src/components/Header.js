import React, { useState, useEffect, useContext } from 'react'
import '../styles/Header.css'
import User from './User'
import axios from 'axios'
import { CartContext } from '../App'
import { Link } from 'react-router-dom'

function Header() {
    const { cartNum, setCartNum } = useContext(CartContext);

    useEffect(() => {
        const fetchData = async () => {
            axios.get('/api/cart/total')
            .then(res => res.data)
            .then(data => setCartNum(data ? data[0].sum : ''));
            // const total = await response.data;
            // setCartNum(total ? total[0].sum : '');
            // console.log('total: ', total);
            console.log(cartNum);
        }
        fetchData();
    }, []);
    
    return (
        <div className="header-container">
            <User/>
            <h4><Link to="/"><i className="fas fa-store"></i>Store</Link></h4>
            <div><Link to="/checkout"><i className="fas fa-shopping-cart header-icon"></i></Link><span>{cartNum != 0 ? cartNum : ''}</span></div>
        </div>
    )
}

export default Header