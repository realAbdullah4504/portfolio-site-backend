const path = require("path");
const Setting = require("../models/settings.models");

const getSettings = async (req, res) => {
  try {
    const data = await Setting.findOne({ _id: "64ce488d470947cb026acac1" });
    //console.log(data)
    res.json({ settings: data });
  } catch {
    res.status(400).json("error getting data");
  }

  //res.json("api is running");
};
const postSettings = async (req, res) => {
  console.log(req.body);
  try {
    const setting = new Setting(req.body);
    await setting.save();
    res.json({
      setting: setting,
      status: true,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
const editSettings = async (req, res) => {

  const id = req.params.id;
  try {
     const updatedSettings = await Setting.findByIdAndUpdate(id, req.body,{new:true});


    if (!updatedSettings) {
      return res.status(404).json({ message: "Setting not found" });
    }

    console.log(updatedSettings);
    return res.json({ setting: updatedSettings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please provide an image file." });
  }

  // The image has been uploaded successfully. You can do more processing here if needed.
  res.json({
    message: "Image uploaded successfully.",
    filename: req.file.filename,
  });
};

const getImage = (req, res) => {
  try {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, "../../public", imageName);

    console.log("name", imageName);
    console.log("path", imagePath);
    // Check if the image exists in the uploads folder
    // If it exists, send the image as the response
    //res.sendFile(path.join(__dirname, `uploads/${imageName}`));
    res.sendFile(imagePath);
  } catch (err) {
    if (err) {
      // If the image is not found or any other error occurs, send a 404 response
      console.error("Error sending image:", err);
      res.status(404).json({ error: "Image not found." });
    }
  }
};

module.exports = {
  getSettings,
  postImage,
  getImage,
  postSettings,
  editSettings,
};
