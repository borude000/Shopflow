import { Link, useLocation } from "wouter";
import { ShoppingBag } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="header-gradient text-white shadow-lg">
      <div className="page-container">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
            <ShoppingBag className="h-8 w-8" />
            <span className="text-2xl font-bold">ShopEase</span>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              <li>
                <Link 
                  href="/" 
                  className={`font-medium transition-opacity hover:opacity-80 ${
                    location === '/' ? 'opacity-100' : 'opacity-90'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin" 
                  className={`font-medium transition-opacity hover:opacity-80 ${
                    location === '/admin' ? 'opacity-100' : 'opacity-90'
                  }`}
                >
                  Admin
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
