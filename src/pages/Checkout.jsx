import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, ClipboardList, CheckCircle2, CreditCard, AlertTriangle, Lock, Package, Clock, Utensils, ShoppingBag, UtensilsCrossed } from 'lucide-react';

export default function Checkout({ cart, clearCart }) {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('Card Payment');
    const [pickupTime, setPickupTime] = useState('');
    const [orderType, setOrderType] = useState('Takeaway'); 
    const [isSubmitting, setIsSubmitting] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Pre-defined time slots from 12:00 PM to 10:00 PM
    const timeSlots = [
        { value: '12:00', label: '12:00 PM' }, { value: '12:30', label: '12:30 PM' },
        { value: '13:00', label: '01:00 PM' }, { value: '13:30', label: '01:30 PM' },
        { value: '14:00', label: '02:00 PM' }, { value: '14:30', label: '02:30 PM' },
        { value: '15:00', label: '03:00 PM' }, { value: '15:30', label: '03:30 PM' },
        { value: '16:00', label: '04:00 PM' }, { value: '16:30', label: '04:30 PM' },
        { value: '17:00', label: '05:00 PM' }, { value: '17:30', label: '05:30 PM' },
        { value: '18:00', label: '06:00 PM' }, { value: '18:30', label: '06:30 PM' },
        { value: '19:00', label: '07:00 PM' }, { value: '19:30', label: '07:30 PM' },
        { value: '20:00', label: '08:00 PM' }, { value: '20:30', label: '08:30 PM' },
        { value: '21:00', label: '09:00 PM' }, { value: '21:30', label: '09:30 PM' },
        { value: '22:00', label: '10:00 PM' }
    ];

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        
        if (!token || !user) {
            alert("Please login first to place an order!");
            navigate('/auth');
            return;
        }
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        if (!pickupTime) {
            alert("Please select a valid pickup time!");
            return;
        }
        
        setIsSubmitting(true);
        try {
            await axios.post('http://localhost:5000/api/orders', {
                user_id: user.id,
                total_amount: totalPrice,
                payment_method: paymentMethod,
                pickup_time: pickupTime,
                order_type: orderType, 
                items: cart.map(item => ({ id: item.id, quantity: item.quantity, price: item.price }))
            });
            alert(`Order placed successfully! We will have it ready for ${orderType} by ${timeSlots.find(t => t.value === pickupTime)?.label || pickupTime}.`);
            clearCart();
            navigate('/');
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── EMPTY STATE ──
    if (cart.length === 0) {
        return (
            <div className="fixed top-[65px] bottom-0 left-0 w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-orange-950 to-stone-900 text-white z-40 px-4 overflow-y-auto lg:overflow-hidden">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-lime-500/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 text-center max-w-lg mx-auto pb-16">
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                        <Package className="w-11 h-11 text-orange-400" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">No items to checkout!</h2>
                    <p className="text-orange-200/70 mb-8 text-base max-w-sm mx-auto">
                        Your cart is empty. Add some delicious items first.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-colors shadow-xl shadow-orange-900/40 active:scale-95"
                    >
                        Go to Menu
                    </button>
                </div>
            </div>
        );
    }

    const paymentOptions = [
        { value: 'Card Payment', label: 'Online Card Payment', icon: <CreditCard className="w-5 h-5 text-orange-500" />, desc: 'Visa, Mastercard accepted' },
    ];

    const steps = [
        { label: 'Cart',      icon: <ShoppingCart className="w-3.5 h-3.5" />,    done: true },
        { label: 'Checkout',  icon: <ClipboardList className="w-3.5 h-3.5" />,   done: false, active: true },
        { label: 'Confirmed', icon: <CheckCircle2 className="w-3.5 h-3.5" />,    done: false },
    ];

    return (
        <div className="fixed top-[65px] bottom-0 left-0 right-0 z-40 bg-gray-50 flex flex-col overflow-y-auto lg:overflow-hidden">
            
            {/* ── 1. Dark Compact Header ── */}
            <div className="shrink-0 bg-gradient-to-br from-gray-900 via-orange-950 to-stone-900 px-6 sm:px-10 py-4 sm:py-5 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[60px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[60px] pointer-events-none" />

                <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 relative z-10">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-white">Secure Checkout</h1>

                    <div className="flex items-center gap-0">
                        {steps.map((step, i) => (
                            <div key={step.label} className="flex items-center">
                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                                    step.active
                                        ? 'bg-orange-500 text-white shadow-sm shadow-orange-900/50'
                                        : step.done
                                        ? 'bg-lime-500/20 text-lime-400'
                                        : 'bg-white/10 text-white/40'
                                }`}>
                                    {step.icon}
                                    <span className="hidden sm:inline">{step.label}</span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`w-4 sm:w-8 h-px mx-1 sm:mx-2 ${step.done ? 'bg-lime-400/50' : 'bg-white/10'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── 2. Main Content Layout ── */}
            <div className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-5 lg:gap-8 p-4 sm:p-5 lg:p-6 lg:overflow-hidden">
                
                {/* Left Column: Mascot Image (Increased Size) */}
                <div className="hidden lg:flex flex-col w-[300px] xl:w-[380px] shrink-0 items-center justify-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
                    <img 
                        src="/checkout.png" 
                        alt="Checkout Mascot" 
                        className="relative z-10 w-full max-w-[320px] xl:max-w-[360px] object-contain drop-shadow-[0_20px_40px_rgba(249,115,22,0.25)] animate-float"
                    />
                </div>

                {/* Middle Column: Order Summary */}
                <div className="flex-1 flex flex-col h-full pr-1 lg:pr-2 pb-4 lg:pb-0 space-y-4">
                    {!token && (
                        <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl shrink-0">
                            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                            <p className="text-sm text-amber-800 font-medium">
                                You must <strong>Login</strong> or <strong>Sign Up</strong> to complete your order.
                            </p>
                        </div>
                    )}

                    {/* Expandable Order Summary Box */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col flex-1 min-h-0">
                        <h2 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2 shrink-0">
                            <span className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center">
                                <ClipboardList className="w-4 h-4 text-orange-600" />
                            </span>
                            Order Summary
                        </h2>
                        
                        <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                            <ul className="divide-y divide-gray-50">
                                {cart.map(item => (
                                    <li key={item.id} className="py-3 flex justify-between items-center">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span className="text-[11px] font-bold bg-orange-100 text-orange-600 rounded-full px-2 py-0.5 flex-shrink-0">×{item.quantity}</span>
                                            <span className="text-sm text-gray-700 font-medium truncate">{item.name}</span>
                                        </div>
                                        <span className="text-sm font-bold text-gray-900 flex-shrink-0 ml-3">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100 shrink-0">
                            <div className="flex justify-between text-base font-extrabold text-gray-900 pt-1">
                                <span>Grand Total</span>
                                <span className="text-orange-500">Rs. {totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Order Type Note */}
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-4 flex items-center gap-3 shrink-0">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            {orderType === 'Takeaway' ? <Package className="w-5 h-5 text-orange-600" /> : <Utensils className="w-5 h-5 text-orange-600" />}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-orange-800">
                                {orderType === 'Takeaway' ? 'Store Pickup (Takeaway)' : 'Dine-in at Restaurant'}
                            </p>
                            <p className="text-[11px] text-orange-600 mt-0.5 leading-relaxed">
                                {orderType === 'Takeaway' 
                                    ? 'Your food will be prepared and packed fresh for your selected arrival time.'
                                    : 'A table will be ready with your freshly prepared food at your arrival time.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Right Column: Forms & Action ── */}
                <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 flex flex-col justify-center pb-12 lg:pb-0 lg:pr-1">
                    <form onSubmit={handlePlaceOrder} className="space-y-3">
                        
                        {/* Order Type Selector */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                            <h2 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                                <span className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center">
                                    <Utensils className="w-3.5 h-3.5 text-orange-600" />
                                </span>
                                Order Type
                            </h2>
                            <div className="grid grid-cols-2 gap-2">
                                <label className={`flex flex-col items-center p-2 rounded-lg border-2 cursor-pointer transition-all duration-200 ${orderType === 'Takeaway' ? 'border-orange-500 bg-orange-50 shadow-sm' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}>
                                    <input type="radio" name="orderType" value="Takeaway" checked={orderType === 'Takeaway'} onChange={e => setOrderType(e.target.value)} className="sr-only" />
                                    <ShoppingBag className={`w-5 h-5 mb-1 ${orderType === 'Takeaway' ? 'text-orange-500' : 'text-gray-400'}`} />
                                    <span className={`text-[11px] font-bold ${orderType === 'Takeaway' ? 'text-orange-800' : 'text-gray-600'}`}>Takeaway</span>
                                </label>
                                <label className={`flex flex-col items-center p-2 rounded-lg border-2 cursor-pointer transition-all duration-200 ${orderType === 'Dine-in' ? 'border-orange-500 bg-orange-50 shadow-sm' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}>
                                    <input type="radio" name="orderType" value="Dine-in" checked={orderType === 'Dine-in'} onChange={e => setOrderType(e.target.value)} className="sr-only" />
                                    <UtensilsCrossed className={`w-5 h-5 mb-1 ${orderType === 'Dine-in' ? 'text-orange-500' : 'text-gray-400'}`} />
                                    <span className={`text-[11px] font-bold ${orderType === 'Dine-in' ? 'text-orange-800' : 'text-gray-600'}`}>Dine-in</span>
                                </label>
                            </div>
                        </div>

                        {/* Dropdown Time Selector */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                                    <span className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center">
                                        <Clock className="w-3.5 h-3.5 text-orange-600" />
                                    </span>
                                    Arrival Time
                                </h2>
                            </div>
                            <select
                                id="pickupTime"
                                value={pickupTime}
                                onChange={(e) => setPickupTime(e.target.value)}
                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-semibold text-gray-800 transition-all bg-gray-50 hover:bg-white cursor-pointer"
                                required
                            >
                                <option value="" disabled>Select a time</option>
                                {timeSlots.map(slot => (
                                    <option key={slot.value} value={slot.value}>
                                        {slot.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                            <h2 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                                <span className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center">
                                    <CreditCard className="w-3.5 h-3.5 text-orange-600" />
                                </span>
                                Payment Method
                            </h2>
                            <div className="space-y-2">
                                {paymentOptions.map(opt => (
                                    <label
                                        key={opt.value}
                                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                            paymentMethod === opt.value
                                                ? 'border-orange-500 bg-orange-50 shadow-sm'
                                                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        <input type="radio" name="payment" value={opt.value} checked={paymentMethod === opt.value} onChange={e => setPaymentMethod(e.target.value)} className="sr-only" />
                                        {opt.icon}
                                        <div className="flex-1">
                                            <p className="text-[13px] font-semibold text-gray-800 leading-tight">{opt.label}</p>
                                            <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{opt.desc}</p>
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${paymentMethod === opt.value ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>
                                            {paymentMethod === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Place order button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3.5 text-white font-bold rounded-xl text-sm shadow-md transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 ${
                                isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed shadow-none'
                                    : 'bg-orange-500 hover:bg-orange-600 shadow-orange-200 hover:shadow-orange-300'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    Pay · Rs. {totalPrice.toLocaleString()}
                                </>
                            )}
                        </button>

                        <p className="flex items-center justify-center gap-1.5 text-center text-[10px] font-medium text-gray-400 pt-1">
                            <Lock className="w-3 h-3" /> Secured & Encrypted Checkout
                        </p>
                    </form>
                </div>

            </div>
        </div>
    );
}