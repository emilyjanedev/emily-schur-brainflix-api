import fs from "fs";

const readData = (file) => {
  try {
    return JSON.parse(
      fs.readFileSync(
        file === "DATA" ? process.env.DATA : process.env.KEYS,
        "utf8"
      )
    );
  } catch (error) {
    throw new Error("Error reading data from file.");
  }
};

const writeData = (data, file) => {
  try {
    fs.writeFileSync(
      file === "DATA" ? process.env.DATA : process.env.KEYS,
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    throw new Error("Error writing data to file.");
  }
};

export { readData, writeData };
