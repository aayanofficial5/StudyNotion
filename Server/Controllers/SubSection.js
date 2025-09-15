const SubSection = require("../Models/SubSection");
const Section = require("../Models/Section");
const Course = require("../Models/Course");
const { fileUploader } = require("../utils/fileUploader");
const { fileDeleter } = require("../utils/fileDeleter");
// createSubSection handler function
exports.createSubSection = async (req, res) => {
  try {
    // fetch data from request body
    const { subSectionName, description } = req.body;
    // fetch video from request
    const video = req.files?.video;
    const sectionId = req.body.sectionId;

    // validation of data
    if (!sectionId || !subSectionName || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }
    // upload video to cloudinary
    const uploadDetails = await fileUploader(video, process.env.FOLDER_NAME);
    // console.log(uploadDetails);

    if (!uploadDetails?.secure_url || !uploadDetails?.duration) {
      return res.status(500).json({
        success: false,
        message: "Video upload failed. Missing secure_url or duration.",
      });
    }

    // create a new subSection
    const newSubSection = await SubSection.create({
      subSectionName,
      description,
      timeDuration: uploadDetails.duration,
      videoUrl: uploadDetails.secure_url,
      sectionId,
    });
    // console.log("New sub-section created:", newSubSection);
    // update section with subSectionId
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSection: newSubSection._id },
      },
      { new: true }
    ).populate("subSection");

    // console.log("updatedSection :",updatedSection);

    // return response
    return res.status(200).json({
      success: true,
      message: "Lecture added successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log("Error occured while creating subSection");
    res.status(500).json({
      success: false,
      message: "Error occured while creating subSection : " + error.message,
    });
  }
};

// updateSubSection handler function
exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId } = req.body;
    const videoFile = req.files?.video;

    // Validate subSectionId
    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "SubSection ID is required",
      });
    }

    // Check if the subSection exists
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // Build update object from body
    const updateData = { ...req.body };

    // Remove subSectionId from updateData if present
    delete updateData.subSectionId;

    // If new video provided, upload and add to updateData
    if (videoFile) {
      try {
        const uploadResult = await fileUploader(
          videoFile,
          process.env.FOLDER_NAME
        );
        updateData.videoUrl = uploadResult.secure_url;
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Video upload failed: " + uploadError.message,
        });
      }
    }

    // Update only the fields provided
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      updateData,
      { new: true }
    ).populate({ path: "sectionId", populate: { path: "subSection" } });

    // console.log(updatedSubSection);
    
    return res.status(200).json({
      success: true,
      message: "Lecture updated successfully",
      data: updatedSubSection.sectionId,
    });
  } catch (error) {
    console.error("Error updating subSection:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the SubSection",
    });
  }
};

// deleteSubSection handler function
exports.deleteSubSection = async (req, res) => {
  try {
    const subSectionId = req.body.subSectionId;
    // validation of data
    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    // check if subSection is present
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(400).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // delete video from cloudinary
    if (subSection.videoUrl) {
      // console.log(subSection.videoUrl);
      
      await fileDeleter(subSection.videoUrl,"video");
    }
    
    // delete subSection Id from section
    const updatedSection = await Section.findByIdAndUpdate(
      subSection.sectionId,
      { $pull: { subSection: subSectionId } },
      { new: true }
    ).populate("subSection");
    
    // delete the subsection
    await SubSection.findByIdAndDelete(subSectionId);

    // return response
    return res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log("Error occured while deleting subSection: ", + error.message,);
    res.status(500).json({
      success: false,
      message: "Error occured while deleting subSection : " + error.message,
    });
  }
};
