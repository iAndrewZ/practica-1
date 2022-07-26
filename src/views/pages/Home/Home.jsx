import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <Link to="/login" className='pe-5'>Login</Link>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Home