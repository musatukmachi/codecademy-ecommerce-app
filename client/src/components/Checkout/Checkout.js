import React, { useState, useContext, useEffect } from 'react'
import '../../styles/Checkout.css'
import { CartContext } from '../../App'
import Spinner from 'react-spinner-material'
import CartItem from './CartItem'
import axios from 'axios'

function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const { cartNum } = useContext(CartContext);

    useEffect(() => {
        axios.get('/api/cart/products')
        .then(res => res.data)
        .then(data => data.map(item => [ item.product_id, item.quantity ]))
        .then(detailsArray => {
            detailsArray.forEach(details => {
                axios.get(`/api/products/${details[0]}`)
                .then(res => res.data)
                .then(data => data ? setCartItems(arr => [ ...arr, {...data[0], quantity: details[1] } ]) : null);
            });
        });
    }, []);
    console.log('Cart items: ', cartItems);
    const productItemsArray = () => {
        if(cartItems.length === 0) return <div><Spinner /></div>;
        // else if (cartItems.reduce((acc, cur) => acc + cur.quantity) !== cartNum) return <div><Spinner /></div>;
        return cartItems.map(
            (item, index) => <CartItem key={index} url={item.url} name={item.name} description={item.description} price={item.price} quantity={item.quantity} />
        );
    }

    return (
        <div>
            <div className="container">
            <main>
                <div className="py-5 text-center">
                <h2>Checkout</h2>
                </div>

                <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-primary">Your cart</span>
                    <span className="badge bg-primary rounded-pill">{cartNum}</span>
                    </h4>
                    <ul className="list-group mb-3">
                        {productItemsArray()}
                    </ul>

                    <form className="card p-2">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Promo code" />
                        <button type="submit" className="btn btn-secondary">Redeem</button>
                    </div>
                    </form>
                </div>
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">Billing address</h4>
                    <form className="needs-validation" novalidate>
                    <div className="row g-3">
                        <div className="col-sm-6">
                        <label for="firstName" className="form-label">First name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
                        <div className="invalid-feedback">
                            Valid first name is required.
                        </div>
                        </div>

                        <div className="col-sm-6">
                        <label for="lastName" className="form-label">Last name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                        <div className="invalid-feedback">
                            Valid last name is required.
                        </div>
                        </div>

                        <div className="col-12">
                        <label for="username" className="form-label">Username</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text">@</span>
                            <input type="text" className="form-control" id="username" placeholder="Username" required />
                        <div className="invalid-feedback">
                            Your username is required.
                            </div>
                        </div>
                        </div>

                        <div className="col-12">
                        <label for="email" className="form-label">Email <span className="text-muted">(Optional)</span></label>
                        <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                        <div className="invalid-feedback">
                            Please enter a valid email address for shipping updates.
                        </div>
                        </div>

                        <div className="col-12">
                        <label for="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                        <div className="invalid-feedback">
                            Please enter your shipping address.
                        </div>
                        </div>

                        <div className="col-12">
                        <label for="address2" className="form-label">Address 2 <span className="text-muted">(Optional)</span></label>
                        <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
                        </div>

                        <div className="col-md-5">
                        <label for="country" className="form-label">Country</label>
                        <select className="form-select" id="country" required>
                            <option value="">Choose...</option>
                            <option>United States</option>
                        </select>
                        <div className="invalid-feedback">
                            Please select a valid country.
                        </div>
                        </div>

                        <div className="col-md-4">
                        <label for="state" className="form-label">State</label>
                        <select className="form-select" id="state" required>
                            <option value="">Choose...</option>
                            <option>California</option>
                        </select>
                        <div className="invalid-feedback">
                            Please provide a valid state.
                        </div>
                        </div>

                        <div className="col-md-3">
                        <label for="zip" className="form-label">Zip</label>
                        <input type="text" className="form-control" id="zip" placeholder="" required />
                        <div className="invalid-feedback">
                            Zip code required.
                        </div>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="same-address" />
                        <label className="form-check-label" for="same-address">Shipping address is the same as my billing address</label>
                    </div>

                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="save-info" />
                        <label className="form-check-label" for="save-info">Save this information for next time</label>
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3">Payment</h4>

                    <div className="my-3">
                        <div className="form-check">
                        <input id="credit" name="paymentMethod" type="radio" className="form-check-input" checked required />
                        <label className="form-check-label" for="credit">Credit card</label>
                        </div>
                        <div className="form-check">
                        <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required />
                        <label className="form-check-label" for="debit">Debit card</label>
                        </div>
                        <div className="form-check">
                        <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required />
                        <label className="form-check-label" for="paypal">PayPal</label>
                        </div>
                    </div>

                    <div className="row gy-3">
                        <div className="col-md-6">
                        <label for="cc-name" className="form-label">Name on card</label>
                        <input type="text" className="form-control" id="cc-name" placeholder="" required />
                        <small className="text-muted">Full name as displayed on card</small>
                        <div className="invalid-feedback">
                            Name on card is required
                        </div>
                        </div>

                        <div className="col-md-6">
                        <label for="cc-number" className="form-label">Credit card number</label>
                        <input type="text" className="form-control" id="cc-number" placeholder="" required />
                        <div className="invalid-feedback">
                            Credit card number is required
                        </div>
                        </div>

                        <div className="col-md-3">
                        <label for="cc-expiration" className="form-label">Expiration</label>
                        <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
                        <div className="invalid-feedback">
                            Expiration date required
                        </div>
                        </div>

                        <div className="col-md-3">
                        <label for="cc-cvv" className="form-label">CVV</label>
                        <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
                        <div className="invalid-feedback">
                            Security code required
                        </div>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                    </form>
                </div>
                </div>
            </main>
            <br />
            </div>
        </div>
    )
}

export default Checkout
