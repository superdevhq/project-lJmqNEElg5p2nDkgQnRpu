
import { useState } from "react";
import { Link } from "react-router-dom";
import { properties } from "@/data/properties";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyCategories from "@/components/PropertyCategories";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Filter properties based on selected category (mock implementation)
  // In a real app, you would have proper category data
  const filteredProperties = properties.filter(property => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "beachfront" && property.amenities.includes("Waterfront")) return true;
    if (selectedCategory === "mountain" && property.amenities.includes("Mountain View")) return true;
    if (selectedCategory === "apartment" && property.type === "apartment") return true;
    if (selectedCategory === "trending" && property.featured) return true;
    return false;
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop" 
            alt="Beautiful destination" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
        </div>
        
        <div className="container relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Find your place anywhere</h1>
            <p className="text-xl mb-8 text-white/90">
              Discover the perfect stay for your next adventure
            </p>
            
            <Button 
              size="lg" 
              className="rounded-full text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            >
              Explore nearby stays
            </Button>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <PropertyCategories onSelectCategory={setSelectedCategory} />
      
      {/* Properties Grid */}
      <section className="py-8 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-6">
                Try changing your search criteria or explore other categories
              </p>
              <Button 
                onClick={() => setSelectedCategory("all")}
                className="rounded-full"
              >
                View all properties
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Inspiration Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-semibold mb-8">Inspiration for your next trip</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                city: "Miami",
                image: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?q=80&w=1974&auto=format&fit=crop",
                distance: "2 hour drive"
              },
              {
                city: "Aspen",
                image: "https://images.unsplash.com/photo-1542384557-0824d90731ee?q=80&w=1974&auto=format&fit=crop",
                distance: "4 hour drive"
              },
              {
                city: "San Diego",
                image: "https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?q=80&w=1974&auto=format&fit=crop",
                distance: "5 hour drive"
              },
              {
                city: "New York",
                image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1974&auto=format&fit=crop",
                distance: "6 hour drive"
              }
            ].map((location, index) => (
              <Link to={`/properties?location=${location.city}`} key={index} className="group">
                <div className="rounded-xl overflow-hidden">
                  <div className="h-60 overflow-hidden">
                    <img 
                      src={location.image} 
                      alt={location.city} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 bg-background rounded-b-xl">
                    <h3 className="font-medium text-lg">{location.city}</h3>
                    <p className="text-muted-foreground">{location.distance}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Host Banner */}
      <section className="py-16 relative">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
            alt="Hosting" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-lg text-white">
            <h2 className="text-4xl font-bold mb-4">Become a Host</h2>
            <p className="text-xl mb-8">
              Earn extra income and unlock new opportunities by sharing your space.
            </p>
            <Link to="/list-property">
              <Button 
                size="lg" 
                className="rounded-full bg-white text-black hover:bg-white/90"
              >
                Learn more
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Experiences Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-2xl font-semibold mb-8">Discover experiences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1974&auto=format&fit=crop" 
                alt="Things to do on your trip" 
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Things to do on your trip</h3>
                <Button 
                  className="w-fit rounded-full bg-white text-black hover:bg-white/90"
                >
                  Experiences
                </Button>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1974&auto=format&fit=crop" 
                alt="Things to do from home" 
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Things to do from home</h3>
                <Button 
                  className="w-fit rounded-full bg-white text-black hover:bg-white/90"
                >
                  Online Experiences
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
