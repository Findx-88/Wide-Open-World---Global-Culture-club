import localFont from "next/font/local";
import "./globals.css";
import "./custom-styles.css";
import "./visual-upgrade.css";
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
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/countries.geojson" as="fetch" crossOrigin="anonymous" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/three-globe@2.31.0/dist/three-globe.min.js" defer></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var t = localStorage.getItem('wow-theme') || 'dark';
            document.documentElement.setAttribute('data-theme', t);
          })()
        `}} />
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
