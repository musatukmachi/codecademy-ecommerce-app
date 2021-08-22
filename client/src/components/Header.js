import React, { useEffect } from 'react'
import '../styles/Header.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Header(props) {
    useEffect(() => {
        if(props.order){
            axios.get(`/api/cart/total/${props.order}`)
            .then(res => res.data)
            .then(data => props.cartChange(data ? data[0].sum : ''));
        }
        console.log('cart number inside: ', props.cartNum);
        console.log('props.order: ', props.order);
    }, [props.cartNum]);

    console.log('cart number outside: ', props.cartNum);

    const tempUserStatus = () => {
        if(props.user){
            return (
                <span style={{
                    paddingLeft: '1rem',
                    marginLeft: '1rem',
                    borderLeft: 'whitesmoke 2px solid'
                    }}>
                    ID: {props.user}
                </span>
            );
        } else {
            return <button onClick={props.createTempUser}>Create User</button>;
        }
    }

    return (
        <div className="header-container">
            <div><i className="fab fa-google"></i>{props.userStatus()}{tempUserStatus()}</div>
            <h4><Link to="/"><i className="fas fa-store"></i>Store</Link></h4>
            <div><Link to="/checkout"><i className="fas fa-shopping-cart header-icon"></i></Link><span>{props.cartNum ? props.cartNum : ''}</span></div>
        </div>
    )
}

export default Header