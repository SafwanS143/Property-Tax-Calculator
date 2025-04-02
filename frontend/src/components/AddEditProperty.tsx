import { useState } from "react";
import { FaPlus } from "react-icons/fa"; // Using the plus icon

interface AddPropertyButtonProps {
  onAddOrUpdateProperty: (assessmentValue: number, municipalId: number, rollNumber?: number) => Promise<void>;
  onCancel: () => void; // Add the onCancel prop
}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({ onAddOrUpdateProperty, onCancel }) => {
  const [showForm, setShowForm] = useState(false);
  const [rollNumber, setRollNumber] = useState<string>("");  // Keep roll number for editing
  const [assessmentValue, setAssessmentValue] = useState<string>("");  // Assessment Value
  const [municipalId, setMunicipalId] = useState<string>("");  // Municipal ID
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the inputs
    const rollNumberValue = Number(rollNumber);
    const assessmentValueNumber = Number(assessmentValue);
    const municipalIdValue = Number(municipalId);

    if (isNaN(assessmentValueNumber) || isNaN(municipalIdValue) || (rollNumber && isNaN(rollNumberValue))) {
      setError("All fields must be valid numbers.");
      return;
    }

    setError(null);

    // Call the parent function to add or update the property
    // If a rollNumber is provided, treat this as an update
    if (rollNumber) {
      onAddOrUpdateProperty(assessmentValueNumber, municipalIdValue, rollNumberValue);
    } else {
      // Otherwise, it's an edit
      onAddOrUpdateProperty(assessmentValueNumber, municipalIdValue);
    }

    // Hide the form after submission
    setShowForm(false);
    onCancel(); // Call onCancel to notify the parent component
  };

  return (
    <div>
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center w-10 h-10 bg-white text-black border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-200 transition duration-300 shadow-lg"
        >
          <FaPlus className="mr-2" />
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-medium">Roll Number (Add)</label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md text-white"
              placeholder="Enter Roll Number"
            />
          </div>
          <div>
            <label className="block text-white font-medium">Assessment Value</label>
            <input
              type="text"
              value={assessmentValue}
              onChange={(e) => setAssessmentValue(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md text-white"
              placeholder="Enter Assessment Value"
            />
          </div>
          <div>
            <label className="block text-white font-medium">Municipal ID</label>
            <input
              type="text"
              value={municipalId}
              onChange={(e) => setMunicipalId(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md text-white"
              placeholder="Enter Municipal ID"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 w-24 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); onCancel(); }} // Hide form and call onCancel when Cancel is clicked
              className="bg-gray-300 text-black w-24 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddPropertyButton;
