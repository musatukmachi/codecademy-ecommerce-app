import React from 'react'
import '../styles/Product.css'
import Cart from './Cart'

function Product(props) {

    const determinePriceTag = () => {
        if(props.price === 0) {
            return 'Free';
        }
        else if (props.price === -1) {
            return 'Out of Stock';
        }

        else {
            return '£' + props.price;
        }
    }    
    console.log('product component order id: ', props.order_id);
    console.log('product component product id: ', props.product_id);
    return (
        <div className="col">
            <div className="card h-100 shadow-sm">
            <img alt="product" src={props.url} style={{width: "100%"}} />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.description}</p>
                <div className="d-flex justify-content-between align-items-center bottom-container">
                <Cart order_id={props.order_id} product_id={props.product_id} />
                <small className="text">{determinePriceTag()}</small>
                </div>
            </div>
            </div>
        </div>  
    )
}

export default Product
