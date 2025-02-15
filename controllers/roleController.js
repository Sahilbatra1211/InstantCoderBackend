import {
  createRoleService,
  updateRoleService,
  getAllRolesService,
  getRoleByIdService,
  deleteRoleService,
} from "../services/roleService.js";

export const createRole = async (req, res) => {
  try {
    const newRole = await createRoleService(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    console.error("Role creation failed:", error.message || error);
    res.status(500).json({ error: "Role creation failed", message: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedRole = await updateRoleService(id, req.body);

    if (!updatedRole) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.json(updatedRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Role update failed", message: error.message });
  }
};

export const getAllRoles = async (req, res) => {
  try {
    const roles = await getAllRolesService();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const role = await getRoleByIdService(id);

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch role" });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid role ID" });
    }

    const deletedRole = await deleteRoleService(id);
    res.json({ message: "Role deleted successfully", role: deletedRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete role" });
  }
};
