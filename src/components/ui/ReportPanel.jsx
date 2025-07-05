import React from 'react';

// Komponen ini akan menjadi wadah utama seperti di desain Expo
const ReportPanel = ({ title, actionButton, children }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      {/* Header Panel */}
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        {actionButton && (
          // Tombol aksi seperti "Export"
          <button className="text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md border border-slate-200 transition-colors">
            {actionButton}
          </button>
        )}
      </div>
      {/* Konten Panel */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default ReportPanel;