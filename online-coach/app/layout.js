import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import Headers from "@/components/Headers";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";


const inter = Inter({subsets:["latina"]})

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
            <footer>
              <div className="container mx-auto px-4 text-center text-gray-200">
              <p> i am footer</p>
              </div>
             
            </footer>
             
          </ThemeProvider>
      
      </body>
    </html>
    </ClerkProvider>
  );
}
