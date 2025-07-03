import React from 'react';
import Card from "../../components/ui/Card";

export default function Billing() {
  return (
    <>
      {/* Header Billing */}
      <div className="flex items-center gap-2 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-slate-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-slate-800">Billing</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="min-h-[150px] flex items-center justify-center bg-slate-100">
          <p className="text-slate-500">Area for Billing Summary 1</p>
        </Card>
        <Card className="min-h-[150px] flex items-center justify-center bg-slate-100">
          <p className="text-slate-500">Area for Billing Summary 2</p>
        </Card>
      </div>

      <Card className="min-h-[400px] flex items-center justify-center bg-slate-100">
        <p className="text-slate-500">Area for Billing Details / History</p>
      </Card>
    </>
  );
}
