import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
  levelName: { type: String, required: true }, // e.g., "L1", "L2", etc.
  salaryRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  difficulty: { type: String, required: true }, // e.g., "Easy", "Medium", "Hard"
  roundsTaken: [
    {
      name: { type: String, required: true }, // e.g., "DSA", "System Design"
      difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
      time: { type: String, required: true }, // e.g., "45 minutes", "1 hour"
      topicsCovered: { type: [String], required: true } // e.g., ["Arrays", "Dynamic Programming"]
    }
  ],
  recentInterviewExperiences: { type: [String], required: true }, // Array of experiences
  frequentlyAskedQuestions: { type: [String], required: true }   // Array of FAQs
});

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  levels: { type: [levelSchema], default: [] }
});

const CompanyModel = mongoose.models.Company || mongoose.model("Company", companySchema);
export default CompanyModel;
