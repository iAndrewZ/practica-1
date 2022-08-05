import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Sidebar.module.scss';

const Sidebar = () => {

    return (
        <div className={classes.sidebar}>
            <div>
                <Link to="/dashboard/profile">Profile</Link>
            </div>
            <div>
                <Link to="/dashboard/categories">Categories</Link>
            </div>
            <div>
                <Link to='/dashboard/products'>Products</Link>
            </div>
        </div>
    )
}

export default Sidebar