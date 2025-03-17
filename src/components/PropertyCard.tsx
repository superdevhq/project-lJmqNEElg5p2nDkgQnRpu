
import { Link } from "react-router-dom";
import { Property } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return property.status === "for-rent"
      ? `$${price.toLocaleString()} night`
      : `$${price.toLocaleString()}`;
  };

  // Generate a random rating between 4.5 and 5.0
  const rating = (4.5 + Math.random() * 0.5).toFixed(2);
  
  return (
    <Link to={`/property/${property.id}`} className="block">
      <div className="property-card">
        <div className="relative">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full rounded-xl"
          />
          {property.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="default" className="bg-white text-black font-medium">
                {property.status === "for-rent" ? "Superhost" : "Featured"}
              </Badge>
            </div>
          )}
          <button 
            className="absolute top-3 right-3 text-white hover:text-primary transition-colors"
            aria-label="Save to wishlist"
          >
            <svg viewBox="0 0 32 32" className="h-7 w-7 stroke-[1.5] fill-transparent stroke-white">
              <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
            </svg>
          </button>
        </div>
        <div className="mt-3">
          <div className="flex justify-between">
            <h3 className="font-medium text-base line-clamp-1">{property.title}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-current mr-1" />
              <span>{rating}</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            {property.city || property.address.split(',')[1]?.trim()}
          </p>
          <p className="text-muted-foreground text-sm">
            {property.type === "house" ? "Entire home" : 
             property.type === "apartment" ? "Entire apartment" :
             property.type === "condo" ? "Entire condo" : "Entire townhouse"}
          </p>
          <p className="mt-1">
            <span className="font-medium">{formatPrice(property.price)}</span>
            {property.status === "for-sale" && (
              <Badge variant="outline" className="ml-2 text-xs">For Sale</Badge>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
