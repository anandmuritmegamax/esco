// controllers/locationController.js
import Country from "../models/Country.js";
import City from "../models/City.js";


export const getCitiesByCountryName = async (req, res) => {
    const cities = await City.find({
        country_name: req.params.country,
    }).select("name");

    res.json({
        success: true,
        cities,
    });
};


export const getCountries = async (req, res) => {
    const countries = await Country.find({})
        .select("name")
        .sort({ name: 1 });

    res.json({
        success: true,
        countries,
    });
};

export const getCitiesByCountry = async (req, res) => {
    const countryId = Number(req.params.countryId);

    const cities = await City.find({ country_id: countryId })
        .select("name")
        .sort({ name: 1 });

    res.json({
        success: true,
        cities,
    });
};
