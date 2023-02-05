import React from "react";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import axios from "axios";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";


function App() {



    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {

            const cartResponse = await axios.get('http://localhost:3001/cart')
            const favoritesResponse = await axios.get('http://localhost:3001/favorites')
            const itemsResponse = await axios.get('http://localhost:3001/items')

            setIsLoading(false);

            setItems(itemsResponse.data);
            setCartItems(cartResponse.data);
            setFavorites(favoritesResponse.data);
        }

        fetchData()
    }, []);
    const onAddToCart = (obj) => {
        if (cartItems.find((item) => item.id === obj.id)) {
            axios.delete(`http://localhost:3001/cart/${obj.id}`);
            setCartItems(prev => prev.filter(item => item.id !== obj.id))
        } else {
            axios.post(' http://localhost:3001/cart', obj)
            setCartItems((prev) => [...prev, obj])
        }

    };
    const onRemoveItem = (id) => {
        axios.delete(`http://localhost:3001/cart/${id}`);
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };


    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => favObj.id === obj.id)) {
                await axios.delete(`http://localhost:3001/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter((item) => (item.id) !== (obj.id)));
            } else {
                const {data} = await axios.post('http://localhost:3001/favorites', obj);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('Помилка');
        }
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

    const isItemAdded = (id) => {
        return cartItems.some((obj) => (obj.id) === (id));
    };

    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                favorites,
                isItemAdded,
                onAddToFavorite,
                onAddToCart,
                setCartOpened,
                setCartItems,
            }}>
            <div className="wrapper clear">
                {cartOpened && (
                    <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
                )}

                <Header onClickCart={() => setCartOpened(true)}/>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                items={items}
                                cartItems={cartItems}
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                onChangeSearchInput={onChangeSearchInput}
                                onAddToFavorite={onAddToFavorite}
                                onAddToCart={onAddToCart}
                                isLoading={isLoading}
                            />
                        }
                    ></Route>
                    <Route path="/favorites" element={<Favorites/>}></Route>
                    <Route path="/orders" element={<Orders/>}></Route>
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
