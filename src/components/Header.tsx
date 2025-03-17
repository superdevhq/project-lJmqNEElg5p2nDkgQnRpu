
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HomeHarbor</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/properties" className="text-sm font-medium hover:text-primary transition-colors">
            Properties
          </Link>
          <Link to="/map" className="text-sm font-medium hover:text-primary transition-colors">
            Map View
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
          </Button>
          
          <Link to="/list-property">
            <Button variant="default" className="hidden md:flex">
              List Property
            </Button>
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                  Home
                </Link>
                <Link to="/properties" className="text-sm font-medium hover:text-primary transition-colors">
                  Properties
                </Link>
                <Link to="/map" className="text-sm font-medium hover:text-primary transition-colors">
                  Map View
                </Link>
                <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
                  About
                </Link>
                <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link to="/list-property">
                  <Button variant="default" className="mt-4">
                    List Property
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
