"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type NotificationType = "success" | "error";

type NotificationState = {
  message: string;
  type: NotificationType;
};

type NotificationContextValue = NotificationState & {
  showNotification: (message: string, type?: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notification, setNotification] = useState<NotificationState>({
    message: "",
    type: "success",
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    [],
  );

  const showNotification = useCallback(
    (message: string, type: NotificationType = "success") => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      setNotification({ message, type });
      timerRef.current = setTimeout(() => {
        setNotification({ message: "", type: "success" });
        timerRef.current = null;
      }, 5000);
    },
    [],
  );

  return (
    <NotificationContext.Provider
      value={{ ...notification, showNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used inside NotificationProvider",
    );
  }

  return context;
}
