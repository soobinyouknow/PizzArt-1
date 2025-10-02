import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pizza, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      const user = {
        id: '1',
        email,
        username: email.split('@')[0],
        points: 1250,
        achievements: [],
        createdAt: new Date(),
      };
      
      dispatch({ type: 'LOGIN', payload: user });
      navigate('/');
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickLogin = (userType: string) => {
    setIsLoading(true);
    const users = {
      gamer: { email: 'gamer@pizzart.com', username: 'PizzaGamer', points: 2500 },
      foodie: { email: 'foodie@pizzart.com', username: 'FoodieChef', points: 1800 },
      creator: { email: 'creator@pizzart.com', username: 'PizzaCreator', points: 3200 },
    };

    const selectedUser = users[userType as keyof typeof users];
    
    setTimeout(() => {
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        ...selectedUser,
        achievements: [],
        createdAt: new Date(),
      };
      
      dispatch({ type: 'LOGIN', payload: user });
      navigate('/');
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-red-600 to-red-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Pizza className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
            Masuk ke Pizzart
          </h1>
          <p className="text-gray-600 mt-2">Selamat datang kembali, Pizza Chef! 👨‍🍳</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="chef@pizzart.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? 'Sedang Masuk...' : 'Masuk'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">atau coba login cepat</span>
            </div>
          </div>
        </div>

        {/* Quick Login Options */}
        <div className="space-y-3">
          <button
            onClick={() => handleQuickLogin('gamer')}
            disabled={isLoading}
            className="w-full bg-yellow-100 text-red-700 py-3 rounded-xl font-medium hover:bg-yellow-200 transition-all flex items-center justify-center space-x-2"
          >
            <span>🎮</span>
            <span>Masuk sebagai Gamer</span>
          </button>
          
          <button
            onClick={() => handleQuickLogin('foodie')}
            disabled={isLoading}
            className="w-full bg-red-100 text-red-700 py-3 rounded-xl font-medium hover:bg-red-200 transition-all flex items-center justify-center space-x-2"
          >
            <span>🍕</span>
            <span>Masuk sebagai Food Lover</span>
          </button>
          
          <button
            onClick={() => handleQuickLogin('creator')}
            disabled={isLoading}
            className="w-full bg-yellow-200 text-red-800 py-3 rounded-xl font-medium hover:bg-yellow-300 transition-all flex items-center justify-center space-x-2"
          >
            <span>🎨</span>
            <span>Masuk sebagai Content Creator</span>
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Belum punya akun?{' '}
            <Link to="/register" className="text-red-600 font-semibold hover:text-red-700">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;