import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import {
    ClipboardList, UtensilsCrossed, ShoppingCart, ShoppingBag,
    Clock, CheckCircle2, XCircle, Package, ArrowRight, Plus, Receipt, Truck
} from 'lucide-react';

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token || !user) {
            navigate('/auth');
            return;
        }
        const fetchMyOrders = async () => {
            try {
                const response = await axiosInstance.get(`/orders/user/${user.id}`);
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchMyOrders();
    }, [user, token, navigate]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Processing':       return 'bg-orange-100 text-orange-700 border border-orange-200';
            case 'Out for Delivery': return 'bg-amber-100 text-amber-700 border border-amber-200';
            case 'Completed':        return 'bg-lime-100 text-lime-700 border border-lime-200';
            case 'Cancelled':        return 'bg-red-100 text-red-700 border border-red-200';
            default:                 return 'bg-gray-100 text-gray-600 border border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Processing':       return <Clock className="w-3.5 h-3.5" />;
            case 'Out for Delivery': return <Truck className="w-3.5 h-3.5" />;
            case 'Completed':        return <CheckCircle2 className="w-3.5 h-3.5" />;
            case 'Cancelled':        return <XCircle className="w-3.5 h-3.5" />;
            default:                 return <Clock className="w-3.5 h-3.5" />;
        }
    };

    if (orders.length === 0) {
        return (
            <div className="fixed top-[65px] bottom-0 left-0 right-0 z-40 bg-gradient-to-br from-gray-900 via-orange-950 to-stone-900 overflow-hidden flex flex-col">
                <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-lime-500/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="flex-1 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20 p-6 relative z-10">
                    <div className="flex-1 flex justify-center md:justify-end w-full max-w-[300px] md:max-w-none">
                        <img 
                            src="/my_order.png" 
                            alt="Sleeping Mango Mascot" 
                            className="w-full max-w-[350px] lg:max-w-[450px] object-contain drop-shadow-[0_20px_50px_rgba(249,115,22,0.2)] animate-float"
                        />
                    </div>
                    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                            <span className="text-orange-300 text-xs font-semibold tracking-[0.18em] uppercase">My Orders</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                            No orders yet
                        </h1>
                        <p className="text-orange-200/70 text-base sm:text-lg max-w-md mb-10 leading-relaxed">
                            Looks like you haven't placed any orders yet. Start exploring our tropical menu and treat yourself!
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-full hover:bg-orange-600 transition-all duration-300 shadow-[0_10px_30px_rgba(249,115,22,0.4)] hover:shadow-[0_15px_40px_rgba(249,115,22,0.6)] active:scale-95"
                        >
                            Browse Our Menu <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed top-[65px] bottom-0 left-0 right-0 z-40 bg-gray-50 flex flex-col overflow-y-auto lg:overflow-hidden">
            <div className="shrink-0 bg-gradient-to-br from-gray-900 via-orange-950 to-stone-900 px-6 sm:px-10 py-4 sm:py-5 shadow-md relative overflow-hidden">
                <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
                    <div className="text-center sm:text-left">
                        <div className="inline-flex items-center justify-center sm:justify-start gap-2 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                            <span className="text-orange-400 text-[10px] font-bold tracking-[0.18em] uppercase">My Orders</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Your Order History</h1>
                        <p className="text-orange-100/70 text-xs sm:text-sm font-medium mt-1">
                            {orders.length} past {orders.length === 1 ? 'order' : 'orders'}
                        </p>
                    </div>
                    
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-200 shadow-lg shadow-orange-900/30 shrink-0"
                    >
                        <Plus className="w-4 h-4" /> New Order
                    </Link>
                </div>
            </div>

            <div className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-5 lg:gap-8 p-4 sm:p-5 lg:p-6 lg:overflow-hidden">
                <div className="hidden lg:flex flex-col w-[300px] xl:w-[380px] shrink-0 items-center justify-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
                    <img 
                        src="/orders.png" 
                        alt="Orders Mascot" 
                        className="relative z-10 w-full max-w-[320px] xl:max-w-[360px] object-contain drop-shadow-[0_20px_40px_rgba(249,115,22,0.25)] animate-float"
                    />
                </div>

                <div className="flex-1 flex flex-col h-full pr-1 lg:pr-2 pb-12 lg:pb-0">
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                        {orders.map((order, idx) => {
                            const status = order.status || 'Pending';
                            return (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-orange-100 transition-all duration-200 animate-fade-in"
                                    style={{ animationDelay: `${idx * 60}ms` }}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-50 gap-3">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Receipt className="w-5 h-5 text-orange-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-base">#MT-{String(order.id).padStart(4, '0')}</p>
                                                {order.created_at && (
                                                    <p className="text-xs text-gray-400 mt-0.5 font-medium">
                                                        {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide self-start sm:self-auto ${getStatusBadge(status)}`}>
                                            {getStatusIcon(status)}
                                            {status}
                                        </span>
                                    </div>

                                    <div className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-start gap-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-3">Dishes Ordered</p>
                                            <ul className="space-y-2.5 mb-4">
                                                {order.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                                        <span className="bg-orange-100 text-orange-700 font-extrabold px-2 py-0.5 rounded text-[11px] leading-none mt-0.5 shrink-0 shadow-sm border border-orange-200/50">
                                                            ×{item.quantity}
                                                        </span>
                                                        <span className="font-medium leading-snug">{item.item_name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className="text-[11px] text-gray-400 border-t border-gray-100 pt-3 inline-block">
                                                Paid via <span className="font-semibold text-gray-600">{order.payment_method}</span>
                                            </p>
                                        </div>
                                        
                                        <div className="flex-shrink-0 sm:text-right bg-gray-50 sm:bg-transparent p-4 sm:p-0 rounded-xl mt-2 sm:mt-0 border border-gray-100 sm:border-none">
                                            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-gray-400">Total Paid</p>
                                            <p className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">Rs. {Number(order.total_amount).toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="px-5 sm:px-6 py-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                                        <p className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                                            <Package className="w-3.5 h-3.5 text-gray-400" />
                                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                        </p>
                                        <Link
                                            to="/"
                                            className="px-5 py-2 border border-orange-500 text-orange-500 text-xs font-bold uppercase tracking-wide rounded-full hover:bg-orange-500 hover:text-white transition-all duration-200"
                                        >
                                            Reorder
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}