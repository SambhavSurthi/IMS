import './DisplayItems.css';
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import Item from "../Item/Item.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";

const DisplayItems = ({selectedCategory}) => {
    const {itemsData} = useContext(AppContext);
    const [searchText, setSearchText] = useState("");

    const filteredItems = itemsData.filter(item => {
        // First filter by category
        const categoryMatch = !selectedCategory || item.categoryId === selectedCategory;
        
        // Then filter by search text
        const searchMatch = item.name.toLowerCase().includes(searchText.toLowerCase());
        
        // Only show items with stock > 0
        const hasStock = item.stock > 0;
        
        return categoryMatch && searchMatch && hasStock;
    });

    return (
        <div className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div></div>
                <div>
                    <SearchBox onSearch={setSearchText} />
                </div>
            </div>
            <div className="row g-3">
                {filteredItems.map((item) => (
                    <div key={item.itemId} className="col-md-4 col-sm-6">
                        <Item
                            itemName={item.name}
                            itemPrice={item.price}
                            itemImage={item.imgUrl}
                            itemId={item.itemId}
                            stock={item.stock}
                            categoryId={item.categoryId}
                        />
                    </div>
                ))}
            </div>
            {filteredItems.length === 0 && (
                <div className="no-items-message">
                    <p>No items found in this category</p>
                </div>
            )}
        </div>
    )
}

export default DisplayItems;