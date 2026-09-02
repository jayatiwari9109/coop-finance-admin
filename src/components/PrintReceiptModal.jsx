import React from 'react';

export default function PrintReceiptModal({ isOpen, onClose, transaction }) {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white text-slate-900 rounded-lg p-6 max-w-sm w-full font-mono text-xs shadow-2xl">
        <div className="text-center border-b border-dashed border-slate-400 pb-3 mb-3">
          <h2 className="font-bold text-base uppercase">CO-OP SOCIETY LTD</h2>
          <p className="text-[10px] text-slate-600">Doorstep Collection Voucher</p>
        </div>

        <div className="space-y-1 mb-4">
          <div className="flex justify-between"><span>Txn ID:</span><span className="font-bold">{transaction.txId}</span></div>
          <div className="flex justify-between"><span>Date:</span><span>{transaction.date || '2026-09-02'}</span></div>
          <div className="flex justify-between"><span>Customer:</span><span className="font-bold">{transaction.customer}</span></div>
          <div className="flex justify-between"><span>Agent:</span><span>{transaction.agent}</span></div>
          <div className="flex justify-between"><span>Type:</span><span>{transaction.type}</span></div>
          <div className="border-t border-dashed border-slate-400 my-2"></div>
          <div className="flex justify-between text-sm font-bold"><span>Amount Paid:</span><span>₹{transaction.amount}</span></div>
        </div>

        <div className="flex gap-2 pt-2">
          <button onClick={() => window.print()} className="w-full bg-slate-900 text-white py-2 rounded text-xs font-sans font-bold">Print Receipt</button>
          <button onClick={onClose} className="w-full bg-slate-200 text-slate-800 py-2 rounded text-xs font-sans font-bold">Close</button>
        </div>
      </div>
    </div>
  );
}