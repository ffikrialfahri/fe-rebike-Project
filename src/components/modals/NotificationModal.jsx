import React from 'react';
import { Bell } from 'lucide-react';

export default function NotificationModal({ isOpen, onClose, notifications }) {
  if (!isOpen) return null;

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-16 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-slate-800">Notifications</h3>
      </div>
      <div className="p-4 max-h-80 overflow-y-auto">
        {notifications && notifications.length > 0 ? (
          <div>
            {/* Placeholder for notification feed */}
            {notifications.map((notification, index) => (
              <div key={index} className="mb-2 pb-2 border-b border-gray-100 last:border-b-0">
                <p className="text-sm font-medium text-slate-700">{notification.message}</p>
                <p className="text-xs text-slate-500">{notification.time}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-slate-500">
            <Bell className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-sm font-medium">No Notification</p>
            <p className="text-sm">Enjoy your day.</p>
          </div>
        )}
      </div>
    </div>
  );
}
