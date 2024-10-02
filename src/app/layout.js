import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Topbar from "@/components/Topbar";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import StoreProvider from "./StoreProvider";
import { TaskProvider } from "@/lib/context/TaskContext";
import { LoadingProvider } from "@/lib/context/LoadingContext";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "To-Do Done",
  description: "Manage your tasks easily with this dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>
            <StoreProvider>
              <TaskProvider>
                <Topbar />

                {children}

                <LoadingScreen />
                <Toaster />
              </TaskProvider>
            </StoreProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
