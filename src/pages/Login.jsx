import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Backend API Hit
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Invalid email or password credentials.');
      }

      // AuthContext me real user aur token store karein
      login(data.user, data.token);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 bg-[#0284c7] rounded-2xl mx-auto flex items-center justify-center text-white font-extrabold text-xl shadow-md mb-2">
            CF
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Sign In</h1>
          <p className="text-xs text-slate-500">Access your admin portal dashboard</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl font-medium text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500 bg-slate-50 focus:bg-white transition-colors"
              placeholder="admin@coop.com"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500 bg-slate-50 focus:bg-white transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2.5 bg-[#0284c7] hover:bg-[#026aa7] active:scale-98 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-xs mt-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Account'}
          </button>
        </form>
      </div>
    </div>
  );
}