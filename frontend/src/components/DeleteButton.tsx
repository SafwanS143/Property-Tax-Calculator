"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";  // Or "react-router-dom" depending on your setup
import { FaTrash } from "react-icons/fa"; // Assuming you're using react-icons

interface DeletePropertyButtonProps {
  rollNumber: number;
}

const DeletePropertyButton: React.FC<DeletePropertyButtonProps> = ({ rollNumber }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    // Show confirmation popup before proceeding
    const isConfirmed = window.confirm("Are you sure you want to delete this property?");
    if (!isConfirmed) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://127.0.0.1:5000/properties/${rollNumber}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete property");
      }

      const data = await response.json();
      alert(data.message);  // You can show the success message here

      // Navigate back to the homepage after successful deletion
      router.push("/");
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading} 
      className="flex items-center justify-center w-10 h-10 bg-white text-black border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-200 transition duration-300"
    >
      {loading ? (
        <span>Deleting...</span>
      ) : (
        <>
          <FaTrash className="mr-2" />
        </>
      )}
    </button>
  );
};

export default DeletePropertyButton;
