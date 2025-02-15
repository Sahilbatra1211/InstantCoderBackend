import {
  createCollegeService,
  updateCollegeService,
  getAllCollegesService,
  getCollegeByIdService,
  deleteCollegeService,
} from "../services/collegeService.js";

export const createCollege = async (req, res) => {
  try {
    const newCollege = await createCollegeService(req.body);
    res.status(201).json(newCollege);
  } catch (error) {
    console.error("College creation failed:", error.message || error);
    res.status(500).json({ error: "College creation failed" });
  }
};

export const updateCollege = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedCollege = await updateCollegeService(id, req.body);

    if (!updatedCollege) {
      return res.status(404).json({ error: "College not found" });
    }

    res.json(updatedCollege);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "College update failed" });
  }
};

export const getAllColleges = async (req, res) => {
  try {
    const colleges = await getAllCollegesService();
    res.json(colleges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch colleges" });
  }
};

export const getCollegeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const college = await getCollegeByIdService(id);

    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }

    res.json(college);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch college" });
  }
};

export const deleteCollege = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid college ID" });
    }

    const deletedCollege = await deleteCollegeService(id);
    res.json({
      message: "College deleted successfully",
      college: deletedCollege,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete college" });
  }
};
