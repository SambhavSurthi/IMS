import './Dashboard.css';
import { useEffect, useState } from "react";
import { fetchDashboardData } from "../../Service/Dashboard.js";
import { fetchCategories } from "../../Service/CategoryService.js";
import toast from "react-hot-toast";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import { latestOrders } from "../../Service/OrderService.js";
import { fetchItems } from "../../Service/ItemService.js";

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categoryData, setCategoryData] = useState([]);
    const [monthlySales, setMonthlySales] = useState([]);
    const [highestOrder, setHighestOrder] = useState(0);
    const [mostPopularCategory, setMostPopularCategory] = useState('');
    const [lowStockItems, setLowStockItems] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [dashboardResponse, categoriesResponse, ordersResponse, itemsResponse] = await Promise.all([
                    fetchDashboardData(),
                    fetchCategories(),
                    latestOrders(),
                    fetchItems()
                ]);
                setData(dashboardResponse.data);
                
                // Log the raw categories data
                console.log('Raw Categories:', categoriesResponse);
                
                // Transform category data for the pie chart
                const transformedData = categoriesResponse.data.map(category => ({
                    name: category.name,
                    value: category.items
                }));
                
                console.log('Transformed Data:', transformedData);
                setCategoryData(transformedData);

                // Find highest order amount
                const highestOrderAmount = ordersResponse.data.reduce((max, order) => {
                    return order.grandTotal > max ? order.grandTotal : max;
                }, 0);
                setHighestOrder(highestOrderAmount);

                // Find most popular category - Updated logic
                const categoryCount = ordersResponse.data.reduce((acc, order) => {
                    // Log the entire order to see its structure
                    console.log('Full Order:', order);
                    
                    if (order.items && Array.isArray(order.items)) {
                        order.items.forEach(item => {
                            // Log each item to see its structure
                            console.log('Item Details:', item);
                            
                            // Check if the item has a category property
                            if (item.category) {
                                const categoryName = item.category.name || item.category;
                                acc[categoryName] = (acc[categoryName] || 0) + (item.quantity || 1);
                            }
                        });
                    }
                    return acc;
                }, {});

                console.log('Category Count:', categoryCount);

                // Get the most popular category
                const mostPopular = Object.entries(categoryCount)
                    .sort(([,a], [,b]) => b - a)[0];
                
                console.log('Most Popular:', mostPopular);
                
                // Set the most popular category, or 'N/A' if none found
                setMostPopularCategory(mostPopular ? mostPopular[0] : 'N/A');

                // Transform orders data for monthly sales
                const monthlyData = ordersResponse.data.reduce((acc, order) => {
                    const date = new Date(order.createdAt);
                    const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
                    
                    if (!acc[monthYear]) {
                        acc[monthYear] = 0;
                    }
                    acc[monthYear] += order.grandTotal;
                    return acc;
                }, {});

                // Convert to array and sort by date
                const monthlySalesData = Object.entries(monthlyData)
                    .map(([month, total]) => ({
                        month,
                        sales: total
                    }))
                    .sort((a, b) => {
                        const dateA = new Date(a.month);
                        const dateB = new Date(b.month);
                        return dateA - dateB;
                    });

                setMonthlySales(monthlySalesData);

                // Process low stock items
                const lowStock = itemsResponse.data
                    .filter(item => item.stock < 10)
                    .sort((a, b) => a.stock - b.stock);
                setLowStockItems(lowStock);

            } catch (error) {
                console.error('Error loading data:', error);
                toast.error("Unable to view the data");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <div className="loading">Loading dashboard...</div>
    if (!data) return <div className="error">Failed to load the dashboard data...</div>;

    const itemCategoryData = [
        { name: 'Electronics', value: 200 },
        { name: 'Clothing', value: 150 },
        { name: 'Home Appliances', value: 80 },
        { name: 'Books', value: 60 },
        { name: 'Furniture', value: 120 },
    ];

    const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF4747'];

    // Add this test data temporarily at the top of your component
    const testData = [
        { name: 'Test1', value: 100 },
        { name: 'Test2', value: 200 },
        { name: 'Test3', value: 300 }
    ];

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-container">
                {/* Total Sales and Total Orders Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon"><i className="bi bi-currency-rupee"></i></div>
                        <div className="stat-content">
                            <h3>Today's Sales</h3>
                            <p>₹{data.todaySales.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon"><i className="bi bi-cart-check"></i></div>
                        <div className="stat-content">
                            <h3>Today's Orders</h3>
                            <p>{data.todayOrderCount}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon"><i className="bi bi-arrow-up-right"></i></div>
                        <div className="stat-content">
                            <h3>Highest Order</h3>
                            <p>₹{highestOrder.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon"><i className="bi bi-tag"></i></div>
                        <div className="stat-content">
                            <h3>Most Popular Category</h3>
                            <p>{mostPopularCategory}</p>
                        </div>
                    </div>


                </div>

                {/* Graphs */}
                <div className="charts-grid">
                    <div className="chart-card">
                        <h3><i className="bi bi-pie-chart-fill"></i> Available Item Categories</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label={({ name, value }) => `${name}: ${value} items`}
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => [`${value} items`, 'Count']} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-card">
                        <h3><i className="bi bi-calendar-event"></i> Today's Sales</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={data.recentOrders.map(order => ({
                                    time: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                    amount: order.grandTotal
                                }))}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="amount" stroke="#ffc107" activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-card">
                        <h3><i className="bi bi-bar-chart-line"></i> Monthly Sales</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={monthlySales}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip 
                                    formatter={(value) => [`₹${value.toFixed(2)}`, 'Sales']}
                                    labelFormatter={(label) => `Month: ${label}`}
                                />
                                <Bar 
                                    dataKey="sales" 
                                    fill="#fd7e14"
                                    name="Sales"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Orders Table */}
                <div className="recent-orders-card">
                    <h3 style={{ color: "white" }}  ><i className="bi bi-clock-history"></i> Recent Orders</h3>
                    <div className="orders-table-container">
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Customer</th>
                                    <th>Amount</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recentOrders.map(order => (
                                    <tr key={order.orderId}>
                                        <td>{order.orderId.substring(0, 8)}...</td>
                                        <td>{order.customerName}</td>
                                        <td>₹{order.grandTotal.toFixed(2)}</td>
                                        <td><span className={`payment-method ${order.paymentMethod.toLowerCase()}`}>{order.paymentMethod}</span></td>
                                        <td><span className={`status-badge ${order.paymentDetails.status.toLowerCase()}`}>{order.paymentDetails.status}</span></td>
                                        <td>{new Date(order.createdAt).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Low Stock Items Table */}
                <div className="low-stock-card">
                    <h3 style={{ color: "white" }}>
                        <i className="bi bi-exclamation-triangle-fill"></i> Low Stock Items
                    </h3>
                    <div className="orders-table-container">
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Category</th>
                                    <th>Current Stock</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lowStockItems.map(item => (
                                    <tr key={item.itemId}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img 
                                                    src={item.imgUrl} 
                                                    alt={item.name} 
                                                    className="item-thumbnail me-2"
                                                />
                                                {item.name}
                                            </div>
                                        </td>
                                        <td>{item.categoryName}</td>
                                        <td>
                                            <span className={`stock-badge ${item.stock === 0 ? 'out-of-stock' : 'low-stock'}`}>
                                                {item.stock}
                                            </span>
                                        </td>
                                        <td>₹{item.price.toFixed(2)}</td>
                                        <td>
                                            <span className={`status-badge ${item.stock === 0 ? 'out-of-stock' : 'low-stock'}`}>
                                                {item.stock === 0 ? 'Out of Stock' : 'Low Stock'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
