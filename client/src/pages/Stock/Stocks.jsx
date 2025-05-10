import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import './Stocks.css';

const Stocks = () => {
    const { itemsData } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('ALL');
    const [stockFilter, setStockFilter] = useState('ALL');
    const [sortOrder, setSortOrder] = useState('NONE');

    useEffect(() => {
        // Set loading to false once itemsData is available
        if (itemsData) {
            setLoading(false);
        }
    }, [itemsData]);

    // Get unique categories for filter
    const categories = itemsData ? ['ALL', ...new Set(itemsData.map(item => item.categoryName))] : ['ALL'];

    // Filter and sort items
    const filteredItems = itemsData ? itemsData
        .filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'ALL' || item.categoryName === categoryFilter;
            const matchesStock = stockFilter === 'ALL' || 
                (stockFilter === 'LOW' && item.stock < 10) ||
                (stockFilter === 'OUT' && item.stock === 0) ||
                (stockFilter === 'AVAILABLE' && item.stock > 0);

            return matchesSearch && matchesCategory && matchesStock;
        })
        .sort((a, b) => {
            if (sortOrder === 'NAME_ASC') {
                return a.name.localeCompare(b.name);
            } else if (sortOrder === 'NAME_DESC') {
                return b.name.localeCompare(a.name);
            } else if (sortOrder === 'STOCK_ASC') {
                return a.stock - b.stock;
            } else if (sortOrder === 'STOCK_DESC') {
                return b.stock - a.stock;
            }
            return 0;
        }) : [];

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading items...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                </div>
            </div>
        );
    }

    if (!itemsData || itemsData.length === 0) {
        return (
            <div className="no-items-container">
                <div className="alert alert-info" role="alert">
                    <i className="bi bi-info-circle-fill me-2"></i>
                    No items found. Please add some items to your inventory.
                </div>
            </div>
        );
    }

    return (
        <div className="stocks-container">
            <h2 className="mb-4 text-light">Stock Management</h2>

            {/* Filters Section */}
            <div className="filters-section mb-4">
                <div className="row g-3">
                    {/* Search Box */}
                    <div className="col-md-3">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search items..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span className="input-group-text">
                                <i className="bi bi-search"></i>
                            </span>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="col-md-2">
                        <select 
                            className="form-select"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Stock Status Filter */}
                    <div className="col-md-2">
                        <select 
                            className="form-select"
                            value={stockFilter}
                            onChange={(e) => setStockFilter(e.target.value)}
                        >
                            <option value="ALL">All Stock</option>
                            <option value="LOW">Low Stock</option>
                            <option value="OUT">Out of Stock</option>
                            <option value="AVAILABLE">In Stock</option>
                        </select>
                    </div>

                    {/* Sort Order */}
                    <div className="col-md-2">
                        <select 
                            className="form-select"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="NONE">Sort by</option>
                            <option value="NAME_ASC">Name (A-Z)</option>
                            <option value="NAME_DESC">Name (Z-A)</option>
                            <option value="STOCK_ASC">Stock (Low-High)</option>
                            <option value="STOCK_DESC">Stock (High-Low)</option>
                        </select>
                    </div>

                    {/* Clear Filters Button */}
                    <div className="col-md-1">
                        <button 
                            className="btn btn-secondary w-100"
                            onClick={() => {
                                setSearchTerm('');
                                setCategoryFilter('ALL');
                                setStockFilter('ALL');
                                setSortOrder('NONE');
                            }}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Items Grid */}
            <div className="row g-4">
                {filteredItems.map((item) => (
                    <div className="col-md-6 col-lg-4" key={item.itemId}>
                        <div className={`stock-card ${item.stock < 10 ? 'low-stock' : ''} ${item.stock === 0 ? 'out-of-stock' : ''}`}>
                            <div className="stock-card-image">
                                <img src={item.imgUrl} alt={item.name} />
                                {item.stock < 10 && item.stock > 0 && (
                                    <div className="low-stock-badge">Low Stock</div>
                                )}
                                {item.stock === 0 && (
                                    <div className="out-of-stock-badge">Out of Stock</div>
                                )}
                            </div>
                            <div className="stock-card-content">
                                <h5>{item.name}</h5>
                                <p className="category">{item.categoryName}</p>
                                <div className="stock-info">
                                    <span className="price">₹{item.price}</span>
                                    <span className={`stock-count ${item.stock < 10 ? 'text-danger' : 'text-success'}`}>
                                        Stock: {item.stock}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stocks;