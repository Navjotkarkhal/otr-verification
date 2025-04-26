import Tesseract from "tesseract.js";
import OTRModel from "../models/OTR.js"; // your DB model

export const uploadImageAndVerifyOTR = async (req, res) => {
  try {
    if (!req.file || !req.body.otrNumber) {
      return res.status(400).json({ message: "Image and OTR number required!" });
    }

    const userOTR = req.body.otrNumber;

    // Extract text from image using Tesseract
    const result = await Tesseract.recognize(req.file.buffer, 'eng');
    const extractedText = result.data.text;

    console.log("Extracted Text:", extractedText);
    console.log("User OTR Number:", userOTR);

    // Check if extracted text contains the entered OTR number
    if (extractedText.includes(userOTR)) {
      // Save to DB only if OTR number matches
      const newEntry = new OTRModel({
        otrNumber: userOTR,
        // You can store other fields as well like image name if using diskStorage
      });

      await newEntry.save();

      return res.status(200).json({ message: "OTR verified and saved successfully!" });
    } else {
      return res.status(400).json({ message: "OTR number does not match extracted data. Please check the image or input." });
    }

  } catch (error) {
    console.error("Error processing image:", error);
    return res.status(500).json({ message: "Something went wrong!", error: error.message });
  }
};
