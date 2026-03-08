// import Application from '../models/Application.js';
import Scheme from '../models/scheme.js';
import Profile from "../models/profile.js"
import { validationResult } from 'express-validator';

/** Apply for a scheme */
export const applyForScheme = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { schemeId } = req.body;
    if (!schemeId) return res.status(400).json({ message: "schemeId required" });

    const scheme = await Scheme.findById(schemeId);
    if (!scheme) return res.status(404).json({ message: "Scheme not found" });

    const userProfile = await Profile.findOne({ user: req.user._id });
    if (!userProfile) return res.status(404).json({ message: "Please complete your profile first" });

    const alreadyApplied = await Application.findOne({
      scheme: schemeId,
      profile: userProfile._id
    });
    if (alreadyApplied) return res.status(400).json({ message: "Already applied for this scheme" });

    const application = new Application({
      scheme: schemeId,
      profile: userProfile._id
    });

    await application.save();

    // ✅ FIXED: Return application with populated scheme data
    const populatedApplication = await Application.findById(application._id)
      .populate('scheme', 'name description category')
      .populate('profile', 'user');

    res.status(201).json({ 
      message: "Applied successfully", 
      application: populatedApplication 
    });

  } catch (error) {
    console.error('Apply error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/** Get applications of logged-in user - ✅ FIXED */
export const getMyApplications = async (req, res) => {
  try {
    const userProfile = await Profile.findOne({ user: req.user._id });
    
    if (!userProfile) {
      return res.status(200).json({ applications: [] });
    }
    
    // ✅ FIXED: Populate scheme details for dashboard
    const applications = await Application.find({ profile: userProfile._id })
      .populate('scheme', 'name description category ministry website applicationFormUrl youtubeLink')
      .sort({ createdAt: -1 });

    res.status(200).json({ applications });

  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/** Get all applications (Admin/All users) */
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('scheme', 'name description category')
      .populate({
        path: 'profile',
        populate: {
          path: 'user',
          select: 'name email'
        }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ applications });

  } catch (error) {
    console.error('Get all applications error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/** Get application by ID */
export const getApplicationById = async (req, res) => {
  try {
    const userProfile = await Profile.findOne({ user: req.user._id });
    
    const application = await Application.findById(req.params.id)
      .populate('scheme', 'name description category ministry')
      .populate({
        path: 'profile',
        populate: {
          path: 'user',
          select: 'name email'
        }
      });
      
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    
    // Check if user can view this application
    if (
      userProfile && 
      application.profile._id.toString() !== userProfile._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ application });
    
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/** Update application status (Admin only) */
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be: Approved, Rejected, or Pending" });
    }

    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    
    application.status = status;
    await application.save();
    
    // Return with populated data
    const updatedApplication = await Application.findById(application._id)
      .populate('scheme', 'name description')
      .populate('profile', 'user');
    
    res.status(200).json({ 
      message: "Application status updated successfully", 
      application: updatedApplication 
    });

  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/** Delete application (Admin or owner) */
export const deleteApplication = async (req, res) => {
  try {
    const userProfile = await Profile.findOne({ user: req.user._id });
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    
    // Check if user can delete this application
    if (
      userProfile &&
      application.profile.toString() !== userProfile._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: "Access denied" });
    }
    
    await Application.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: "Application deleted successfully" });
    
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};