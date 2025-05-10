import './OrderHistory.css';
import {useEffect, useState} from "react";
import {latestOrders} from "../../Service/OrderService.js";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [dateFilter, setDateFilter] = useState('ALL');
    const [paymentFilter, setPaymentFilter] = useState('ALL');
    const [sortOrder, setSortOrder] = useState('NONE');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await latestOrders();
                setOrders(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    const formatItems = (items) => {
        return items.map((item) => `${item.name} x ${item.quantity}`).join(', ');
    }

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Updated date filter functions
    const isToday = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const orderDate = new Date(date);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime();
    }

    const isThisWeek = (date) => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        const orderDate = new Date(date);
        return orderDate >= startOfWeek && orderDate <= endOfWeek;
    }

    const isThisMonth = (date) => {
        const today = new Date();
        const orderDate = new Date(date);
        return orderDate.getMonth() === today.getMonth() && 
               orderDate.getFullYear() === today.getFullYear();
    }

    // Filter and sort orders
    const filteredOrders = orders
        .filter(order => {
            const matchesSearch = 
                order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.phoneNumber.includes(searchTerm);

            const matchesStatus = statusFilter === 'ALL' || 
                order.paymentDetails?.status === statusFilter;

            const matchesDate = dateFilter === 'ALL' || 
                (dateFilter === 'TODAY' && isToday(order.createdAt)) ||
                (dateFilter === 'THIS_WEEK' && isThisWeek(order.createdAt)) ||
                (dateFilter === 'THIS_MONTH' && isThisMonth(order.createdAt));

            const matchesPayment = paymentFilter === 'ALL' || 
                order.paymentMethod === paymentFilter;

            return matchesSearch && matchesStatus && matchesDate && matchesPayment;
        })
        .sort((a, b) => {
            if (sortOrder === 'HIGHEST') {
                return b.grandTotal - a.grandTotal;
            } else if (sortOrder === 'LOWEST') {
                return a.grandTotal - b.grandTotal;
            }
            return 0;
        });

    if (loading) {
        return <div className="text-center py-4">Loading orders...</div>
    }

    if (orders.length === 0) {
        return <div className="text-center py-4">No orders found</div>
    }

    return (
        <div className="orders-history-container">
            <h2 className="mb-2 text-light">All Orders</h2>

            {/* Search and Filter Section */}
            <div className="filters-section mb-4">
                <div className="row g-3">
                    {/* Search Box */}
                    <div className="col-md-3">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by customer name or order ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span className="input-group-text">
                                <i className="bi bi-search"></i>
                            </span>
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="col-md-2">
                        <select 
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="ALL">All Status</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="PENDING">Pending</option>
                            <option value="FAILED">Failed</option>
                        </select>
                    </div>

                    {/* Payment Method Filter */}
                    <div className="col-md-2">
                        <select 
                            className="form-select"
                            value={paymentFilter}
                            onChange={(e) => setPaymentFilter(e.target.value)}
                        >
                            <option value="ALL">All Payments</option>
                            <option value="CASH">Cash</option>
                            <option value="UPI">UPI</option>
                        </select>
                    </div>

                    {/* Date Filter */}
                    <div className="col-md-2">
                        <select 
                            className="form-select"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        >
                            <option value="ALL">All Time</option>
                            <option value="TODAY">Today</option>
                            <option value="THIS_WEEK">This Week</option>
                            <option value="THIS_MONTH">This Month</option>
                        </select>
                    </div>

                    {/* Sort Order */}
                    <div className="col-md-2">
                        <select 
                            className="form-select"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="NONE">Sort by Amount</option>
                            <option value="HIGHEST">Highest First</option>
                            <option value="LOWEST">Lowest First</option>
                        </select>
                    </div>

                    {/* Clear Filters Button */}
                    <div className="col-md-1">
                        <button 
                            className="btn btn-secondary w-100"
                            onClick={() => {
                                setSearchTerm('');
                                setStatusFilter('ALL');
                                setDateFilter('ALL');
                                setPaymentFilter('ALL');
                                setSortOrder('NONE');
                            }}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Order Id</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.customerName} <br/>
                                    <small className="text-muted">{order.phoneNumber}</small>
                                </td>
                                <td>{formatItems(order.items)}</td>
                                <td>₹{order.grandTotal}</td>
                                <td>{order.paymentMethod}</td>
                                <td>
                                    <span className={`badge ${order.paymentDetails?.status === "COMPLETED"? "bg-success" : "bg-warning text-dark"}`}>
                                        {order.paymentDetails?.status || "PENDING"}
                                    </span>
                                </td>
                                <td>{formatDate(order.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderHistory;