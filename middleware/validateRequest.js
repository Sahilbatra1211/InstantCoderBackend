const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // Validate request body
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

export default validateRequest;
