import React, { useState } from "react";

export default function Voting() {
  const [category, setCategory] = useState("");
  const [option, setOption] = useState("");
  const [outputMessage, setOutputMessage] = useState("");

  async function handleVote(e) {
    e.preventDefault();
  
    const response = await fetch("http://localhost:3000/api/vote", {
      method: "POST",
      body: JSON.stringify({ category, option }),
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Include cookies for session handling
    });
  
    const result = await response.json();
  
    if (result.success) {
      setOutputMessage(`Thank you for voting for ${option} in ${category}!`);
    } else {
      setOutputMessage(result.message || "Unable to vote. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center border-black-300 bg-blue-100 align-middle mt-20">
      <h1 className="text-3xl font-bold mb-5">Vote for Your Favorites</h1>
      <form
        onSubmit={handleVote}
        className="flex flex-col justify-evenly w-100 h-70 items-center bg-blue-400 border-black-300 p-5 rounded-md shadow-md"
      >
        <label htmlFor="category" className="text-xl font-bold mb-2">
          Select a Category
        </label>
        <select
          id="category"
          className="border-2 h-15 font-bold text-2xl border-black-300 rounded-md p-2 mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">-- Select Category --</option>
          <option value="codingLanguages">Coding Languages</option>
          <option value="sportsmen">Sportsmen</option>
          <option value="actors">Actors</option>
        </select>

        {category && (
          <>
            <label htmlFor="option" className="text-xl font-bold mb-2">
              Select an Option
            </label>
            <select
              id="option"
              className="border-2 border-black-300 rounded-md p-2 mb-4"
              value={option}
              onChange={(e) => setOption(e.target.value)}
            >
              <option value="">-- Select Option --</option>
              {category === "codingLanguages" && (
                <>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                </>
              )}
              {category === "sportsmen" && (
                <>
                  <option value="Cristiano Ronaldo">Cristiano Ronaldo</option>
                  <option value="Lionel Messi">Lionel Messi</option>
                  <option value="Virat Kohli">Virat Kohli</option>
                </>
              )}
              {category === "actors" && (
                <>
                  <option value="Robert Downey Jr.">Robert Downey Jr.</option>
                  <option value="Leonardo DiCaprio">Leonardo DiCaprio</option>
                  <option value="Tom Cruise">Tom Cruise</option>
                </>
              )}
            </select>
          </>
        )}

        <button
          type="submit"
          className="bg-blue-900 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Vote
        </button>
      </form>

      {outputMessage && (
        <div className="mt-5 text-green-600 font-bold">{outputMessage}</div>
      )}
    </div>
  );
}