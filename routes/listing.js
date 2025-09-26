const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListings } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer=require('multer');
const{storage}=require("../cloudConfig.js");
const upload=multer({storage});

router.route("/")
.get( wrapAsync(listingController.index))
.post(
  isLoggedIn,
  upload.single("listing[image]"),
    validateListings,
  wrapAsync(listingController.createListing)
);



//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListings,
  wrapAsync(listingController.updateListing)
)
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
)
.get(wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate("reviews");
  res.render("listings/show.ejs", { listing });
}));



//show route


//create route


//edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//update
// router.put("/:id",validateListings,wrapAsync( async(req,res)=>{

//     let{id}= req.params;
//     await Listing.findByIdAndUpdate(id,{...req.body.listing});
//     res.redirect(`/listings/${id}`);
// }));



//delete


module.exports = router;
