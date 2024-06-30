import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  image: { type: String, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  estimateMeals: { type: Number, required: false },
  status: { type: String, required: false, default: "available" },
  listingType: { type: String, required: true, default: "donation" },
});
const Listing = mongoose.model("listing", listingSchema, "listings");
export default Listing;
