import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { ArrowRight, Lock } from 'lucide-react';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const payload = isLogin ? { email, password } : { name, email, password };
            
            const { data } = await axiosInstance.post(endpoint, payload);
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            window.location.href = '/';
        } catch (error) {
            console.error("Auth error", error);
            alert(error.response?.data?.error || "Authentication failed!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex bg-gray-50 overflow-hidden">
            <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full bg-gradient-to-br from-gray-900 via-orange-950 to-stone-900 text-white p-10 xl:p-16 relative gap-10 xl:gap-14">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 w-full max-w-lg">
                    <h1 className="text-4xl xl:text-5xl font-extrabold text-white mb-4 leading-tight">
                        Your Cravings, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                            Secured.
                        </span>
                    </h1>
                    <p className="text-orange-100/70 text-sm xl:text-base leading-relaxed border-l-2 border-orange-500/50 pl-4">
                        Sign in to pre-order from Thalgaswala's finest. Serving our community with expert chef-crafted dishes since 2010.
                    </p>
                </div>

                <div className="relative z-10 flex justify-center w-full">
                    <img 
                        src="/login.png" 
                        alt="Security Mango Guard" 
                        className="w-[200px] xl:w-[280px] object-contain drop-shadow-[0_20px_50px_rgba(249,115,22,0.4)] animate-float"
                    />
                </div>
            </div>

            <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-6 lg:p-8 relative">
                <Link to="/" className="absolute top-6 left-6 lg:hidden text-sm font-semibold text-gray-500 hover:text-orange-500 transition-colors">
                    ← Back to Menu
                </Link>

                <div className="w-full max-w-sm xl:max-w-md">
                    <div className="mb-6 xl:mb-8 text-center lg:text-left">
                        <h2 className="text-2xl xl:text-3xl font-extrabold text-gray-900 mb-1.5">
                            {isLogin ? 'Welcome back' : 'Create an account'}
                        </h2>
                        <p className="text-xs xl:text-sm text-gray-500 font-medium">
                            {isLogin 
                                ? 'Sign in to your MangoTree account to continue.' 
                                : 'Join us to start pre-ordering your favorite meals.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-1">
                                <label className="text-[10px] xl:text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={e => setName(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium text-gray-900 transition-all text-sm"
                                    required
                                />
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-[10px] xl:text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium text-gray-900 transition-all text-sm"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] xl:text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium text-gray-900 transition-all text-sm"
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`w-full flex items-center justify-center gap-2 py-3.5 text-white font-bold rounded-xl text-sm xl:text-base shadow-lg transition-all duration-200 active:scale-[0.98] mt-2 ${
                                isSubmitting 
                                    ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                                    : 'bg-orange-500 hover:bg-orange-600 shadow-orange-200 hover:shadow-orange-300'
                            }`}
                        >
                            {isSubmitting ? (
                                'Processing...'
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <p className="text-xs xl:text-sm text-gray-500 font-medium">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button 
                                type="button" 
                                onClick={() => setIsLogin(!isLogin)} 
                                className="text-orange-500 font-bold hover:text-orange-600 transition-colors"
                            >
                                {isLogin ? 'Sign Up Free' : 'Sign In'}
                            </button>
                        </p>
                        <p className="text-[10px] xl:text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                            <Lock className="w-3 h-3" /> By continuing, you agree to our Terms & Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}