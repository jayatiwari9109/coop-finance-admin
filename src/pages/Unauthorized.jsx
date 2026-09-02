import React from 'react';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-3">
      <h1 className="text-4xl font-bold text-rose-500">403 - Access Denied</h1>
      <p className="text-slate-400 text-sm max-w-sm">Aapke paas is module ko access karne ke permissions nahi hain.</p>
      <Link to="/" className="px-4 py-2 bg-slate-800 text-slate-200 rounded-lg text-sm border border-slate-700">Back to Dashboard</Link>
    </div>
  );
}