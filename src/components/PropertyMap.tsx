
import { useEffect, useRef } from "react";
import { Property } from "@/data/properties";
import { Card, CardContent } from "@/components/ui/card";

interface PropertyMapProps {
  properties: Property[];
  selectedProperty?: string;
  onSelectProperty?: (id: string) => void;
  className?: string;
}

const PropertyMap = ({ 
  properties, 
  selectedProperty, 
  onSelectProperty,
  className = ""
}: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    // This is a mock implementation since we don't have actual Google Maps API
    // In a real implementation, you would load the Google Maps API and create a map
    
    const initMap = () => {
      if (!mapRef.current) return;
      
      // For demonstration purposes only - in a real app, you would use the actual Google Maps API
      console.log("Map initialized with properties:", properties);
      
      // Mock implementation to show what would happen
      const mapElement = mapRef.current;
      mapElement.innerHTML = `
        <div class="flex items-center justify-center h-full bg-muted rounded-lg">
          <div class="text-center p-4">
            <h3 class="font-medium">Interactive Map</h3>
            <p class="text-sm text-muted-foreground mt-2">
              This is a placeholder for the Google Maps integration.<br/>
              In a real implementation, this would show ${properties.length} property markers.
            </p>
            <div class="mt-4 grid grid-cols-2 gap-2 text-xs">
              ${properties.slice(0, 4).map(p => `
                <div class="bg-background p-2 rounded border cursor-pointer hover:border-primary"
                     onclick="window.selectProperty('${p.id}')">
                  ${p.title.substring(0, 20)}...
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
      
      // Add a global function to handle marker clicks
      window.selectProperty = (id: string) => {
        if (onSelectProperty) {
          onSelectProperty(id);
        }
      };
    };

    initMap();

    // Cleanup function
    return () => {
      delete window.selectProperty;
    };
  }, [properties]);

  // Update selected property marker
  useEffect(() => {
    if (selectedProperty) {
      console.log("Selected property on map:", selectedProperty);
    }
  }, [selectedProperty]);

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div ref={mapRef} className="map-container" />
      </CardContent>
    </Card>
  );
};

// Add the global function type
declare global {
  interface Window {
    selectProperty: (id: string) => void;
  }
}

export default PropertyMap;
