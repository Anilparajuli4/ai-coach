import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import Headers from "@/components/Headers";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";


const inter = Inter({subsets:["latin"]})

export const metadata = {
  title: "Online-coach",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{baseTheme:dark}}>
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* header */}
            <Headers/>
            <main className="min-h-screen container"> {children}</main>
            <Toaster richColors/>
            {/* <footer>
              <div className="container mx-auto px-4 text-center text-gray-200">
              <p> </p>
              </div>
          
            </footer> */}
             <Footer/>
          </ThemeProvider>
      
      </body>
    </html>
    </ClerkProvider>
  );
}
