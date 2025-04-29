import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Username of the voter
  category: { type: String, required: true }, // Category of the vote (e.g., codingLanguages, sportsmen, actors)
  option: { type: String, required: true }, // Option selected by the user
});

const Vote = mongoose.model("Vote", voteSchema);

export default Vote; // Correctly export the Vote model