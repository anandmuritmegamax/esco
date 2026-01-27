import User from "../models/user.js";
import Model from "../models/Model.js";
import Agency from "../models/Agency.js";
import Client from "../models/Client.js";

export const checkUserExistsEverywhere = async ({ email, username, phone }) => {
    const queries = [];

    if (email) queries.push({ email });
    // if (username) queries.push({ username });
    // if (phone) queries.push({ phone });

    const exists =
        (await User.findOne({ $or: queries })) ||
        (await Model.findOne({ $or: queries })) ||
        (await Agency.findOne({ $or: queries })) ||
        (await Client.findOne({ $or: queries }));

    return exists;
};
