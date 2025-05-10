import './DisplayCategory.css';
import Category from "../Category/Category.jsx";
import {assets} from "../../assets/assets.js";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";

const DisplayCategory = ({selectedCategory, setSelectedCategory}) => {
    const {categories, itemsData} = useContext(AppContext);

    // Calculate total items for "All Items" category
    const totalItems = itemsData.filter(item => item.stock > 0).length;

    // Calculate items per category
    const getCategoryItemCount = (categoryId) => {
        return itemsData.filter(item => 
            item.categoryId === categoryId && item.stock > 0
        ).length;
    };

    return (
        <div className="row g-3" style={{width: '100%', margin: 0}}>
            <div key="all" className="col-md-3 col-sm-6" style={{padding: '0 10px'}}>
                <Category
                    categoryName="All Items"
                    imgUrl={assets.device}
                    numberOfItems={totalItems}
                    bgColor="#6c757d"
                    isSelected={selectedCategory === ""}
                    onClick={() => setSelectedCategory("")}
                />
            </div>
            {categories.map(category => (
                <div key={category.categoryId} className="col-md-3 col-sm-6" style={{padding: '0 10px'}}>
                    <Category
                        categoryName={category.name}
                        imgUrl={category.imgUrl}
                        numberOfItems={getCategoryItemCount(category.categoryId)}
                        bgColor={category.bgColor}
                        isSelected={selectedCategory === category.categoryId}
                        onClick={() => setSelectedCategory(category.categoryId)}
                    />
                </div>
            ))}
        </div>
    )
}

export default DisplayCategory;