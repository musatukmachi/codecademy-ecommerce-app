import React, { useState, useEffect } from 'react'
import '../styles/User.css'
import axios from 'axios'

function User() {
    const [loggedIn, setLoggedIn] = useState('false');
    const [user, setUser] = useState(null);

    const getLoggedInData = () => {
        axios.get('/api/auth/check')
        .then(res => setLoggedIn(res.data));
    }

    useEffect(() => {
        console.log(loggedIn);
        getLoggedInData();

        axios.get('/api/auth/user')
        .then(res => setUser(res.data));

        if(user){
            axios({
                method: 'post',
                url: '/api/orders',
                data: {
                    user_id: user
                }
            }).then(res => res.data);
        }
    }, [loggedIn, user]);

    const userLoginStatus = () => {
        if(loggedIn === true) {
            return <a href="/api/auth/logout">Logout</a>;
        } else {
            return <a href="/api/auth/google">Login</a>;
        }
    }

    return (
        <div className="user-container">
            {userLoginStatus()}
        </div>
    )
}

export default User