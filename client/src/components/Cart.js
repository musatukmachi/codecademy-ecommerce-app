import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { CartContext } from '../App'

function Cart(props) {
    const [quantity, setQuantity] = useState();
    const { cartNum, setCartNum } = useContext(CartContext);
    
    useEffect(() => {
        if(props.order_id && props.product_id){
            axios.get(`/api/cart/quantity/${props.order_id}/${props.product_id}`)
            .then(res => res.data)
            .then(data => setQuantity(data[0] ? data[0].quantity : 0));
        }
    }, [props.order_id, props.product_id, quantity]);

    const addToCart = () => {
        if(props.price === -1) return;
        axios({
            method: "post",
            url: "/api/cart/change",
            data: {
                order_id: props.order_id,
                product_id: props.product_id,
                quantity: quantity + 1
            }
        });
        setQuantity(quantity+1);
        setCartNum(parseInt(cartNum)+1);
    }

    const removeToCart = () => {
        if(quantity > 0){
            axios({
                method: "post",
                url: "/api/cart/change",
                data: {
                    order_id: props.order_id,
                    product_id: props.product_id,
                    quantity: quantity - 1
                }
            });
            setQuantity(quantity-1);
            setCartNum(cartNum-1);
        }
    }
    
    return (
        <div className="btn-group">
                <button type="button" onClick={addToCart} className="btn btn-sm btn-outline-secondary">Add to Cart</button>
                <button type="button" onClick={removeToCart} className="btn btn-sm btn-outline-secondary">Remove from Cart</button>
        </div>
    )
}

export default Cart