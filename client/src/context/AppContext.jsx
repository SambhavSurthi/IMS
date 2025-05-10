import {createContext, useEffect, useState} from "react";
import {fetchCategories} from "../Service/CategoryService.js";
import {fetchItems} from "../Service/ItemService.js";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);
    const [itemsData, setItemsData] = useState([]);
    const [auth, setAuth] = useState({token: null, role: null});
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.itemId === item.itemId);
            
            if (existingItem) {
                // If item exists, check if we can add more
                if (existingItem.quantity >= item.stock) {
                    return prevItems; // Don't add if we've reached stock limit
                }
                return prevItems.map(cartItem =>
                    cartItem.itemId === item.itemId
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            
            // If item doesn't exist in cart, add it with quantity 1
            return [...prevItems, { ...item, quantity: 1 }];
        });
    }

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.itemId !== itemId));
    }

    const updateQuantity = (itemId, newQuantity) => {
        setCartItems(cartItems.map(item => item.itemId === itemId ? {...item, quantity: newQuantity} : item));
    }

    const updateStock = (itemId, newStock) => {
        setItemsData(prevItems => 
            prevItems.map(item => 
                item.itemId === itemId 
                    ? { ...item, stock: newStock }
                    : item
            )
        );
    };

    useEffect(() => {
        async function loadData() {
            if (localStorage.getItem("token") && localStorage.getItem("role")) {
                setAuthData(
                    localStorage.getItem("token"),
                    localStorage.getItem("role")
                );
            }
            const response = await fetchCategories();
            const itemResponse = await fetchItems();
            console.log('item response', itemResponse);
            setCategories(response.data);
            setItemsData(itemResponse.data);

        }
        loadData();
    }, []);

    const setAuthData = (token, role) => {
        setAuth({token, role});
    }

    const clearCart = () => {
        setCartItems([]);
    }

    const contextValue = {
        categories,
        setCategories,
        auth,
        setAuthData,
        itemsData,
        setItemsData,
        addToCart,
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart,
        updateStock
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}