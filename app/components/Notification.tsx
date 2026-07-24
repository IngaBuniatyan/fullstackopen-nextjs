"use client";

import { useNotification } from "@/app/components/NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className={`fixed top-20 right-4 z-50 max-w-sm rounded-xl border px-5 py-4 font-bold shadow-xl ${
        type === "success"
          ? "border-green-300 bg-green-50 text-green-900"
          : "border-red-300 bg-red-50 text-red-900"
      }`}
      data-testid="notification"
      role="status"
    >
      {message}
    </div>
  );
}
