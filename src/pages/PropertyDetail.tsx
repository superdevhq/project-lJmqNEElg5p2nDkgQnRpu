
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { properties } from "@/data/properties";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyMap from "@/components/PropertyMap";
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Share2, 
  Heart, 
  Check 
} from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Find the property by ID
  const property = properties.find(p => p.id === id);
  
  // Get similar properties (same type, excluding current)
  const similarProperties = property 
    ? properties.filter(p => p.type === property.type && p.id !== property.id).slice(0, 3)
    : [];
  
  if (!property) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container py-16 flex-1 flex items-center justify-center flex-col">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  const formatPrice = (price: number) => {
    return property.status === "for-rent"
      ? `$${price.toLocaleString()}/mo`
      : `$${price.toLocaleString()}`;
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Property Images Carousel */}
        <div className="bg-muted">
          <div className="container py-6">
            <Carousel className="w-full">
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-lg">
                      <img 
                        src={image} 
                        alt={`${property.title} - Image ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </div>
        
        {/* Property Header */}
        <div className="container py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{property.title}</h1>
              <div className="flex items-center text-muted-foreground mt-2">
                <MapPin size={18} className="mr-1" />
                <span>{property.address}</span>
              </div>
            </div>
            <div className="flex flex-col md:items-end">
              <div className="text-3xl font-bold text-primary">
                {formatPrice(property.price)}
              </div>
              <div className="text-muted-foreground">
                {property.status === "for-rent" ? "For Rent" : "For Sale"}
              </div>
            </div>
          </div>
          
          {/* Quick Info */}
          <div className="flex flex-wrap gap-6 mt-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center">
              <Bed size={20} className="mr-2 text-primary" />
              <div>
                <div className="font-medium">{property.bedrooms}</div>
                <div className="text-sm text-muted-foreground">Bedrooms</div>
              </div>
            </div>
            <div className="flex items-center">
              <Bath size={20} className="mr-2 text-primary" />
              <div>
                <div className="font-medium">{property.bathrooms}</div>
                <div className="text-sm text-muted-foreground">Bathrooms</div>
              </div>
            </div>
            <div className="flex items-center">
              <Square size={20} className="mr-2 text-primary" />
              <div>
                <div className="font-medium">{property.squareFeet.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Square Feet</div>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar size={20} className="mr-2 text-primary" />
              <div>
                <div className="font-medium">{property.yearBuilt}</div>
                <div className="text-sm text-muted-foreground">Year Built</div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button>Contact Agent</Button>
            <Button 
              variant="outline" 
              onClick={() => setIsFavorite(!isFavorite)}
              className={isFavorite ? "text-red-500" : ""}
            >
              <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              {isFavorite ? "Saved" : "Save"}
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="details">
                <TabsList className="mb-6">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Description</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {property.description}
                      </p>
                      
                      <h3 className="text-xl font-semibold mt-8 mb-4">Property Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Property Type</span>
                          <span className="font-medium capitalize">{property.type}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Year Built</span>
                          <span className="font-medium">{property.yearBuilt}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Status</span>
                          <span className="font-medium capitalize">
                            {property.status === "for-rent" ? "For Rent" : "For Sale"}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Square Footage</span>
                          <span className="font-medium">{property.squareFeet.toLocaleString()} sq ft</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Bedrooms</span>
                          <span className="font-medium">{property.bedrooms}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Bathrooms</span>
                          <span className="font-medium">{property.bathrooms}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="amenities">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-6">Amenities & Features</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {property.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center">
                            <Check className="h-5 w-5 mr-2 text-primary" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="map">
                  <Card>
                    <CardContent className="p-0">
                      <PropertyMap 
                        properties={[property]} 
                        selectedProperty={property.id}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Column - Contact & Similar */}
            <div>
              {/* Contact Form */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Contact Agent</h3>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-muted overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
                        alt="Agent" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">John Smith</h4>
                      <p className="text-sm text-muted-foreground">Senior Real Estate Agent</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2 text-primary" />
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <Mail size={16} className="mr-2 text-primary" />
                      <span>john.smith@example.com</span>
                    </div>
                  </div>
                  
                  <Button className="w-full">Schedule a Viewing</Button>
                </CardContent>
              </Card>
              
              {/* Similar Properties */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Similar Properties</h3>
                <div className="space-y-4">
                  {similarProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
