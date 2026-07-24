import type { Metadata } from "next";
import NavBar from "@/app/components/NavBar";
import Notification from "@/app/components/Notification";
import {
  NotificationProvider,
} from "@/app/components/NotificationContext";
import AuthSessionProvider from "@/app/components/SessionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Full Stack Open Blog",
  description: "Next.js exercises 1–25 for Full Stack Open",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            <main className="page-shell">{children}</main>
            <footer className="site-footer">
              Full Stack Open · Next.js Chapters 2–4
            </footer>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
