import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Activity } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Improved isActive to also check query params like ?scroll=features
  const isActive = (path: string) => {
    const [pathname, search] = path.split("?");
    return (
      location.pathname === pathname &&
      (search ? location.search.includes(search) : true)
    );
  };

  // ✅ Added Dashboard link
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/?scroll=features" },
    { name: "About", path: "/?scroll=about" },
    { name: "Dashboard", path: "/dashboard" }, // NEW
  ];

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
              LabSense
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
                  isActive(link.path)
                    ? "text-primary after:w-full"
                    : "text-muted-foreground"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
            <Button
              asChild
              variant="default"
              size="sm"
              className="hover:scale-105 transition-all duration-300"
            >
              <Link to="/login">Login</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="transition-transform duration-300 hover:scale-110"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium transition-all duration-300 hover:text-primary hover:translate-x-2 ${
                    isActive(link.path) ? "text-primary" : "text-muted-foreground"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button
                  asChild
                  variant="default"
                  size="sm"
                  className="w-full hover:scale-105 transition-all duration-300"
                >
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
