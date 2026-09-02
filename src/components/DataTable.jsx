import React, { useState } from 'react';

export default function DataTable({ columns, data, searchKey = 'name' }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item =>
    String(item[searchKey] || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center gap-4">
        <input
          type="text"
          placeholder={`Search by ${searchKey}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-950 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-sm w-full max-w-xs focus:outline-none focus:border-blue-500"
        />
        <span className="text-xs text-slate-400">Total: {filteredData.length} entries</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-xs border-b border-slate-800">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="p-3">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredData.length > 0 ? (
              filteredData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                  {columns.map((col, cIdx) => (
                    <td key={cIdx} className="p-3">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center p-6 text-slate-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}