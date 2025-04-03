"use client";
import { PropertySearchBarAndResults } from "@/components/SearchBarProperties";
import { SearchBarAndResults } from "@/components/SearchBarAndResults";
import { SearchButton } from "@/components/SearchButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import "../styles/globals.css";
import PieChart from "@/components/PieChart";
import DeletePropertyButton from "@/components/DeleteButton";
import AddPropertyButton from "@/components/AddEditProperty"; // Import AddPropertyButton

interface PropertyDetails {
  rollNumber?: string;
  assessment_value: number;
  municipal_id: number;
}

interface MunicipalityDetails {
  municipal_name: string;
  municipal_rate: number;
  education_rate: number;
}

const PropertyInfoScreen = () => {
  const searchParams = useSearchParams();
  const rollNumber = searchParams?.get("rollNumber");
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState<number | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [propertySearchTerm, setPropertySearchTerm] = useState<string>("");

  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails | null>(null);
  const [municipalityDetails, setMunicipalityDetails] = useState<MunicipalityDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteButton, setShowDeleteButton] = useState(true); // Track visibility of delete button
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (rollNumber) {
          const propertyResponse = await fetch(`http://127.0.0.1:5000/properties/${rollNumber}`);
          if (!propertyResponse.ok) throw new Error("Property not found");
          const propertyData = await propertyResponse.json();

          const municipalityResponse = await fetch(`http://127.0.0.1:5000/municipalities/${propertyData.municipal_id}`);
          if (!municipalityResponse.ok) throw new Error("Municipality not found");
          const municipalityData = await municipalityResponse.json();

          setPropertyDetails({
            assessment_value: propertyData.assessment_value,
            municipal_id: propertyData.municipal_id
          });

          setMunicipalityDetails({
            municipal_name: municipalityData.municipal_name,
            municipal_rate: municipalityData.municipal_rate,
            education_rate: municipalityData.education_rate
          });``
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rollNumber]);

  // Factor out the calculations
  const municipalTax = propertyDetails && municipalityDetails
    ? (propertyDetails.assessment_value * municipalityDetails.municipal_rate).toFixed(2)
    : "0.00";

  const educationTax = propertyDetails && municipalityDetails
    ? (propertyDetails.assessment_value * municipalityDetails.education_rate).toFixed(2)
    : "0.00";

  const handleSetMunicipalityId = (id: number | null) => {
    setSelectedMunicipalityId(id);
    setSelectedPropertyId(null);
    setPropertySearchTerm("");
  };

  const handleSetPropertyId = (id: number | null) => {
    setSelectedPropertyId(id);
  };

  const handleSearch = () => {
    if (selectedPropertyId) {
      router.push(`/PropertyInfoScreen?rollNumber=${selectedPropertyId}`);
    }
  };

  // Handle adding or editing a property
  const handleAddOrEdit = async (assessmentValue: number, municipalId: number, rollNumberFunction?: number) => {
    try {
      setShowDeleteButton(false); // Hide the delete button when adding/editing
  
      let response;
  
      // If rollNumber is provided, add a new property with that rollNumber
      if (rollNumberFunction) {
        response = await fetch("http://127.0.0.1:5000/properties", {
          method: "POST",
          body: JSON.stringify({
            assessment_roll_number: rollNumberFunction, 
            assessment_value: assessmentValue,
            municipal_id: municipalId
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
  
        if (!response.ok) throw new Error("Failed to add property");
        alert("Property added successfully!");
  
        // Navigate to the newly added property’s details
        router.push(`/`);
      } else {
        // If no rollNumber is provided, update the existing property using selectedPropertyId
        const currentRollNumber = rollNumber; // This is always defined
  
        response = await fetch(`http://127.0.0.1:5000/properties/${currentRollNumber}`, {
          method: "PUT",
          body: JSON.stringify({
            assessment_value: assessmentValue,
            municipal_id: municipalId
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
  
        if (!response.ok) throw new Error("Failed to update property");
        alert("Property updated successfully!");
  
        // Navigate to the updated property’s details
        router.push(`/PropertyInfoScreen?rollNumber=${currentRollNumber}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add/update property");
    }
  };
  
  
  

  // Handle cancelling the form
  const handleCancel = () => {
    setShowDeleteButton(true); // Show the delete button again when the form is canceled
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left panel - unchanged */}
      <div className="w-1/3 h-full bg-black rounded-r-2xl p-6 overflow-visible" style={{ position: "relative" }}>
        <img 
          src="/next.png" 
          alt="Ontario Logo"
          className="max-w-[150px] h-auto mb-12"
        />
        
        <div style={{ position: "absolute", top: "150px", left: "40px", width: "calc(100% - 80px)", height: "400px" }}>
          <div style={{ position: "absolute", top: "0px", width: "100%", zIndex: 30, pointerEvents: "auto" }}>
            <SearchBarAndResults 
              setSelectedMunicipalityId={handleSetMunicipalityId}
              labelWhite={true} 
            />
          </div>
          
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
          
          <div style={{ position: "absolute", top: "300px", width: "100%", zIndex: 10, pointerEvents: "auto" }}>
            <SearchButton 
              rollNumber={selectedPropertyId} 
              onSearch={handleSearch}
              labelWhite={true}
            />
          </div>

          {showDeleteButton && (
            <div style={{ position: "absolute", bottom: "-60px", right: "20px", zIndex: 40 }}>
              <DeletePropertyButton rollNumber={Number(rollNumber)} />
            </div>
          )}

          {/* Add Property Button */}
          <div style={{ position: "absolute", bottom: "0px", right: "20px", zIndex: 30 }}>
            <AddPropertyButton 
              onAddOrUpdateProperty={handleAddOrEdit} 
              onCancel={handleCancel} // Pass the cancel handler
            />
          </div>
        </div>
      </div>
      
      {/* Right panel with fixed spacing */}
      <div className="flex-1 h-full bg-gray-100" style={{ paddingLeft: "48px", paddingRight: "24px", paddingTop: "24px", paddingBottom: "24px" }}>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-600">Loading property details...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-red-500">{error}</p>
          </div>
        ) : municipalityDetails && propertyDetails ? (
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Roll Number: {rollNumber}</h2>

            <div className="space-y-7 ml-6">
              <div>
                <p className="text-gray-600 font-medium">Municipality Name</p>
                <p className="text-lg">
                  {municipalityDetails.municipal_name.replace(/(Tp|T|C|M)$/, (match) => {
                    switch (match) {
                      case "Tp":
                        return " (Township)";
                      case "T":
                        return " (Town)";
                      case "C":
                        return " (City)";
                      case "M":
                        return " (Municipality)";
                      default:
                        return match;
                    }
                  })} [{propertyDetails?.municipal_id}]
                </p>
              </div>

              <div>
                <p className="text-gray-600 font-medium">Municipal Tax and Rate</p>
                <p className="text-lg font-semibold text-blue-600">
                  ${municipalTax} ({(municipalityDetails.municipal_rate * 100).toFixed(3)}%)
                </p>
              </div>

              <div>
                <p className="text-gray-600 font-medium">Education Tax and Rate</p>
                <p className="text-lg font-semibold text-green-600">
                  ${educationTax} ({(municipalityDetails.education_rate * 100).toFixed(3)}%)
                </p>
              </div>

              <div>
                <p className="text-gray-600 font-medium">Assessment Value</p>
                <p className="text-lg font-semibold text-gray-800">
                  ${propertyDetails.assessment_value.toLocaleString()}
                </p>
              </div>

              <div>
                <PieChart 
                  municipalTax={parseFloat(municipalTax)} 
                  educationTax={parseFloat(educationTax)} 
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PropertyInfoScreen;
