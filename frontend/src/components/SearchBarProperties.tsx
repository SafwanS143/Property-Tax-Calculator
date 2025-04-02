"use client";
import React, { useState, useEffect } from "react";

interface Property {
  assessment_value: number;
  assessment_roll_number: number;
  municipal_id: number;
}

interface PropertySearchBarAndResultsProps {
  selectedMunicipalityId: number | null;
  setSelectedPropertyId: (id: number | null) => void;
  selectedPropertyId: number | null; // Add this prop
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  labelWhite?: boolean; // Optional prop to make the label white
}

export const PropertySearchBarAndResults: React.FC<PropertySearchBarAndResultsProps> = ({
  selectedMunicipalityId,
  setSelectedPropertyId,
  selectedPropertyId, // Use this prop
  searchTerm,
  setSearchTerm,
  labelWhite = false, // Default is false (gray label)
}) => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  // Sync searchTerm with selected property ID
  useEffect(() => {
    if (!selectedPropertyId) {
      setSearchTerm(""); // Clear search term when property is deselected
    }
  }, [selectedPropertyId, setSearchTerm]);

  // Fetch all properties once on component mount
  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/properties");
        const data = await response.json();
        setAllProperties(data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchAllProperties();
  }, []);

  // Apply filtering logic whenever search term or selected municipality changes
  useEffect(() => {
    let filteredResults = [...allProperties];

    if (selectedMunicipalityId) {
      filteredResults = filteredResults.filter(
        (property) => property.municipal_id === selectedMunicipalityId
      );
    }

    if (searchTerm) {
      filteredResults = filteredResults.filter((property) =>
        property.assessment_roll_number.toString().includes(searchTerm)
      );
    }

    setDisplayedProperties(filteredResults);
  }, [selectedMunicipalityId, searchTerm, allProperties]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query); // Update parent-controlled search term
  };

  const handlePropertySelect = (property: Property) => {
    setSearchTerm(property.assessment_roll_number.toString()); // Show selected value in input
    console.log("Selected property ID:", property.assessment_roll_number);
    setSelectedPropertyId(property.assessment_roll_number); // Pass selected property ID to parent
    setIsFocused(false); // Close dropdown after selection
  };

  return (
    <div className="search-bar-container">
      <label className={`block mb-3 text-lg font-bold font-poppins ${labelWhite ? "text-white" : "text-gray-700"}`}>
        Property (Roll Number):
      </label>
      <div className="relative flex items-center focus:ring-blue focus:ring-2">
        <input
          type="text"
          value={searchTerm} // Controlled input value
          onChange={handleSearch}
          placeholder="Search by Roll Number"
          className="w-[350px] p-4 ml-1 border border-gray-300 rounded-md text-xl shadow bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
      </div>

      {isFocused && (
        <div className="w-[350px] bg-white rounded-md mt-4 max-h-[300px] overflow-y-auto shadow-lg border border-gray-200">
          {displayedProperties.length > 0 ? (
            displayedProperties.map((property) => (
              <div
                key={property.assessment_roll_number}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handlePropertySelect(property)}
              >
                <p className="text-xl py-4 px-6 m-0">
                  {property.assessment_roll_number}
                </p>
              </div>
            ))
          ) : (
            <p className="text-xl py-4 px-6 m-0">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};
