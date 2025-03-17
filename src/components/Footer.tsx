
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-base font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-sm text-foreground hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/aircover" className="text-sm text-foreground hover:underline">
                  AirCover
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-sm text-foreground hover:underline">
                  Safety information
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-sm text-foreground hover:underline">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link to="/cancellation" className="text-sm text-foreground hover:underline">
                  Cancellation options
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Community</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/disaster-relief" className="text-sm text-foreground hover:underline">
                  Disaster relief
                </Link>
              </li>
              <li>
                <Link to="/combating-discrimination" className="text-sm text-foreground hover:underline">
                  Combating discrimination
                </Link>
              </li>
              <li>
                <Link to="/referrals" className="text-sm text-foreground hover:underline">
                  Refer a host
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Hosting</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/list-property" className="text-sm text-foreground hover:underline">
                  List your property
                </Link>
              </li>
              <li>
                <Link to="/hosting-resources" className="text-sm text-foreground hover:underline">
                  Hosting resources
                </Link>
              </li>
              <li>
                <Link to="/community-forum" className="text-sm text-foreground hover:underline">
                  Community forum
                </Link>
              </li>
              <li>
                <Link to="/hosting-responsibly" className="text-sm text-foreground hover:underline">
                  Host responsibly
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">StayHarbor</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/newsroom" className="text-sm text-foreground hover:underline">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link to="/new-features" className="text-sm text-foreground hover:underline">
                  New features
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-foreground hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/investors" className="text-sm text-foreground hover:underline">
                  Investors
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <p className="text-sm">
              © {currentYear} StayHarbor, Inc.
            </p>
            <div className="hidden md:flex text-sm">·</div>
            <Link to="/privacy" className="text-sm hover:underline">
              Privacy
            </Link>
            <div className="hidden md:flex text-sm">·</div>
            <Link to="/terms" className="text-sm hover:underline">
              Terms
            </Link>
            <div className="hidden md:flex text-sm">·</div>
            <Link to="/sitemap" className="text-sm hover:underline">
              Sitemap
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center text-sm font-medium">
              <Globe className="h-4 w-4 mr-2" />
              English (US)
            </button>
            <button className="text-sm font-medium">
              $ USD
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
