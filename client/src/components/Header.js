import React, { useState } from 'react'
import '../styles/Header.css'
import User from './User'

function Header() {
    const [cartNum, setCartNum] = useState();

    return (
        <div className="header-container">
            <User/>
            <h4><i className="fas fa-store"></i>Store</h4>
            <div><i className="fas fa-shopping-cart header-icon"></i><i></i></div>
        </div>
    )
}

export default Header
