import React from 'react'

function CartItem(props) {
    return (
        <li className="list-group-item d-flex justify-content-between lh-sm">
            
            <div>
            <h6 className="my-0">{props.name}</h6>
            <small className="text-muted">{props.description}</small>
            <hr />
            <div>{props.price ? '£' + props.price * props.quantity : 'Free'}</div>
            </div>
            <div style={{float: 'right'}}>{props.quantity}</div>
            
        </li>
    )
}

export default CartItem
