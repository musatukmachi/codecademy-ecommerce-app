import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Cart(props) {
    const [order, setOrder] = useState()
    
    useEffect(() => {
        axios.get('/api/orders/getorder')
        .then(res => res.data)
        .then(data => setOrder(data[0].id));
    }, []);

    const addToCart = () => {
        axios({
            method: "post",
            url: "/api/cart/additem",
            data: {
                order_id: order,
                product_id: props.id,
                quantity: 1
            }
        });
    }

    const removeToCart = () => {
        
    }

    return (
        <div className="btn-group">
                <button type="button" onClick={addToCart} className="btn btn-sm btn-outline-secondary">Add to Cart</button>
                <button type="button" onClick={removeToCart} className="btn btn-sm btn-outline-secondary">Remove from Cart</button>
        </div>
    )
}

export default Cart
