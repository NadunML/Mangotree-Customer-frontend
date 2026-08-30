import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Clock, Heart, ChefHat, ArrowRight, MapPin, Phone } from 'lucide-react';

// Custom SVG Icons for Real Social Media Brands
const FacebookIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

const InstagramIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    </svg>
);

const TikTokIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.61-5.46-.05-1.47.31-2.93 1.11-4.14 1.34-2.06 3.65-3.32 6.11-3.32.06 0 .12 0 .18.01v4.06c-1.04-.08-2.11.16-2.98.76-.8.56-1.32 1.42-1.4 2.37-.1 1.09.43 2.18 1.35 2.76 1.05.63 2.4.67 3.48.06.77-.42 1.32-1.19 1.45-2.07.05-.28.05-.56.05-.85V.02h-1.46z" />
    </svg>
);

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Connect With Us</h2>
                    <p className="text-gray-500">Follow us on social media or give us a call.</p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6">
                    <a href="tel:0765293838" className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-orange-300 hover:shadow-md transition-all group w-full sm:w-auto">
                        <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                            <Phone className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Call Us</p>
                            <p className="text-sm font-bold text-gray-900">0765 293 838</p>
                        </div>
                    </a>

                    <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all group w-full sm:w-auto">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                            <FacebookIcon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Facebook</p>
                            <p className="text-sm font-bold text-gray-900">www.facebook.com</p>
                        </div>
                    </a>

                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-pink-300 hover:shadow-md transition-all group w-full sm:w-auto">
                        <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center group-hover:bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 transition-all">
                            <InstagramIcon className="w-5 h-5 text-pink-600 group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Instagram</p>
                            <p className="text-sm font-bold text-gray-900">www.instagram.com</p>
                        </div>
                    </a>

                    <a href="https://www.tiktok.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-gray-900 hover:shadow-md transition-all group w-full sm:w-auto">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                            <TikTokIcon className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">TikTok</p>
                            <p className="text-sm font-bold text-gray-900">www.tiktok.com</p>
                        </div>
                    </a>
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