import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists and starts with 'Bearer '
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not Authorized: Login Again" });
        }

        // Extract the token
        const atoken = authHeader.split(" ")[1];

        // Verify the token
        const tokenDecode = jwt.verify(atoken, process.env.JWT_SECRET);

        // Check token validity
        if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ success: false, message: "Not Authorized: Login Again" });
        }

        // Proceed to the next middleware/route handler
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export default authAdmin;