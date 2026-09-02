// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (username === 'admin@coopfinance.com' && password === 'admin123') {
//       login({ name: 'Proprietor Admin', role: 'Super Admin' }, 'mock-jwt-token-12345');
//       navigate('/');
//     } else {
//       setError('Invalid email or password credentials.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
//       <form onSubmit={handleLogin} className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
//         <div className="text-center space-y-2">
//           <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-xl mx-auto shadow-lg shadow-blue-600/30">
//             CF
//           </div>
//           <h2 className="text-2xl font-bold text-slate-100">CoOp Finance System</h2>
//           <p className="text-xs text-slate-400">Admin Panel Doorstep Portal Access</p>
//         </div>

//         {error && (
//           <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-xs text-center font-medium">
//             {error}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label className="text-xs text-slate-400 font-medium block mb-1.5">Username / Email ID</label>
//             <input
//               type="email"
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 px-3.5 py-2.5 rounded-lg text-sm text-slate-100 outline-none transition-colors"
//               placeholder="admin@coopfinance.com"
//             />
//           </div>

//           <div>
//             <label className="text-xs text-slate-400 font-medium block mb-1.5">Password</label>
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 px-3.5 py-2.5 rounded-lg text-sm text-slate-100 outline-none transition-colors"
//               placeholder="••••••••"
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg text-sm shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
//         >
//           Sign In to Admin Panel
//         </button>

//         {/* Demo Credentials Box */}
//         <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs space-y-1">
//           <p className="text-slate-400 font-semibold">Demo Login Details:</p>
//           <div className="flex flex-col gap-1 text-slate-300">
//             <span>Email: <code className="text-blue-400 font-mono">admin@coopfinance.com</code></span>
//             <span>Password: <code className="text-blue-400 font-mono">admin123</code></span>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Strict authentication credential check
    if (email === 'admin@coopfinance.com' && password === 'admin123') {
      login({ name: 'Proprietor Admin', email, role: 'Super Admin' }, 'mock-jwt-token-12345');
      navigate('/', { replace: true });
    } else {
      setError('Invalid email or password credentials. Please check below details.');
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
              placeholder="admin@coopfinance.com"
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
            className="w-full py-2.5 bg-[#0284c7] hover:bg-[#026aa7] active:scale-98 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-xs mt-2"
          >
            Sign In to Account
          </button>
        </form>
      </div>
    </div>
  );
}