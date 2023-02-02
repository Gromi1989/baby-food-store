import React from 'react';
import Info from "./Info";
import axios from "axios";
import AppContext from "../context";


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function Drawer({onClose, onRemove, items = [], opened}) {
    const { cartItems, setCartItems } = React.useContext(AppContext);
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)


    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('http://localhost:3001/orders', {
                items: cartItems,
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('http://localhost:3001/cart' + item.id);
                await delay(1000);
            }
        } catch (error) {
            alert('Ошибка при создании заказа :(');
        }
        setIsLoading(false);
    };
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">
                    Корзина <img onClick={onClose} className="cu-p" src="/img/remove.svg" alt="Close"/>
                </h2>

                {items.length > 0 ? (
                    <div className="d-flex flex-column flex">
                        <div className="items">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div
                                        style={{backgroundImage: `url(${obj.imageUrl})`}}
                                        className="cartItemImg"></div>

                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} грн.</b>

                                    </div>
                                    <img onClick={() => onRemove(obj.id)}
                                         className="removeBtn"
                                         src="/img/remove.svg"
                                         alt="Remove"/>
                                </div>
                            ))}</div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Всього:</span>
                                    <div></div>
                                    <b>{totalPrice} грн. </b>
                                </li>
                                <li>
                                    <span>Податок 5%:</span>
                                    <div></div>
                                    <b>{totalPrice / 100 * 5} грн. </b>

                                </li>

                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                                Оформити замовлення <img src="/img/arrow.svg" alt="Arrow"/>
                            </button>
                        </div>
                    </div>
                ) : (
                    <Info
                        title={isOrderComplete ? 'Замовлення оформлено' : 'Кошик пустий'}
                        description={isOrderComplete ? 'Ваше замовлення оформлене і скоро буде передане до курерської служби' : 'Додайте хочя б один товар для замовлення'}
                        image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}/>
                )}
            </div>
        </div>
    );
}

export default Drawer;
;