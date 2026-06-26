const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyc.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({storage });


//index route
router.get("/", wrapAsync(listingController.index));


//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//show Route
router.get("/:id", wrapAsync(listingController.showListing));

//create route
// router.post("/",isLoggedIn,validateListing, wrapAsync(listingController.createListing)
// );
router.post(
    "/",
    upload.single("listing[image]"),
    (req, res) => {
        console.log("ROUTE HIT");
        console.log("FILE =", req.file);
        console.log("BODY =", req.body);

        res.send("SUCCESS");
    }
);

//edit route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.renderEditform));

//update route
router.put("/:id",isLoggedIn,isOwner, validateListing, wrapAsync(listingController.updateListing));


//Delete route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;