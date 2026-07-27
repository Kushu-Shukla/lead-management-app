import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lead Platform",
  description: "Built for Digital Heroes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        <Providers>
          <div className="flex-1">
            {children}
          </div>
          <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500 bg-white">
            Built for Digital Heroes Training Task. 
            <a href="https://digitalheroesco.com" className="text-blue-600 hover:underline ml-1">
              digitalheroesco.com
            </a>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
