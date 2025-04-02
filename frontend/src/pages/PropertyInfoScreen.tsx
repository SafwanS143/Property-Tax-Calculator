"use client";
import { PropertySearchBarAndResults } from "@/components/SearchBarProperties";
import { SearchBarAndResults } from "@/components/SearchBarAndResults";
import { SearchButton } from "@/components/SearchButton";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { WelcomeLayout } from "@/components/WelcomeLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { useSearchParams } from "next/navigation";
import "../styles/globals.css";

const PropertyInfoScreen = () => {
  const searchParams = useSearchParams();
  const rollNumber = searchParams?.get("rollNumber");
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState<number | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [propertySearchTerm, setPropertySearchTerm] = useState<string>("");

  const router = useRouter();

  const handleSetMunicipalityId = (id: number | null) => {
    setSelectedMunicipalityId(id);
    setSelectedPropertyId(null);
    setPropertySearchTerm("");
  };

  const handleSetPropertyId = (id: number | null) => {
    setSelectedPropertyId(id);
  };

  const handleSearch = () => {
    console.log("Property search initiated with ID:", selectedPropertyId);
    if (selectedPropertyId) {
      console.log("Property search initiated with ID:", selectedPropertyId);
      router.push('/PropertyInfoScreen');
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/3 h-full bg-black rounded-r-2xl p-6 overflow-visible" style={{ position: "relative" }}>
        <img 
          src="/ontarioLogoClear.png" 
          alt="Ontario Logo"
          className="max-w-[150px] h-auto mb-12"
        />
        
        {/* Container with fixed height to ensure visibility */}
        <div style={{ position: "absolute", top: "150px", left: "40px", width: "calc(100% - 80px)", height: "400px" }}>
          {/* Municipality search with pointer-events to ensure clicks work */}
          <div style={{ position: "absolute", top: "0px", width: "100%", zIndex: 30, pointerEvents: "auto" }}>
            <SearchBarAndResults 
              setSelectedMunicipalityId={handleSetMunicipalityId} 
              labelWhite={true} 
            />
          </div>
          
          {/* Property search with pointer-events to ensure clicks work */}
          <div style={{ position: "absolute", top: "150px", width: "100%", zIndex: 20, pointerEvents: "auto" }}>
            <PropertySearchBarAndResults
              selectedMunicipalityId={selectedMunicipalityId}
              setSelectedPropertyId={handleSetPropertyId}
              selectedPropertyId={selectedPropertyId}
              searchTerm={propertySearchTerm} 
              setSearchTerm={setPropertySearchTerm}
              labelWhite={true}
            />
          </div>
          
          {/* Button with pointer-events to ensure clicks work */}
          <div style={{ position: "absolute", top: "300px", width: "100%", zIndex: 10, pointerEvents: "auto" }}>
            <SearchButton 
              rollNumber={selectedPropertyId} 
              onSearch={handleSearch}
              labelWhite={true}
            />
          </div>
        </div>
      </div>
      
      <div className="w-2/3 h-full bg-gray-100 p-6">
        
      </div>
    </div>
  );
};

export default PropertyInfoScreen;