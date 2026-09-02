import React, { useState } from 'react';

export default function Reports() {
  const [downloadingIdx, setDownloadingIdx] = useState(null);

  const reportTypes = [
    { 
      title: 'Daily Collection Statement', 
      desc: 'Detailed log of all doorstep transactions collected today.', 
      format: 'PDF / Excel',
      filename: 'Daily_Collection_Statement.csv',
      data: "Transaction_ID,Agent,Customer,Amount,Status\nTXN101,Rahul Sharma,Ramesh Kumar,1500,Success\nTXN102,Vikas Gupta,Priya Sharma,5000,Success"
    },
    { 
      title: 'Loan Recovery Ledger', 
      desc: 'EMI recovery status breakdown by agent and borrower.', 
      format: 'Excel',
      filename: 'Loan_Recovery_Ledger.csv',
      data: "Loan_ID,Borrower,EMI_Due,Paid_Amount,Status\nLN5501,Amit Patel,4500,4500,Paid\nLN5502,Ramesh Kumar,12000,12000,Paid"
    },
    { 
      title: 'RD & FD Growth Report', 
      desc: 'Monthly deposit accumulation and upcoming maturity timelines.', 
      format: 'PDF',
      filename: 'RD_FD_Growth_Report.csv',
      data: "Account_No,Type,Customer,Principal,Maturity_Date\nRD101,RD,Suresh Verma,12000,2026-09-10\nFD301,FD,Vikram Singh,100000,2027-09-02"
    },
  ];

  const handleDownload = (report, index) => {
    setDownloadingIdx(index);

    setTimeout(() => {
      // Trigger file download simulation
      const blob = new Blob([report.data], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', report.filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadingIdx(null);
    }, 1000);
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