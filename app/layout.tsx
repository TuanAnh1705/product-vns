import type { Metadata } from "next";
import "./globals.css";
import { SearchProvider } from "./context/SearchContext";
import { SearchHeader } from "./components/SearchHeader";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "./components/ScrollToTop";
import ContentProtection from "./components/ContentProtection";
import { ContactGate } from "./components/ContactGate";


export const metadata: Metadata = {
  title: "Vietnam Sourcing Partner - Vietnam Sourcing",
  description: "Our team has the capacity to source, procure, design and produce any product which is made within Vietnam so if there is a product you cannot see in our list below please reach out to our team to discuss.",
  icons: {
    icon: "/assets/LogoVNS.png",
    shortcut: "/assets/LogoVNS.png",
    apple: "/assets/LogoVNS.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContentProtection />
        <ContactGate />
        <SearchProvider>
          <SearchHeader />
          <Toaster
            // 1. Đặt vị trí cơ bản là top-center để nó căn giữa chiều ngang trước
            position="top-center"
            containerStyle={{
              // 2. Ép vị trí nằm giữa màn hình
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            toastOptions={{
              // Tùy chỉnh thêm CSS để Toast trông chuyên nghiệp hơn (Style Neon Tech)
              duration: 3000,
              style: {
                background: "#1E4A36", // Màu nền tối theo style của bạn
                color: "#fff",
                padding: "20px 30px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "500",
                border: "1px solid #428159", // Viền xanh Neon
                boxShadow: "0 0 20px rgba(37, 107, 232, 0.2)", // Đổ bóng phát sáng
              },
              success: {
                iconTheme: {
                  primary: "#428159",
                  secondary: "#fff",
                },
              },
            }}
          />
          <main className="pt-5 bg-white">{children}</main>
          <ScrollToTop />
          <Footer />
        </SearchProvider>
      </body>
    </html>
  );
}
