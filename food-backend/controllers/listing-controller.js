import Listing from "../models/listing.js";

const createListing = async (req, res) => {
  const {
    title,
    description,
    estimateCost,
    status,
    listingType = "donation request",
  } = req.body;
  const newListing = new Listing({
    title,
    uid: req.jwtPayload._id,
    image: req?.file?.path,
    description,
    estimateCost,
    status: listingType == "donation" ? "available" : "donation request",
    listingType,
  });
  const savedListing = await newListing.save();
  res.status(201).json(savedListing);
};

const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateListingById = async (req, res) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createListing, getAllListings, getListingById, updateListingById };
