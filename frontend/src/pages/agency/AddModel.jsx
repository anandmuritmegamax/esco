// src/pages/agency/AgencyAddModel.jsx
import toast from "react-hot-toast";
import { useAddModelMutation } from "../../redux/api/agencyApi";
import ModelForm from "./ModelForm";

const AgencyAddModel = () => {
  const [addModel, { isLoading }] = useAddModelMutation();

  const submit = async ({ formData, profileImage, portfolio, countries }) => {
    try {
      const countryObj = countries.find(
        (c) => String(c._id) === String(formData.country),
      );

      const payload = {
        /* AUTH */
        username: formData.username,
        password: formData.password,
        email: formData.email,

        /* PROFILE HEADER */
        stageName: formData.stageName,
        age: Number(formData.age),
        tagline: formData.tagline,
        based_in: formData.based_in,
        nationality: formData.nationality,

        /* LOCATION */
        country: countryObj?.name,
        city: formData.city,

        /* SERVICES */
        services: formData.services
          ? formData.services.split(",").map((v) => v.trim())
          : [],
        place_of_service: formData.place_of_service
          ? formData.place_of_service.split(",").map((v) => v.trim())
          : [],
        profile_type: formData.profile_type,

        /* INFO CARD */
        height: formData.height,
        weight: formData.weight,
        cup_size: formData.cup_size,
        price_1h: formData.price_1h,
        currency: formData.currency,

        /* PROFILE DETAILS */
        ethnicity: formData.ethnicity,
        body_type: formData.body_type,
        hair_color: formData.hair_color,
        eyes: formData.eyes,
        breast: formData.breast,
        pubic_hair: formData.pubic_hair,
        meeting_with: formData.meeting_with,
        languages: formData.languages
          ? formData.languages.split(",").map((v) => v.trim())
          : [],
        location: formData.location,

        /* RATES */
        rate_30_out: formData.rate_30_out,
        rate_30_in: formData.rate_30_in,
        rate_1h_out: formData.rate_1h_out,
        rate_1h_in: formData.rate_1h_in,
        rate_2h_out: formData.rate_2h_out,
        rate_2h_in: formData.rate_2h_in,
        rate_note: formData.rate_note,

        /* AVAILABILITY */
        days: formData.days
          ? formData.days.split(",").map((v) => v.trim())
          : [],
        availability_text: formData.availability_text,

        /* CONTACT */
        phone: formData.phone,
        website: formData.website,
        snapchat: formData.snapchat,
        preferred_contact: formData.preferred_contact,

        /* ABOUT */
        about_me: formData.about_me,

        /* MEDIA */
        profileImage,
        portfolio,
      };

      await addModel(payload).unwrap();
      toast.success("Model added successfully (Pending approval)");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add model");
    }
  };

  return (
    <ModelForm
      submitLabel={isLoading ? "Adding..." : "Add Model"}
      onSubmit={submit}
    />
  );
};

export default AgencyAddModel;
