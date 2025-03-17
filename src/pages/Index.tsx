
import { useState } from "react";
import { Link } from "react-router-dom";
import { properties } from "@/data/properties";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyMap from "@/components/PropertyMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, MapPin, Home, Building, ArrowRight } from "lucide-react";

const Index = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  
  // Get featured properties
  const featuredProperties = properties.filter(property => property.featured);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop" 
            alt="Luxury home" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Home</h1>
            <p className="text-xl mb-8 text-white/90">
              Discover the perfect property that matches your lifestyle and preferences.
            </p>
            
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Enter location" 
                    className="pl-10"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                
                <div className="w-full md:w-48">
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
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
                
                <Button className="md:w-auto">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Properties Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Properties</h2>
              <p className="text-muted-foreground mt-2">Explore our handpicked selection of premium properties</p>
            </div>
            <Link to="/properties">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Explore Properties on the Map</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Find properties in your desired location and get a better understanding of the neighborhood
            </p>
          </div>
          
          <PropertyMap properties={properties} className="shadow-lg" />
          
          <div className="mt-8 text-center">
            <Link to="/map">
              <Button>
                Open Full Map View
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Property Types Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Browse by Property Type</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Explore different types of properties to find what suits your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/properties?type=house" className="group">
              <div className="relative rounded-lg overflow-hidden h-64 shadow-md transition-all group-hover:shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop" 
                  alt="Houses" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <Home className="text-white mb-2 h-6 w-6" />
                  <h3 className="text-xl font-bold text-white">Houses</h3>
                  <p className="text-white/80 text-sm">Find your perfect family home</p>
                </div>
              </div>
            </Link>
            
            <Link to="/properties?type=apartment" className="group">
              <div className="relative rounded-lg overflow-hidden h-64 shadow-md transition-all group-hover:shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop" 
                  alt="Apartments" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <Building className="text-white mb-2 h-6 w-6" />
                  <h3 className="text-xl font-bold text-white">Apartments</h3>
                  <p className="text-white/80 text-sm">Modern urban living spaces</p>
                </div>
              </div>
            </Link>
            
            <Link to="/properties?type=condo" className="group">
              <div className="relative rounded-lg overflow-hidden h-64 shadow-md transition-all group-hover:shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop" 
                  alt="Condos" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <Building className="text-white mb-2 h-6 w-6" />
                  <h3 className="text-xl font-bold text-white">Condos</h3>
                  <p className="text-white/80 text-sm">Luxury with amenities</p>
                </div>
              </div>
            </Link>
            
            <Link to="/properties?type=townhouse" className="group">
              <div className="relative rounded-lg overflow-hidden h-64 shadow-md transition-all group-hover:shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop" 
                  alt="Townhouses" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <Home className="text-white mb-2 h-6 w-6" />
                  <h3 className="text-xl font-bold text-white">Townhouses</h3>
                  <p className="text-white/80 text-sm">The best of both worlds</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold">Ready to Find Your Dream Home?</h2>
              <p className="mt-2 text-primary-foreground/90 max-w-xl">
                Start your search now and discover the perfect property that matches your lifestyle and preferences.
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" size="lg">
                Browse Properties
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact an Agent
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
