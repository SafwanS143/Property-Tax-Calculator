"use client";
import React, { useState, useEffect } from "react";

interface SearchButtonProps {
  rollNumber: number | null; // The roll number to search for
  onSearch: () => void; // Callback to execute when search is valid
  labelWhite?: boolean; // Optional prop to change button color styling
}

export const SearchButton: React.FC<SearchButtonProps> = ({ rollNumber, onSearch, labelWhite = false }) => {
  const [isDisabled, setIsDisabled] = useState(true); // Disable the button initially

  // Function to validate if the property exists in the database by roll number
  const validateRollNumber = async (rollNumber: number | null) => {
    if (rollNumber === null) {
      console.log("Roll number is null, button disabled");
      setIsDisabled(true); // Disable if rollNumber is null
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/properties/${rollNumber}`);
      if (response.ok) {
        console.log(`Roll number ${rollNumber} is valid, button enabled`);
        setIsDisabled(false); // Enable if property found
      } else {
        console.log(`Roll number ${rollNumber} is invalid, button disabled`);
        setIsDisabled(true); // Disable if property not found
      }
    } catch (error) {
      console.error("Error validating roll number:", error);
      setIsDisabled(true); // Disable on error
    }
  };

  // Use effect to continuously validate roll number every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      validateRollNumber(rollNumber);
    }, 2000); // Check every 2 seconds

    // Perform an initial validation immediately
    validateRollNumber(rollNumber);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [rollNumber]);

  // Handle button click when valid
  const handleClick = () => {
    if (!isDisabled) {
      onSearch(); // Call the parent function when search is valid
    }
  };

  return (
    <button
      className={`px-4 py-2 w-[30%] h-[50px] rounded 
        ${isDisabled 
          ? labelWhite ? "bg-gray-300 text-black" : "bg-black opacity-50 text-white" 
          : labelWhite ? "bg-white text-black" : "bg-black text-white"
        }`}
      disabled={isDisabled}
      onClick={handleClick}
    >
      Search
    </button>
  );
};
