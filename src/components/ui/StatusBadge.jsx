import React from 'react';

const StatusBadge = ({ status, type }) => {
  const baseClasses = 'relative inline-block px-3 py-1 font-semibold leading-tight';
  const backgroundClasses = 'absolute inset-0 opacity-50 rounded-full';
  let colorClasses, background;

  if (type === 'payment') {
    switch (status) {
      case 'PAID':
        colorClasses = 'text-green-900';
        background = 'bg-green-200';
        break;
      case 'CANCELLED':
      case 'EXPIRED':
        colorClasses = 'text-red-900';
        background = 'bg-red-200';
        break;
      default:
        colorClasses = 'text-yellow-900';
        background = 'bg-yellow-200';
    }
  } else { // booking status
    switch (status) {
      case 'COMPLETED':
        colorClasses = 'text-green-900';
        background = 'bg-green-200';
        break;
      case 'CANCELLED':
        colorClasses = 'text-red-900';
        background = 'bg-red-200';
        break;
      default:
        colorClasses = 'text-yellow-900';
        background = 'bg-yellow-200';
    }
  }

  return (
    <span className={`${baseClasses} ${colorClasses}`}>
      <span aria-hidden className={`${backgroundClasses} ${background}`}></span>
      <span className="relative">{status}</span>
    </span>
  );
};

export default StatusBadge;