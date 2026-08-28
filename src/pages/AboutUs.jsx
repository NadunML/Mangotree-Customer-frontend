import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Clock, Heart, ChefHat, ArrowRight, MapPin } from 'lucide-react';

export default function AboutUs() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-orange-950 to-stone-900 text-white min-h-[calc(100vh-64px)] flex items-center py-12 px-4">
                <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-lime-500/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                            <span className="text-orange-300 text-xs font-semibold tracking-[0.18em] uppercase">Our Story</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                            Fresh Tropical Flavors, <br /> Ready When You Are.
                        </h1>
                        <p className="text-orange-100/70 text-lg sm:text-xl max-w-xl mx-auto md:mx-0 leading-relaxed">
                            Welcome to MangoTree. Pre-order your favorite tropical dishes online, skip the queue, and enjoy your meal exactly when you arrive!
                        </p>
                    </div>
                    
                    <div className="flex-1 flex justify-center md:justify-end w-full max-w-[280px] md:max-w-md lg:max-w-lg mt-8 md:mt-0">
                        <img 
                            src="/AboutUs.png" 
                            alt="MangoTree Mascot" 
                            className="w-full object-contain drop-shadow-[0_20px_50px_rgba(249,115,22,0.3)] animate-float"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
                    A Taste of Paradise in Every Bite
                </h2>
                <div className="w-24 h-1.5 bg-orange-500 rounded-full mx-auto mb-8"></div>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Founded in <strong>2010</strong>, MangoTree started with a simple vision: to make high-quality, delicious tropical cuisine accessible without the wait. Over the past decade, our chefs have perfected the art of combining traditional recipes with modern culinary techniques, creating dishes that are both deeply familiar and excitingly new.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-10">
                    Whether you're picking up a quick Takeaway or settling in for a relaxed Dine-in experience, every meal is prepared fresh to order and perfectly timed for your arrival. We take pride in serving our community with the freshest locally sourced ingredients.
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                            <ChefHat className="w-7 h-7 text-orange-600" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-gray-900 text-lg">Master Chefs</p>
                            <p className="text-sm text-gray-500">10+ Years of Culinary Experience</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white py-20 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">We are committed to providing the best dining experience, from our kitchen to your table.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 bg-lime-100 rounded-2xl flex items-center justify-center mb-6">
                                <Leaf className="w-7 h-7 text-lime-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Fresh Ingredients</h3>
                            <p className="text-gray-600 leading-relaxed">We source the freshest vegetables and premium meats daily to ensure the highest quality in every dish.</p>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                                <Clock className="w-7 h-7 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Skip the Queue</h3>
                            <p className="text-gray-600 leading-relaxed">Pre-order online and select your arrival time. Your food will be packed and ready exactly when you walk in.</p>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                                <Heart className="w-7 h-7 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Made with Love</h3>
                            <p className="text-gray-600 leading-relaxed">Cooking is our passion. Every meal is crafted with care, ensuring you feel the tropical warmth in every bite.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-10 sm:p-14 shadow-lg shadow-orange-200 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                    <MapPin className="w-12 h-12 text-white/80 mx-auto mb-6" />
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Hungry yet?</h2>
                    <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
                        Pre-order online now. Grab your takeaway instantly or settle in for a relaxed Dine-in experience—no waiting required.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold text-lg rounded-full hover:bg-gray-50 transition-all duration-300 shadow-md active:scale-95"
                    >
                        Explore Menu <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>

        </div>
    );
}