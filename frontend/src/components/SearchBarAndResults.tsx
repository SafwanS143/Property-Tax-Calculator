"use client";
import React, { useState, useEffect } from "react";

interface Municipality {
  municipal_id: number;
  municipal_name: string;
}

interface SearchBarAndResultsProps {
  setSelectedMunicipalityId: (id: number | null) => void;
  labelWhite?: boolean; // Optional prop to make the label white
}

export const SearchBarAndResults: React.FC<SearchBarAndResultsProps> = ({ setSelectedMunicipalityId, labelWhite = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const fetchMunicipalities = async (query: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/municipalities?search=${query}`
      );
      const data = await response.json();
      setMunicipalities(data);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  useEffect(() => {
    fetchMunicipalities(""); 
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if(query === '') {
      setSelectedMunicipalityId(null);
    }
    setSearchTerm(query);
    fetchMunicipalities(query);
  };

  return (
    <div className="search-bar-container">
      <label className={`block mb-3 text-lg font-bold font-poppins ${labelWhite ? "text-white" : "text-gray-700"}`}>
        Municipality:
      </label>
      <div className="relative flex items-center focus:ring-blue focus:ring-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search municipalities"
          className="w-[350px] p-4 ml-1 border border-gray-300 rounded-md text-xl shadow bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
      </div>

      {isFocused && (
        <div className="w-[350px] bg-white rounded-md mt-4 max-h-[300px] overflow-y-auto shadow-lg border border-gray-200">
          {municipalities.length > 0 ? (
            municipalities.map((municipality, index) => (
              <div
                key={index}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSearchTerm(municipality.municipal_name);  // Set full municipality name
                  console.log("Setting municipality ID to:", municipality.municipal_id, "Type:", typeof municipality.municipal_id);
                  setSelectedMunicipalityId(municipality.municipal_id);
                }}
              >
                <p className="text-xl py-4 px-6 m-0">
                  {municipality.municipal_name}  {/* Display full municipality name */}
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
