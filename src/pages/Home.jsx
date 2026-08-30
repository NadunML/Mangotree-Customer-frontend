import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Leaf, ChefHat, Star, UtensilsCrossed, Plus, Store, Users } from 'lucide-react';

export default function Home({ addToCart }) {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState('All');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleOrderNow = (item) => {
        if (token) {
            addToCart(item);
        } else {
            navigate('/auth');
        }
    };

    useEffect(() => {
        const fetchCategoriesAndItems = async () => {
            try {
                const [categoryResponse, menuResponse] = await Promise.all([
                    axiosInstance.get('/categories'),
                    axiosInstance.get('/menu-items')
                ]);
                
                setCategories(categoryResponse.data);
                setMenuItems(menuResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCategoriesAndItems();
    }, []);

    const sortedMenuItems = [...menuItems].sort((a, b) => {
        if (a.category_id === b.category_id) {
            return a.id - b.id; 
        }
        return a.category_id - b.category_id;
    });

    const filteredItems = activeCategoryId === 'All' 
        ? sortedMenuItems 
        : sortedMenuItems.filter(item => item.category_id === activeCategoryId);

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            <div className="relative bg-gradient-to-br from-gray-900 via-orange-950 to-stone-900 text-white min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden px-4 py-12 lg:py-0 w-full">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
                    <div className="flex-1 text-center lg:text-left w-full">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold tracking-widest uppercase mb-6 animate-fade-in">
                            <Store className="w-3.5 h-3.5" />
                            Pre-Order & Pickup · Open
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight max-w-4xl mx-auto lg:mx-0">
                            The True Taste of Thalgaswala ! <br className="hidden xl:block" />
                        </h1>

                        <p className="text-orange-100/70 text-base sm:text-lg mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Serving the most delicious meals to our community since 2010. Crafted by expert chefs for the whole family to enjoy. Skip the queue — pre-order your favorites online and pick them up fresh!
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10">
                            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-200 backdrop-blur-sm">
                                <ChefHat className="w-4 h-4 text-orange-400" /> Expert Chefs
                            </span>
                            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-200 backdrop-blur-sm">
                                <Users className="w-4 h-4 text-amber-400" /> Family Friendly
                            </span>
                            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-200 backdrop-blur-sm">
                                <Leaf className="w-4 h-4 text-lime-400" /> Authentic Recipes
                            </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10 text-left">
                            <div>
                                <p className="text-2xl sm:text-3xl font-extrabold text-white">15<span className="text-orange-500">+</span></p>
                                <p className="text-xs text-orange-300/60 mt-1 tracking-wide">Years of Legacy</p>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-extrabold text-white">500<span className="text-orange-500">+</span></p>
                                <p className="text-xs text-orange-300/60 mt-1 tracking-wide">Happy Families</p>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-extrabold text-white">0<span className="text-orange-500"> Wait</span></p>
                                <p className="text-xs text-orange-300/60 mt-1 tracking-wide">With Pre-orders</p>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-1">
                                    4.9 <Star className="w-5 h-5 text-amber-400 fill-amber-400 inline ml-0.5 -mt-0.5" />
                                </p>
                                <p className="text-xs text-orange-300/60 mt-1 tracking-wide">Customer Rating</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center lg:justify-end w-full mt-10 lg:mt-0">
                        <img 
                            src="/welcome.png" 
                            alt="MangoTree Mascot" 
                            className="w-[280px] sm:w-[350px] lg:w-[450px] xl:w-[500px] object-contain drop-shadow-[0_20px_50px_rgba(249,115,22,0.3)] animate-float"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
                        <button
                            onClick={() => setActiveCategoryId('All')}
                            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                activeCategoryId === 'All'
                                    ? 'bg-orange-500 text-white shadow-md shadow-orange-200 scale-105'
                                    : 'bg-gray-50 text-gray-500 border border-gray-200 hover:border-orange-300 hover:text-orange-500'
                            }`}
                        >
                            All Menu
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategoryId(cat.id)}
                                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                    activeCategoryId === cat.id
                                        ? 'bg-orange-500 text-white shadow-md shadow-orange-200 scale-105'
                                        : 'bg-gray-50 text-gray-500 border border-gray-200 hover:border-orange-300 hover:text-orange-500'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8 text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Exotic Favorites</h2>
                    <p className="text-gray-400 mt-1 text-sm">{filteredItems.length} {filteredItems.length === 1 ? 'dish' : 'dishes'} available</p>
                </div>

                {menuItems.length === 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {[1,2,3,4,5,6,7,8].map(n => (
                            <div key={n} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                                <div className="h-44 bg-gray-200" />
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                                    <div className="h-3 bg-gray-200 rounded w-full" />
                                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                                    <div className="flex justify-between items-center pt-2">
                                        <div className="h-5 bg-gray-200 rounded w-16" />
                                        <div className="h-9 bg-gray-200 rounded-full w-20" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-5">
                            <Leaf className="w-9 h-9 text-orange-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No dishes in this category</h3>
                        <p className="text-gray-400 text-sm">Try selecting a different category above.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filteredItems.map((item) => {
                            const itemCategory = categories.find(c => c.id === item.category_id);
                            return (
                                <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-orange-100 animate-fade-in">
                                    <div className="relative h-44 bg-gradient-to-br from-orange-50 to-amber-100 overflow-hidden">
                                        {item.image_url ? (
                                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                                <UtensilsCrossed className="w-14 h-14 text-orange-200" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm">
                                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                            <span className="text-xs font-bold text-gray-700">{(4.5 + Math.random() * 0.5).toFixed(1)}</span>
                                        </div>
                                        {itemCategory && (
                                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                                                {itemCategory.name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 text-left">
                                        <h3 className="font-bold text-gray-900 text-base leading-tight truncate mb-1">{item.name}</h3>
                                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4 min-h-[32px]">
                                            {item.description || 'A signature tropical delight crafted with fresh ingredients.'}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-extrabold text-gray-900">Rs. {Number(item.price).toLocaleString()}</span>
                                            <button
                                                onClick={() => handleOrderNow(item)}
                                                className="flex items-center gap-1 px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-all duration-200 active:scale-95 shadow-sm shadow-orange-200"
                                            >
                                                <Plus className="w-3.5 h-3.5" /> Order now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}