const Service = require("../models/service.models");

const getServices = async (req, res) => {
  try {
    const data = await Service.find({});
    //console.log(data)
    res.json({ services: data });
  } catch {
    res.status(400).json("error getting data");
  }
};

const postService = async (req, res) => {
  console.log(req.body);
  try {
    const service = new Service(req.body);
    await service.save();
    res.json({
      service: service,
      status: true,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
const updateService = async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  try {
    const updatedService = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    console.log(updatedService);
    return res.json({ service: updatedService });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const deleteService = async (req, res) => {
  
  const id = req.params.id;
  
  try {
  const deleteService=await Service.deleteOne({_id:id})

    //console.log(updatedService);
    return res.json({ service: deleteService });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getServices,
  postService,
  updateService,
  deleteService,
};
