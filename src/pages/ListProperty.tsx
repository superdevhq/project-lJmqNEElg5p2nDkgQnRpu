
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
import { Upload, MapPin, Home, DollarSign, Bed, Bath, Square, ArrowLeft } from "lucide-react";

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
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
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
      status: "for-rent",
      bedrooms: "",
      bathrooms: "",
      squareFeet: "",
      yearBuilt: "",
      amenities: [],
      agreeToTerms: false,
    },
  });

  const amenitiesList = [
    "Wifi", "Free parking", "Kitchen", "Washer", "Dryer", "Air conditioning", 
    "Heating", "Dedicated workspace", "TV", "Hair dryer", "Iron",
    "Pool", "Hot tub", "Patio", "BBQ grill", "Fire pit", "Gym", 
    "Beach access", "Lake access", "Ski-in/out", "Waterfront", "Mountain view"
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

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: FormValues) => {
    // In a real app, you would upload images and save the property data
    console.log("Form data:", data);
    console.log("Images:", images);
    
    // Show success message
    toast({
      title: "Your listing has been created!",
      description: "We'll notify you when it's published.",
    });
    
    // Redirect to home page after submission
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-medium">Tell us about your place</h2>
              <p className="text-muted-foreground">
                Share some basic info, like the location and how many guests can stay.
              </p>
            </div>
            
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What type of property are you listing?</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-14">
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
                  <FormLabel>Are you listing this property for rent or for sale?</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-14">
                        <SelectValue placeholder="Select listing type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="for-rent">For Rent</SelectItem>
                      <SelectItem value="for-sale">For Sale</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Bed className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input className="pl-10 h-14" placeholder="e.g. 3" {...field} />
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
                        <Bath className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input className="pl-10 h-14" placeholder="e.g. 2" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-medium">Where's your place located?</h2>
              <p className="text-muted-foreground">
                Your address is only shared with guests after they've made a reservation.
              </p>
            </div>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input className="pl-10 h-14" placeholder="e.g. 123 Main Street" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input className="h-14" placeholder="e.g. Miami" {...field} />
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
                      <Input className="h-14" placeholder="e.g. FL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input className="h-14" placeholder="e.g. 33101" {...field} />
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
                        <Home className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input className="pl-10 h-14" placeholder="e.g. 2010" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="squareFeet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Square Feet</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Square className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input className="pl-10 h-14" placeholder="e.g. 2000" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-medium">Tell guests about your place</h2>
              <p className="text-muted-foreground">
                Share what makes your place special and set the right expectations.
              </p>
            </div>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Create your title</FormLabel>
                  <FormControl>
                    <Input 
                      className="h-14" 
                      placeholder="e.g. Stunning Beachfront Villa with Ocean Views" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    A great title is short, descriptive, and highlights key features.
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
                  <FormLabel>Create your description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your property in detail..." 
                      className="min-h-32 resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Tell potential guests what you love about your space and what makes it unique.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {form.getValues("status") === "for-rent" 
                      ? "How much do you want to charge per night?" 
                      : "What is the selling price?"}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input 
                        className="pl-10 h-14" 
                        placeholder={form.getValues("status") === "for-rent" ? "e.g. 150" : "e.g. 450000"} 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    {form.getValues("status") === "for-rent" 
                      ? "Set a competitive price based on similar listings in your area." 
                      : "Set a competitive price based on the current real estate market."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel className="block mb-3">What amenities do you offer?</FormLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {amenitiesList.map((amenity) => (
                  <FormField
                    key={amenity}
                    control={form.control}
                    name="amenities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={amenity}
                          className="flex items-center space-x-3 space-y-0 rounded-md border p-3"
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
              <FormMessage />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-medium">Add some photos of your place</h2>
              <p className="text-muted-foreground">
                Upload at least 5 photos to show guests what your place looks like.
              </p>
            </div>
            
            <div className="mb-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors">
                <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
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
                  className="rounded-full"
                >
                  Upload from your device
                </Button>
              </div>
            </div>
            
            {images.length > 0 && (
              <div>
                <Label className="block mb-3">Selected Images ({images.length}/10)</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group aspect-square rounded-xl overflow-hidden">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Property image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        &times;
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-8">
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
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8 bg-background">
        <div className="container max-w-3xl">
          <div className="mb-8">
            <button 
              onClick={() => currentStep > 1 ? prevStep() : navigate("/")}
              className="flex items-center text-sm font-medium hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {currentStep > 1 ? "Back" : "Exit"}
            </button>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {renderStepContent()}
              
              <div className="flex justify-between pt-4 border-t">
                {currentStep > 1 ? (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevStep}
                    className="rounded-full"
                  >
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < totalSteps ? (
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    className="rounded-full"
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    className="rounded-full"
                  >
                    Publish your listing
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ListProperty;
