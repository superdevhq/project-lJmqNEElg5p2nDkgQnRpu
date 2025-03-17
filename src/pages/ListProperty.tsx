
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { Upload, MapPin, Home, DollarSign, Bed, Bath, Square } from "lucide-react";

// Define form validation schema
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Zip code is required"),
  propertyType: z.enum(["house", "apartment", "condo", "townhouse"]),
  status: z.enum(["for-sale", "for-rent"]),
  bedrooms: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Bedrooms must be a non-negative number",
  }),
  bathrooms: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Bathrooms must be a non-negative number",
  }),
  squareFeet: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Square feet must be a positive number",
  }),
  yearBuilt: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 1800 && Number(val) <= new Date().getFullYear(), {
    message: `Year built must be between 1800 and ${new Date().getFullYear()}`,
  }),
  amenities: z.array(z.string()).optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ListProperty = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      propertyType: "house",
      status: "for-sale",
      bedrooms: "",
      bathrooms: "",
      squareFeet: "",
      yearBuilt: "",
      amenities: [],
      agreeToTerms: false,
    },
  });

  const amenitiesList = [
    "Pool", "Spa", "Fireplace", "Garden", "Garage", 
    "Smart Home", "Waterfront", "Mountain View", "Balcony",
    "Air Conditioning", "Heating", "Washer/Dryer", "Dishwasher", "Gym",
    "Elevator", "Parking", "Security System", "Patio", "Deck"
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: FormValues) => {
    // In a real app, you would upload images and save the property data
    console.log("Form data:", data);
    console.log("Images:", images);
    
    // Show success message
    toast({
      title: "Property submitted successfully!",
      description: "Your property listing has been submitted for review.",
    });
    
    // Redirect to home page after submission
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">List Your Property</h1>
            <p className="text-muted-foreground mb-8">
              Fill out the form below to list your property on our platform.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Provide the basic details about your property.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Modern Waterfront Villa" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="propertyType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select property type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="condo">Condo</SelectItem>
                                <SelectItem value="townhouse">Townhouse</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Listing Status</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="for-sale">For Sale</SelectItem>
                                <SelectItem value="for-rent">For Rent</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" placeholder="e.g. 450000" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Enter the price in USD. For rentals, this is the monthly rent.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your property in detail..." 
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                {/* Location */}
                <Card>
                  <CardHeader>
                    <CardTitle>Location</CardTitle>
                    <CardDescription>
                      Where is your property located?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" placeholder="e.g. 123 Main Street" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Miami" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. FL" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 33101" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Property Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                    <CardDescription>
                      Provide specific details about your property.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name="bedrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bedrooms</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Bed className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="e.g. 3" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="bathrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bathrooms</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Bath className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="e.g. 2" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="squareFeet"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Square Feet</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Square className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="e.g. 2000" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="yearBuilt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year Built</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="e.g. 2010" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div>
                      <FormLabel className="block mb-3">Amenities</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {amenitiesList.map((amenity) => (
                          <FormField
                            key={amenity}
                            control={form.control}
                            name="amenities"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={amenity}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(amenity)}
                                      onCheckedChange={(checked) => {
                                        const currentValues = field.value || [];
                                        return checked
                                          ? field.onChange([...currentValues, amenity])
                                          : field.onChange(
                                              currentValues.filter(
                                                (value) => value !== amenity
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal cursor-pointer">
                                    {amenity}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Images */}
                <Card>
                  <CardHeader>
                    <CardTitle>Property Images</CardTitle>
                    <CardDescription>
                      Upload high-quality images of your property. You can upload up to 10 images.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Label htmlFor="images" className="block mb-2">Upload Images</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop your images here, or click to browse
                        </p>
                        <Input
                          id="images"
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageChange}
                          disabled={images.length >= 10}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("images")?.click()}
                          disabled={images.length >= 10}
                        >
                          Select Files
                        </Button>
                      </div>
                    </div>
                    
                    {images.length > 0 && (
                      <div>
                        <Label className="block mb-2">Selected Images ({images.length}/10)</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {images.map((image, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-md overflow-hidden border">
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`Property image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                              >
                                &times;
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Terms and Submit */}
                <Card>
                  <CardContent className="pt-6">
                    <FormField
                      control={form.control}
                      name="agreeToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-6">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the terms and conditions
                            </FormLabel>
                            <FormDescription>
                              By submitting this form, you agree to our <a href="#" className="text-primary underline">Terms of Service</a> and <a href="#" className="text-primary underline">Privacy Policy</a>.
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">
                      Submit Property Listing
                    </Button>
                  </CardContent>
                </Card>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ListProperty;
