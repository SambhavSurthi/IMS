import './Item.css';
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import toast from 'react-hot-toast';

const Item = ({itemName, itemPrice, itemImage, itemId, stock}) => {
    const {addToCart, cartItems} = useContext(AppContext);

    const handleAddToCart = () => {
        // Find the item in cartItems to check current quantity
        const existingCartItem = cartItems.find(cartItem => cartItem.itemId === itemId);
        
        // If item is already in cart
        if (existingCartItem) {
            // Check if adding one more would exceed stock
            if (existingCartItem.quantity >= stock) {
                toast.error('Cannot add more items. Stock limit reached!');
                return;
            }
            toast.success('Added to cart!');
        } else {
            // If item is not in cart, check if stock is 1
            if (stock === 1) {
                toast.success('Added to cart! This is the last item in stock.');
            } else {
                toast.success('Added to cart!');
            }
        }
        
        addToCart({
            name: itemName,
            price: itemPrice,
            quantity: 1,
            itemId: itemId,
            stock: stock
        });
    }

    return (
        <div className="p-3 bg-dark rounded shadow-sm h-100 d-flex align-items-center item-card">
            <div style={{position: "relative", marginRight: "15px"}}>
                <img src={itemImage} alt={itemName} className="item-image" />
                {stock === 1 && (
                    <span className="last-item-badge">Last Item</span>
                )}
                {stock === 0 && (
                    <span className="out-of-stock-badge">Out of Stock</span>
                )}
            </div>

            <div className="flex-grow-1 ms-2">
                <h6 className="mb-1 text-light">{itemName}</h6>
                <p className="mb-0 fw-bold text-light">₹{itemPrice.toFixed(2)}</p>
                <small className="text-muted">Stock: {stock}</small>
            </div>

            <div className="d-flex flex-column justify-content-between align-items-center ms-3"
                style={{height: "100%"}}>
                <i className="bi bi-cart-plus fs-4 text-warning"></i>
                <button 
                    className="btn btn-success btn-sm" 
                    onClick={handleAddToCart}
                    disabled={stock === 0}
                >
                    <i className="bi bi-plus"></i>
                </button>
            </div>
        </div>
    )
}

export default Item;