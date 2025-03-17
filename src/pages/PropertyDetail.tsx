
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { properties } from "@/data/properties";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Bed, 
  Bath, 
  Users, 
  Calendar, 
  MapPin, 
  Star, 
  Award, 
  Share, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  Wifi,
  Car,
  Tv,
  Utensils,
  Snowflake,
  Waves
} from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  
  // Find the property by ID
  const property = properties.find(p => p.id === id);
  
  // Get similar properties (same type, excluding current)
  const similarProperties = property 
    ? properties.filter(p => p.type === property.type && p.id !== property.id).slice(0, 4)
    : [];
  
  if (!property) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container py-16 flex-1 flex items-center justify-center flex-col">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button className="rounded-full">Return to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  const formatPrice = (price: number) => {
    return property.status === "for-rent"
      ? `$${price.toLocaleString()} night`
      : `$${price.toLocaleString()}`;
  };
  
  // Generate a random rating between 4.5 and 5.0
  const rating = (4.5 + Math.random() * 0.5).toFixed(2);
  const reviewCount = Math.floor(Math.random() * 200) + 50;
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };
  
  // Mock amenities with icons
  const amenitiesWithIcons = [
    { name: "Wifi", icon: <Wifi className="h-6 w-6" /> },
    { name: "Free parking", icon: <Car className="h-6 w-6" /> },
    { name: "TV", icon: <Tv className="h-6 w-6" /> },
    { name: "Kitchen", icon: <Utensils className="h-6 w-6" /> },
    { name: "Air conditioning", icon: <Snowflake className="h-6 w-6" /> },
    { name: "Waterfront", icon: <Waves className="h-6 w-6" /> },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Property Header - Mobile */}
        <div className="md:hidden">
          <div className="relative">
            <img 
              src={property.images[currentImageIndex]} 
              alt={property.title} 
              className="w-full h-[300px] object-cover"
            />
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
              {property.images.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1.5 rounded-full ${
                    index === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Property Title - Mobile */}
        <div className="md:hidden container py-4">
          <h1 className="text-xl font-medium">{property.title}</h1>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-1 font-medium">{rating}</span>
              <span className="mx-1">·</span>
              <span className="text-muted-foreground underline">{reviewCount} reviews</span>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center text-sm font-medium">
                <Share className="h-4 w-4 mr-1" />
                Share
              </button>
              <button 
                className="flex items-center text-sm font-medium"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-4 w-4 mr-1 ${isFavorite ? "fill-primary text-primary" : ""}`} />
                Save
              </button>
            </div>
          </div>
        </div>
        
        {/* Property Images - Desktop */}
        <div className="hidden md:block container py-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-medium">{property.title}</h1>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 font-medium">{rating}</span>
                <span className="mx-1">·</span>
                <span className="text-muted-foreground underline">{reviewCount} reviews</span>
                <span className="mx-1">·</span>
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground underline ml-1">
                  {property.address.split(',')[1]?.trim()}, {property.address.split(',')[2]?.trim()}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center text-sm font-medium">
                <Share className="h-4 w-4 mr-1" />
                Share
              </button>
              <button 
                className="flex items-center text-sm font-medium"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-4 w-4 mr-1 ${isFavorite ? "fill-primary text-primary" : ""}`} />
                Save
              </button>
            </div>
          </div>
          
          <Dialog open={showAllPhotos} onOpenChange={setShowAllPhotos}>
            <div className="grid grid-cols-2 gap-3 h-[450px]">
              <div className="col-span-1 row-span-1 relative rounded-l-xl overflow-hidden">
                <img 
                  src={property.images[0]} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-1 row-span-2 grid grid-rows-2 gap-3">
                <div className="relative rounded-tr-xl overflow-hidden">
                  <img 
                    src={property.images[1] || property.images[0]} 
                    alt={property.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative rounded-br-xl overflow-hidden">
                  <img 
                    src={property.images[2] || property.images[0]} 
                    alt={property.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <DialogTrigger asChild>
                <button className="absolute bottom-4 right-4 bg-white text-black font-medium rounded-lg px-4 py-2 text-sm flex items-center">
                  <svg viewBox="0 0 16 16" className="h-4 w-4 mr-2">
                    <path d="M1.5 13.5h13V9h1v5a.5.5 0 0 1-.5.5h-14a.5.5 0 0 1-.5-.5v-5h1v4.5Z"></path>
                    <path d="M11.5 8.5V3h-7v5.5h-1v-6a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v6h-1Z"></path>
                    <path d="M10.5 6.5v-2h-5v2h-1v-3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v3h-1Z"></path>
                  </svg>
                  Show all photos
                </button>
              </DialogTrigger>
            </div>
            
            <DialogContent className="max-w-5xl w-full h-[90vh] p-0">
              <div className="p-4 flex justify-between items-center border-b">
                <button 
                  onClick={() => setShowAllPhotos(false)}
                  className="rounded-full p-2 hover:bg-muted"
                >
                  <svg viewBox="0 0 32 32" className="h-4 w-4">
                    <path d="m6 6 20 20M26 6 6 26"></path>
                  </svg>
                </button>
                <div className="flex gap-4">
                  <button className="flex items-center text-sm font-medium">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </button>
                  <button 
                    className="flex items-center text-sm font-medium"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${isFavorite ? "fill-primary text-primary" : ""}`} />
                    Save
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto h-[calc(90vh-60px)] p-4">
                <div className="grid grid-cols-2 gap-4">
                  {property.images.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`${property.title} - Image ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Main Content */}
        <div className="container pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left Column - Details */}
            <div className="md:col-span-2">
              <div className="border-b pb-6 mb-6">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-xl font-medium">
                      {property.type === "house" ? "Entire home" : 
                       property.type === "apartment" ? "Entire apartment" :
                       property.type === "condo" ? "Entire condo" : "Entire townhouse"} hosted by John
                    </h2>
                    <p className="text-muted-foreground">
                      {property.bedrooms} {property.bedrooms === 1 ? 'bedroom' : 'bedrooms'} · 
                      {property.bathrooms} {property.bathrooms === 1 ? 'bathroom' : 'bathrooms'} · 
                      {Math.floor(property.squareFeet / 100)} guests
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
                      alt="Host" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-6 mb-6">
                <div className="flex gap-4">
                  <Award className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Experienced host</h3>
                    <p className="text-sm text-muted-foreground">John has 48 reviews for other places.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Great location</h3>
                    <p className="text-sm text-muted-foreground">95% of recent guests gave the location a 5-star rating.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Free cancellation</h3>
                    <p className="text-sm text-muted-foreground">Cancel before check-in for a partial refund.</p>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="border-b pb-6 mb-6">
                <p className="whitespace-pre-line">
                  {property.description}
                </p>
              </div>
              
              {/* Amenities */}
              <div className="border-b pb-6 mb-6">
                <h2 className="text-xl font-medium mb-4">What this place offers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {amenitiesWithIcons.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-4">
                      {amenity.icon}
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-6 rounded-lg">
                  Show all {property.amenities.length} amenities
                </Button>
              </div>
              
              {/* Calendar */}
              <div className="border-b pb-6 mb-6">
                <h2 className="text-xl font-medium mb-4">
                  {property.status === "for-rent" ? "Select check-in date" : "Schedule a tour"}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {property.status === "for-rent" 
                    ? "Add your travel dates for exact pricing" 
                    : "Choose a date and time to see this property"}
                </p>
                <div className="bg-muted/30 rounded-xl p-8 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Calendar placeholder - In a real app, this would be an interactive calendar component
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Booking/Contact */}
            <div className="md:col-span-1">
              <div className="sticky top-28">
                <div className="border rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xl font-semibold">{formatPrice(property.price)}</span>
                      {property.status === "for-rent" && <span className="text-muted-foreground"> night</span>}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1">{rating}</span>
                      <span className="mx-1 text-muted-foreground">·</span>
                      <span className="text-muted-foreground underline">{reviewCount} reviews</span>
                    </div>
                  </div>
                  
                  {property.status === "for-rent" ? (
                    <div className="border rounded-lg overflow-hidden mb-4">
                      <div className="grid grid-cols-2">
                        <div className="p-3 border-r border-b">
                          <p className="text-xs font-medium">CHECK-IN</p>
                          <p>Add date</p>
                        </div>
                        <div className="p-3 border-b">
                          <p className="text-xs font-medium">CHECKOUT</p>
                          <p>Add date</p>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-medium">GUESTS</p>
                        <div className="flex justify-between items-center">
                          <p>1 guest</p>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border rounded-lg overflow-hidden mb-4">
                      <div className="p-3">
                        <p className="text-xs font-medium">CONTACT AGENT</p>
                        <div className="flex justify-between items-center">
                          <p>Schedule a viewing</p>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Button className="w-full rounded-lg mb-4">
                    {property.status === "for-rent" ? "Reserve" : "Contact Agent"}
                  </Button>
                  
                  {property.status === "for-rent" && (
                    <p className="text-center text-sm text-muted-foreground mb-4">
                      You won't be charged yet
                    </p>
                  )}
                  
                  {property.status === "for-rent" && (
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="underline">${property.price.toLocaleString()} x 5 nights</span>
                        <span>${(property.price * 5).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="underline">Cleaning fee</span>
                        <span>$150</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="underline">Service fee</span>
                        <span>$210</span>
                      </div>
                      <div className="border-t pt-4 flex justify-between font-semibold">
                        <span>Total before taxes</span>
                        <span>${(property.price * 5 + 150 + 210).toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {property.status === "for-sale" && (
                  <div className="mt-4 p-4 border rounded-xl">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{property.address}</span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <Bed className="h-4 w-4 mb-1" />
                        <span>{property.bedrooms} bd</span>
                      </div>
                      <div>
                        <Bath className="h-4 w-4 mb-1" />
                        <span>{property.bathrooms} ba</span>
                      </div>
                      <div>
                        <Users className="h-4 w-4 mb-1" />
                        <span>{property.squareFeet.toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="border-t pt-8 mt-8">
            <h2 className="text-xl font-medium mb-4">Where you'll be</h2>
            <div className="h-[400px] rounded-xl bg-muted/30 flex items-center justify-center mb-4">
              <div className="text-center p-4">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Map placeholder - In a real app, this would be an interactive map showing the property location
                </p>
              </div>
            </div>
            <p className="text-muted-foreground">
              {property.address.split(',')[1]?.trim()}, {property.address.split(',')[2]?.trim()}
            </p>
          </div>
          
          {/* Similar Properties */}
          <div className="border-t pt-8 mt-8">
            <h2 className="text-xl font-medium mb-6">More places to stay</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {similarProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
