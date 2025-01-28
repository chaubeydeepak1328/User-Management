const express = require("express");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const { email } = req.body;

    const User_match = await User.findOne({ email: email });
    if (!User_match) {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } else {
      res.status(400).json("Email already exists");
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a All user by ID
const getAlluser = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) return res.status(404).json({ error: "No data found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a user by ID

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({
      message: `${updatedUser.firstName}'s data updated successfully`,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while updating the user" });
  }
};


// Delete a user by ID

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { registerUser, getAlluser, updateUser, deleteUser };
