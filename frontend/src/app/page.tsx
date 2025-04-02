"use client";
import { PropertySearchBarAndResults } from "@/components/SearchBarProperties";
import { SearchBarAndResults } from "@/components/SearchBarAndResults";
import { SearchButton } from "@/components/SearchButton";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { WelcomeLayout } from "@/components/WelcomeLayout";
import { useRouter } from "next/navigation";


export default function Home() {
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState<number | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [propertySearchTerm, setPropertySearchTerm] = useState<string>(""); // New state for search term

  const router = useRouter();

  const handleSetMunicipalityId = (id: number | null) => {
    setSelectedMunicipalityId(id);
    setSelectedPropertyId(null); // Reset property ID when municipality changes
    setPropertySearchTerm(""); // Reset property search term
  };

  const handleSetPropertyId = (id: number | null) => {
    setSelectedPropertyId(id);
  };

  const handleSearch = () => {
    console.log("Property search initiated with ID:", selectedPropertyId);
    if (selectedPropertyId) {
      console.log("Property search initiated with ID:", selectedPropertyId);
      router.push(`/PropertyInfoScreen?rollNumber=${selectedPropertyId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-visible">
      <PageHeader />
      <WelcomeLayout />
      <div className="flex items-start justify-center px-4 space-x-2 mb-64 relative">
        <div className="w-1/3 relative z-10">
          <SearchBarAndResults setSelectedMunicipalityId={handleSetMunicipalityId} />
        </div>
        <div className="w-1/3 relative z-10">
        <PropertySearchBarAndResults 
          selectedMunicipalityId={selectedMunicipalityId}
          setSelectedPropertyId={handleSetPropertyId}
          selectedPropertyId={selectedPropertyId} // Pass selected property ID
          searchTerm={propertySearchTerm} 
          setSearchTerm={setPropertySearchTerm}
        />
        </div>
        <div className="w-1/5 h-30px relative z-10" style={{ marginTop: "1.25rem" }}>
          <SearchButton 
            rollNumber={selectedPropertyId} 
            onSearch={handleSearch} 
          />
        </div>
      </div>
    </div>
  );
}
