
import { useState } from "react";
import { 
  Home, 
  Building, 
  Waves, 
  Mountain, 
  Trees, 
  Tent, 
  Castle, 
  Warehouse, 
  Palmtree, 
  Snowflake, 
  Flame, 
  Landmark, 
  Sailboat 
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface PropertyCategoriesProps {
  onSelectCategory?: (category: string) => void;
}

const PropertyCategories = ({ onSelectCategory }: PropertyCategoriesProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories: Category[] = [
    { id: "all", name: "All", icon: <Home className="h-5 w-5" /> },
    { id: "beachfront", name: "Beachfront", icon: <Waves className="h-5 w-5" /> },
    { id: "mountain", name: "Mountain view", icon: <Mountain className="h-5 w-5" /> },
    { id: "countryside", name: "Countryside", icon: <Trees className="h-5 w-5" /> },
    { id: "camping", name: "Camping", icon: <Tent className="h-5 w-5" /> },
    { id: "mansion", name: "Mansions", icon: <Castle className="h-5 w-5" /> },
    { id: "loft", name: "Lofts", icon: <Warehouse className="h-5 w-5" /> },
    { id: "tropical", name: "Tropical", icon: <Palmtree className="h-5 w-5" /> },
    { id: "ski-in", name: "Ski-in/out", icon: <Snowflake className="h-5 w-5" /> },
    { id: "trending", name: "Trending", icon: <Flame className="h-5 w-5" /> },
    { id: "historic", name: "Historic", icon: <Landmark className="h-5 w-5" /> },
    { id: "lakefront", name: "Lakefront", icon: <Sailboat className="h-5 w-5" /> },
    { id: "apartment", name: "Apartments", icon: <Building className="h-5 w-5" /> },
  ];
  
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
  };
  
  return (
    <div className="container py-6">
      <div className="categories-scroll">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-pill flex flex-col items-center gap-1 ${
              activeCategory === category.id ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <span className="flex items-center gap-2">
              {category.icon}
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyCategories;
