const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

app.post("/api/enquiry", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone number are required"
      });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone
    });

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});