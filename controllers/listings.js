const Listing=require("../models/listing");
const fetch = require("node-fetch"); 

module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  };

  module.exports.renderNewForm=(req, res) => {
  res.render("listings/new.ejs");
};


// module.exports.showListing=async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id)
//       .populate({ path: "reviews", populate: { path: "author" } })
//       .populate("owner");
//     if (!listing) {
//       req.flash("error", "Cannot find that listing");
//       return res.redirect("/listings");
//     }
//     console.log(listing);
//     res.render("listings/show.ejs", { listing });
//   };

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Cannot find that listing");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};


  // module.exports.createListing=async (req, res, next) => {
  //   let url=req.file.path;
  //   let filename=req.file.filename;

  //     const newListing = new Listing(req.body.listing);
  //     newListing.owner = req.user._id;
  //     newListing.image={url,filename};
  
  //     await newListing.save();
  //     req.flash("success", "Successfully made a new listing");
  
  //     res.redirect("/listings");
  //   };
module.exports.createListing = async (req, res, next) => {
  try {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    // --- Geocoding using Nominatim API ---
    if (newListing.location) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(newListing.location)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        newListing.coordinates = [lon, lat]; // GeoJSON style [lng, lat]
      }
    }

    await newListing.save();
    req.flash("success", "Successfully made a new listing");
    res.redirect("/listings");
  } catch (err) {
    console.error("Error creating listing:", err);
    req.flash("error", "Something went wrong while creating the listing");
    res.redirect("/listings/new");
  }
};


    module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Cannot find that listing");
      return res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
    
    res.render("listings/edit.ejs", { listing, originalImageUrl });
  };

  // module.exports.updateListing=async (req, res) => {
  //   const { id } = req.params;
  //   const listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    
  //   if(typeof req.file !=="undefined"){
  //   let url=req.file.path;
  //   let filename=req.file.filename;
  //   listing.image={url,filename};
  //   }
  //   await listing.save();
    
  //   // Handle image correctly
  //   // if (req.body.listing.image && req.body.listing.image.trim() !== "") {
  //   //   listing.image.url = req.body.listing.image; // update with new URL
  //   // }
  //   // else → do nothing, keep the existing image.url

  //   req.flash("success", "Successfully updated the listing");
  //   res.redirect(`/listings/${listing._id}`);
  // };

//   module.exports.updateListing = async (req, res) => {
//   const { id } = req.params;

//   let updatedData = { ...req.body.listing };

//   if (req.file) {
//     updatedData.image = {
//       url: req.file.path,
//       filename: req.file.filename,
//     };
//   }

//   const listing = await Listing.findByIdAndUpdate(id, updatedData, { 
//     new: true, 
//     runValidators: true 
//   });

//   req.flash("success", "Successfully updated the listing");
//   res.redirect(`/listings/${listing._id}`);
// };

module.exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    // --- Update normal fields ---
    listing.title = req.body.listing.title;
    listing.price = req.body.listing.price;
    listing.description = req.body.listing.description;
    listing.location = req.body.listing.location;
    listing.country = req.body.listing.country;

    // --- If location is changed, update coordinates ---
    if (req.body.listing.location && req.body.listing.location !== listing.location) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(req.body.listing.location)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        listing.coordinates = [lon, lat]; // [lng, lat]
      }
    }

    // --- If new image uploaded ---
    if (typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url, filename };
    }

    await listing.save();
    req.flash("success", "Successfully updated the listing");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.error("Error updating listing:", err);
    req.flash("error", "Something went wrong while updating the listing");
    res.redirect("/listings");
  }
};



  module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Successfully deleted a listing");
    res.redirect("/listings");
  };