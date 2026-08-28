import { Link } from 'react-router-dom';
import { ChefHat, Leaf, UtensilsCrossed, Clock, ClipboardList, Check, ArrowRight, Trash2 } from 'lucide-react';

export default function Cart({ cart, removeFromCart, updateQuantity }) {
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

    // ── EMPTY CART STATE ──
    if (cart.length === 0) {
        return (
            <div className="fixed top-[65px] bottom-0 left-0 w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-orange-950 to-stone-900 text-white z-40 px-4 overflow-y-auto lg:overflow-hidden">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-lime-500/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 text-center max-w-lg mx-auto pb-16 mt-10 lg:mt-0">
                    <img 
                        src="/empty.png" 
                        alt="Empty Cart Mascot" 
                        className="w-[180px] sm:w-[240px] object-contain mx-auto mb-8 drop-shadow-[0_20px_50px_rgba(249,115,22,0.3)] animate-float"
                    />
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Your cart is empty</h2>
                    <p className="text-orange-200/70 mb-8 text-base max-w-sm mx-auto">
                        Looks like you haven't added any tropical delights yet. Let's fix that!
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-bold text-base rounded-full hover:bg-orange-600 transition-all duration-200 shadow-xl shadow-orange-900/40 active:scale-95"
                    >
                        Browse Our Menu <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    // ── POPULATED CART STATE ──
    return (
        /* Mobile: scrollable (overflow-y-auto), Desktop: locked (lg:overflow-hidden) */
        <div className="fixed top-[65px] bottom-0 left-0 right-0 z-40 bg-gray-50 flex flex-col overflow-y-auto lg:overflow-hidden">
            
            {/* ── 1. Compact Top Header ── */}
            <div className="shrink-0 bg-gradient-to-br from-gray-900 via-orange-950 to-stone-900 px-6 sm:px-10 py-5 sm:py-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[60px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[60px] pointer-events-none" />

                <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
                    <div className="text-center sm:text-left">
                        <div className="inline-flex items-center justify-center sm:justify-start gap-2 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                            <span className="text-orange-400 text-[10px] font-bold tracking-[0.2em] uppercase">Your Order</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Your Tropical Cart</h1>
                        <p className="text-orange-100/70 text-xs sm:text-sm font-medium mt-1">
                            {totalItems} item{totalItems !== 1 ? 's' : ''} · {cart.length} unique dish{cart.length !== 1 ? 'es' : ''}
                        </p>
                    </div>
                    
                    <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold rounded-full transition-all backdrop-blur-sm shadow-sm shrink-0">
                        <ArrowRight className="w-4 h-4 rotate-180" /> Continue Shopping
                    </Link>
                </div>
            </div>

            {/* ── 2. Main Content Layout ── */}
            <div className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 lg:overflow-hidden">
                
                {/* Left Column: Mascot Image (Hidden on mobile) */}
                <div className="hidden lg:flex flex-col w-[300px] xl:w-[420px] shrink-0 items-center justify-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
                    <img 
                        src="/cart.png" 
                        alt="Cart Mascot" 
                        className="relative z-10 w-full max-w-[380px] object-contain drop-shadow-[0_20px_40px_rgba(249,115,22,0.25)] animate-float"
                    />
                </div>

                {/* Middle Column: Cart Items List */}
                <div className="flex-1 lg:overflow-y-auto pr-1 lg:pr-3 space-y-3 pb-4 lg:pb-0">
                    {cart.map((item, idx) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 flex flex-col xl:flex-row xl:items-center gap-3 xl:gap-4 hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-20 h-20 sm:w-20 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
                                    {item.image_url
                                        ? <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                        : <UtensilsCrossed className="w-8 h-8 text-orange-200" />
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">{item.name}</h3>
                                    <p className="text-orange-500 text-xs sm:text-sm font-semibold mt-0.5">Rs. {Number(item.price).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between xl:justify-end gap-4 border-t xl:border-t-0 border-gray-50 pt-3 xl:pt-0">
                                <div className="flex items-center gap-1 sm:gap-2 bg-gray-50 border border-gray-100 rounded-full px-1.5 py-1">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-white text-gray-700 font-bold flex items-center justify-center shadow-sm hover:bg-orange-50 hover:text-orange-600 transition-colors">−</button>
                                    <span className="w-6 text-center text-xs sm:text-sm font-bold text-gray-900">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-white text-gray-700 font-bold flex items-center justify-center shadow-sm hover:bg-orange-50 hover:text-orange-600 transition-colors">+</button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-gray-900 w-16 text-right">
                                        Rs. {(item.price * item.quantity).toLocaleString()}
                                    </span>
                                    <button onClick={() => removeFromCart(item.id)} className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" aria-label="Remove item">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Order Summary */}
                <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 pb-20 lg:pb-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 lg:sticky lg:top-0">
                        <h3 className="font-bold text-gray-900 text-base mb-5 flex items-center gap-2">
                            <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                <ClipboardList className="w-4 h-4 text-orange-600" />
                            </span>
                            Order Summary
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-gray-500 font-medium">
                                <span>Subtotal ({totalItems} items)</span>
                                <span className="text-gray-900">Rs. {totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="h-px bg-gray-100 mt-2" />
                            <div className="flex justify-between text-base font-extrabold text-gray-900 pt-1">
                                <span>Total</span>
                                <span className="text-orange-500">Rs. {totalPrice.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="mt-5 bg-lime-50/80 border border-lime-200/80 rounded-xl px-4 py-3 flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-lime-600 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-lime-800 font-medium leading-relaxed">Prepared fresh and packed perfectly for your chosen pickup time.</p>
                        </div>

                        <Link
                            to="/checkout"
                            className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-center rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all duration-200 active:scale-[0.98]"
                        >
                            Proceed to Checkout <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}