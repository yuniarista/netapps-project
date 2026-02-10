import "./globals.css";
import { Inter } from 'next/font/google';
// import AuthProvider from "@/components/AuthProvider"; // Sesuaikan path-nya
import { GlobalProvider } from "@/context/globalContext";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "NetApps"
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="font-inter antialiased">
        {/* <AuthProvider session={session}> */}
          <GlobalProvider>
            {children}
          </GlobalProvider>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}