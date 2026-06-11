import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AmbientOrbs from "../components/AmbientOrbs";
import GlobalEffects from "../components/GlobalEffects";

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
  title: "WOW — Wide Open World | Global Book & Movie Club",
  description: "Two months. One country. A book, a film, a friend. WOW is a global club exploring world cultures.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="scroll-progress" id="scroll-progress"></div>
        <AmbientOrbs />
        <GlobalEffects />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
