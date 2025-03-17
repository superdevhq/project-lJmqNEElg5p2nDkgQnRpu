
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Menu, Globe, User, Plus } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  // Handle scroll effect
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  
  const isHomePage = location.pathname === "/";
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled || !isHomePage 
          ? "bg-background border-b" 
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <svg 
            viewBox="0 0 32 32" 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-primary"
            fill="currentColor"
          >
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.011l-.176.185c-2.044 2.1-4.267 3.42-6.414 3.62l-.28.023-.267.006C5.377 31 2.5 28.584 2.5 24.522l.005-.469c.026-.928.23-1.768.83-3.244l.216-.524c.966-2.298 6.083-12.989 7.707-16.034C12.537 1.963 13.992 1 16 1zm0 2c-1.239 0-2.053.539-2.987 2.21l-.523 1.008c-1.926 3.776-6.06 12.43-7.031 14.692l-.345.836c-.427 1.071-.573 1.655-.605 2.24l-.009.33v.206C4.5 27.395 6.411 29 8.857 29c1.773 0 3.87-1.236 5.831-3.354-2.295-2.938-3.855-6.45-3.855-8.91 0-2.913 1.933-5.386 5.178-5.42 3.223.034 5.156 2.507 5.156 5.42 0 2.456-1.555 5.96-3.855 8.907C19.277 27.766 21.37 29 23.142 29c2.447 0 4.358-1.605 4.358-4.478l-.004-.411c-.019-.672-.17-1.296-.714-2.62l-.248-.6c-1.065-2.478-5.993-12.768-7.538-15.664C18.053 3.539 17.24 3 16 3zm.01 10.316c-2.01.021-3.177 1.514-3.177 3.42 0 1.797 1.18 4.58 2.955 7.044l.21.287.174-.234c1.73-2.385 2.898-5.066 2.989-6.875l.006-.221c0-1.906-1.167-3.4-3.156-3.421h-.001z"/>
          </svg>
          <span className="ml-2 text-xl font-bold hidden sm:inline-block">
            stayharbor
          </span>
        </Link>
        
        {/* Search Bar */}
        <div className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 transition-all ${
          searchFocused ? "scale-110" : ""
        }`}>
          <div className="flex items-center h-12 rounded-full border shadow-sm overflow-hidden bg-background">
            <button className="px-4 h-full border-r font-medium text-sm">Anywhere</button>
            <button className="px-4 h-full border-r font-medium text-sm">Any week</button>
            <button className="px-4 h-full text-muted-foreground font-medium text-sm">Add guests</button>
            <button className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white mr-2">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Right Side Navigation */}
        <div className="flex items-center gap-2">
          <Link to="/list-property" className="hidden md:flex">
            <Button variant="ghost" className="rounded-full text-sm font-medium">
              Become a Host
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="rounded-full hidden md:flex">
            <Globe className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full flex items-center gap-2 border shadow-sm">
                <Menu className="h-4 w-4" />
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuItem className="font-medium">Sign up</DropdownMenuItem>
              <DropdownMenuItem>Log in</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link to="/list-property">
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  List your property
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Help Center</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-medium">
                  Home
                </Link>
                <Link to="/properties" className="text-lg font-medium">
                  Explore
                </Link>
                <Link to="/list-property" className="text-lg font-medium">
                  Become a Host
                </Link>
                <Link to="/map" className="text-lg font-medium">
                  Map View
                </Link>
                <div className="border-t my-4"></div>
                <Link to="/login" className="text-lg font-medium">
                  Log in
                </Link>
                <Link to="/signup" className="text-lg font-medium">
                  Sign up
                </Link>
                <Link to="/help" className="text-lg font-medium">
                  Help
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Mobile Search - Fixed at Bottom */}
      <div className="md:hidden fixed bottom-4 left-0 right-0 z-50 flex justify-center">
        <Button 
          className="h-14 px-6 rounded-full shadow-lg flex items-center gap-2 border"
          variant="default"
        >
          <Search className="h-4 w-4" />
          <span>Where to?</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
