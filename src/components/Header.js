import React from 'react';
import {Link} from "react-router-dom";
import AppContext from "../context";

const Header = (props) => {
    const {cartItems} = React.useContext(AppContext)
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)
    return (
        <header className='d-flex justify-between align-center p-40'>
            <Link to='/'>
                <div className='d-flex align-center'>
                    <img width={40} height={40} src="/img/logo.png" alt='Logo'/>
                    <div>
                        <h3 className='text-uppercase'>KIDS MENU</h3>
                        <p>Магазин дитячого харчування</p>
                    </div>
                </div>
            </Link>
            <ul className='d-flex'>
                <li onClick={props.onClickCart} className='mr-30 cu-p'>
                    <img width={30} height={30} src="/img/cart.png" alt='Cart'/>
                    <span>{totalPrice} грн.</span>
                </li>
                <li>
                    <Link to='/favorites'>
                        <img width={30} height={30} src="/img/favorite.svg" alt='Favorite'/>
                    </Link>

                </li>
                <li>
                    <Link to='/orders'>
                    <img width={30} height={30} src="/img/user.png" alt='User'/>
                    </Link>
                </li>
            </ul>

        </header>
    );
};

export default Header;