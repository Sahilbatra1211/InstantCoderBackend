const validateResponse = (schema) => (req, res, next) => {
  const originalJson = res.json;

  res.json = function (data) {
    try {
      const validatedData = schema.parse(data);
      originalJson.call(this, validatedData);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Invalid response format", details: error.errors });
    }
  };

  next();
};

export default validateResponse;
