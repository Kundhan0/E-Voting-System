import React, { useEffect, useState } from "react";

export default function Stats() {

  const [stats, setStats] = useState({});

  const [error, setError] = useState("");

  // Fetch voting statistics from the backend when the component loads
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/stats", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (result.success) {
          setStats(result.stats); 
        } else {
          setError(result.message || "Failed to fetch stats."); // Handle errors from the backend
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError("Failed to fetch stats."); // Handle network or other errors
      }
    };

    fetchStats();
  }, []); 
  // Helper function to calculate the percentage of votes
  const calculatePercentage = (optionVotes, totalVotes) => {
    return ((optionVotes / totalVotes) * 100).toFixed(2); 
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Voting Statistics</h1>

      {/* Display error message if there's an error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Show a loading message if stats are not yet loaded */}
      {!error && Object.keys(stats).length === 0 && <p>Loading stats...</p>}

      {/* Iterate over each category in the stats */}
      {Object.keys(stats).map((category) => {
        // Calculate the total votes 
        const totalVotes = Object.values(stats[category]).reduce(
          (sum, count) => sum + count,
          0
        );

        return (
          <div
            key={category}
            className="w-full max-w-2xl bg-blue-400 shadow-md rounded-lg p-4 mb-6"
          >
            {/* Display the category name */}
            <h2 className="text-2xl font-bold mb-4">{category}</h2>

            {/* Table to display options, vote counts, and percentages */}
            <table className="w-full border-collapse border border-black">
              <thead>
                <tr>
                  <th className="border border-black bg-blue-100 p-2">Option</th>
                  <th className="border border-black bg-blue-100 p-2">Votes</th>
                  <th className="border border-black bg-blue-100 p-2">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {/* Iterate over each option in the current category */}
                {Object.entries(stats[category]).map(([option, count]) => (
                  <tr key={option}>
                    <td className="border border-black bg-blue-100 p-2">{option}</td>
                    <td className="border border-black bg-blue-100 p-2">{count}</td>
                    <td className="border border-black bg-blue-100 p-2">
                      {calculatePercentage(count, totalVotes)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}