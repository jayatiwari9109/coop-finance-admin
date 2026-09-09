import React, { useState } from 'react';

export default function Reports() {
  const [downloadingIdx, setDownloadingIdx] = useState(null);

  const reportTypes = [
    { 
      title: 'Daily Collection Statement', 
      desc: 'Detailed log of all doorstep transactions collected today.', 
      format: 'CSV / Excel',
      endpoint: 'http://localhost:5000/api/reports/daily-collection',
      filename: 'Daily_Collection_Statement.csv'
    },
    { 
      title: 'Loan Recovery Ledger', 
      desc: 'EMI recovery status breakdown by agent and borrower.', 
      format: 'CSV / Excel',
      endpoint: 'http://localhost:5000/api/reports/loan-recovery',
      filename: 'Loan_Recovery_Ledger.csv'
    },
    { 
      title: 'RD & FD Growth Report', 
      desc: 'Monthly deposit accumulation and upcoming maturity timelines.', 
      format: 'CSV / Excel',
      endpoint: 'http://localhost:5000/api/reports/rd-fd-growth',
      filename: 'RD_FD_Growth_Report.csv'
    },
  ];

  const handleDownload = async (report, index) => {
    setDownloadingIdx(index);

    try {
      const response = await fetch(report.endpoint);
      if (!response.ok) throw new Error('Failed to download report');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', report.filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
    } finally {
      setDownloadingIdx(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Reports & Analytics</h1>
        <p className="text-xs text-slate-500 mt-0.5">Generate compliance statements and financial ledgers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reportTypes.map((rep, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex flex-col justify-between h-44 hover:border-slate-300 transition-all">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{rep.title}</h3>
              <p className="text-xs text-slate-500">{rep.desc}</p>
            </div>
            <div className="flex justify-between items-center border-t border-slate-100 pt-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">{rep.format}</span>
              <button 
                onClick={() => handleDownload(rep, idx)}
                disabled={downloadingIdx === idx}
                className="px-3.5 py-1.5 bg-[#0284c7] hover:bg-[#026aa7] disabled:bg-slate-300 text-white text-xs font-semibold rounded-xl transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                {downloadingIdx === idx ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Downloading...</span>
                  </>
                ) : (
                  <span>Download</span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}