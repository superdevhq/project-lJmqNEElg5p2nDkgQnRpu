
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Slider 
} from "@/components/ui/slider";
import { 
  Button 
} from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  Checkbox 
} from "@/components/ui/checkbox";
import { 
  Label 
} from "@/components/ui/label";
import { 
  ChevronDown, 
  Search, 
  X 
} from "lucide-react";

interface PropertyFiltersProps {
  className?: string;
  onFilterChange?: (filters: Record<string, any>) => void;
}

const PropertyFilters = ({ className = "", onFilterChange }: PropertyFiltersProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize filters from URL params or defaults
  const [filters, setFilters] = useState({
    status: searchParams.get("status") || "all",
    type: searchParams.get("type") || "all",
    minPrice: Number(searchParams.get("minPrice")) || 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 5000000,
    beds: Number(searchParams.get("beds")) || 0,
    baths: Number(searchParams.get("baths")) || 0,
    amenities: searchParams.getAll("amenities") || [],
  });

  const amenitiesList = [
    "Pool", "Spa", "Fireplace", "Garden", "Garage", 
    "Smart Home", "Waterfront", "Mountain View", "Balcony"
  ];

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    
    handleFilterChange("amenities", newAmenities);
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (filters.status !== "all") params.set("status", filters.status);
    if (filters.type !== "all") params.set("type", filters.type);
    if (filters.minPrice > 0) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice < 5000000) params.set("maxPrice", filters.maxPrice.toString());
    if (filters.beds > 0) params.set("beds", filters.beds.toString());
    if (filters.baths > 0) params.set("baths", filters.baths.toString());
    
    filters.amenities.forEach(amenity => {
      params.append("amenities", amenity);
    });
    
    navigate({ pathname: "/properties", search: params.toString() });
  };

  const resetFilters = () => {
    setFilters({
      status: "all",
      type: "all",
      minPrice: 0,
      maxPrice: 5000000,
      beds: 0,
      baths: 0,
      amenities: [],
    });
    
    navigate("/properties");
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="w-full sm:w-auto flex-1">
              <Label htmlFor="status">Status</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange("status", value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="for-sale">For Sale</SelectItem>
                  <SelectItem value="for-rent">For Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-auto flex-1">
              <Label htmlFor="type">Property Type</Label>
              <Select
                value={filters.type}
                onValueChange={(value) => handleFilterChange("type", value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-auto flex-1">
              <Label htmlFor="beds">Bedrooms</Label>
              <Select
                value={filters.beds.toString()}
                onValueChange={(value) => handleFilterChange("beds", Number(value))}
              >
                <SelectTrigger id="beds">
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-auto flex-1">
              <Label htmlFor="baths">Bathrooms</Label>
              <Select
                value={filters.baths.toString()}
                onValueChange={(value) => handleFilterChange("baths", Number(value))}
              >
                <SelectTrigger id="baths">
                  <SelectValue placeholder="Bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label>Price Range</Label>
              <span className="text-sm text-muted-foreground">
                {formatPrice(filters.minPrice)} - {formatPrice(filters.maxPrice)}
              </span>
            </div>
            <Slider
              defaultValue={[filters.minPrice, filters.maxPrice]}
              max={5000000}
              step={50000}
              onValueChange={(value) => {
                handleFilterChange("minPrice", value[0]);
                handleFilterChange("maxPrice", value[1]);
              }}
              className="my-4"
            />
          </div>
          
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex items-center justify-between w-full p-0 h-auto">
                <span className="font-medium">More Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {amenitiesList.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`amenity-${amenity}`} 
                      checked={filters.amenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityToggle(amenity)}
                    />
                    <Label htmlFor={`amenity-${amenity}`} className="text-sm cursor-pointer">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="flex gap-2 pt-2">
            <Button onClick={applyFilters} className="flex-1">
              <Search className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
            <Button variant="outline" onClick={resetFilters} className="flex-none">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyFilters;
