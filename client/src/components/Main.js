import React, { useState, useEffect } from 'react'
import '../styles/Main.css'
import Product from './Product'
import axios from 'axios'
import Spinner from 'react-spinner-material'

function Main() {
    const [data, setData] = useState(null);
    const [order, setOrder] = useState();

    useEffect(() => {
        axios.get('/api/products')
        .then(res => res.data)
        .then((data) => setData(data));

        axios.get('/api/orders/getorder')
        .then(res => res.data)
        .then(data => setOrder(data[0].id));
    }, []);
    
    const productsArray = () => {
        if (!data) {
            return <div style={{marginLeft: '47%'}}><Spinner /></div>;
        }
        return data.map(
            (item, index) => <Product key={index} product_id={item.id} order_id={order} url={item.url} name={item.name} description={item.description} price={item.price} />
        );
    }

    return (
        <main>
        <section className="py-5 text-center container">
        <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">E-Commerce App</h1>
            <p className="lead text-muted">This project is part of the codecademy course: Full-Stack Engineer. The PERN Stack + Bootstrap was used to build this application. </p>
            <p>
                {/* <a href="#" className="btn btn-primary my-2">Main call to action</a>
                <a href="#" className="btn btn-secondary my-2">Secondary action</a> */}
            </p>
            </div>
        </div>
        </section>

        <div className="album py-5 bg-light">
        <div className="container">

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {productsArray()}
            </div>
        </div>
        </div>
        </main>
    )
}

export default Main