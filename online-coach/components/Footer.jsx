import Link from "next/link";



function Footer() {
    return (
      <footer className="w-full bg-background py-6 border-t">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          <nav className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-muted-foreground text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-muted-foreground text-sm hover:underline">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-muted-foreground text-sm hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  