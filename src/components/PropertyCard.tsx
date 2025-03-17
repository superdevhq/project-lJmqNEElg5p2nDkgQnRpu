
import { Link } from "react-router-dom";
import { Property } from "@/data/properties";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin } from "lucide-react";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return property.status === "for-rent"
      ? `$${price.toLocaleString()}/mo`
      : `$${price.toLocaleString()}`;
  };

  return (
    <Link to={`/property/${property.id}`}>
      <Card className="overflow-hidden property-card h-full">
        <div className="relative">
          <img
            src={property.images[0]}
            alt={property.title}
            className="h-48 w-full object-cover"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge variant="default" className="bg-primary text-white">
              {property.status === "for-rent" ? "For Rent" : "For Sale"}
            </Badge>
            {property.featured && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                Featured
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
          <div className="flex items-center text-muted-foreground text-sm mt-1 mb-2">
            <MapPin size={14} className="mr-1" />
            <span className="line-clamp-1">{property.address}</span>
          </div>
          <p className="font-bold text-lg text-primary mb-3">
            {formatPrice(property.price)}
          </p>
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <Bed size={16} className="mr-1" />
              <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
            <div className="flex items-center">
              <Bath size={16} className="mr-1" />
              <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
            <div className="flex items-center">
              <Square size={16} className="mr-1" />
              <span>{property.squareFeet.toLocaleString()} ft²</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
