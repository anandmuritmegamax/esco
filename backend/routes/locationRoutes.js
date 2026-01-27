import express from "express";
import {
    getCountries,
    getCitiesByCountry,
    getCitiesByCountryName,
} from "../controllers/locationController.js";

const router = express.Router();

router.get("/location/countries", getCountries);
router.get("/location/cities/:countryId", getCitiesByCountry);

router.get(
    "/location/cities/by-country-name/:country",
    getCitiesByCountryName
);

export default router;
