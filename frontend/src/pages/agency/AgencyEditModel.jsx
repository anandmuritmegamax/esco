import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ModelForm from "./ModelForm";
import {
  useGetAgencyModelQuery,
  useUpdateAgencyModelMutation,
} from "../../redux/api/agencyApi";

const AgencyEditModel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetAgencyModelQuery(id);
  const [updateModel, { isLoading: isUpdating }] =
    useUpdateAgencyModelMutation();

  const submit = async ({ formData, profileImage, portfolio }) => {
    try {
      const payload = {
        ...formData, // ✅ already normalized in ModelForm
      };

      if (profileImage) {
        payload.profileImage = profileImage;
      }

      if (portfolio && portfolio.length > 0) {
        payload.portfolio = portfolio;
      }

      await updateModel({
        id,
        body: payload,
      }).unwrap();

      toast.success("Model updated successfully");
      navigate("/agency/models");
    } catch (err) {
      console.error("UPDATE MODEL ERROR:", err);
      toast.error(err?.data?.message || "Update failed");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <ModelForm
      submitLabel={isUpdating ? "Updating..." : "Update Model"}
      onSubmit={submit}
      initialData={data.model}
      isEdit
    />
  );
};

export default AgencyEditModel;
