import fs from "fs";

const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(process.env.DATA, "utf8"));
  } catch (error) {
    throw new Error("Error reading data from file.");
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(process.env.DATA, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error("Error writing data to file.");
  }
};

export { readData, writeData };
