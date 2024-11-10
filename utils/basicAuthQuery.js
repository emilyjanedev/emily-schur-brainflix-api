import { readData } from "./dataUtils.js";

const basicAuthQuery = (req, res, next) => {
  const { api_key } = req.query;

  if (!api_key) {
    return res.status(400).json({
      message: "API key is required. Obtain one from /register endpoint.",
    });
  }

  const registeredKeys = readData("KEYS");
  if (registeredKeys.find((key) => key.key === api_key)) {
    return next();
  }

  return res.status(401).json({ message: "Invalid credentials." });
};

export default basicAuthQuery;
