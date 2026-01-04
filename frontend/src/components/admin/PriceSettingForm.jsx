import React, { useEffect, useState } from "react";
import {
  useCreatePriceSettingMutation,
  useUpdatePriceSettingMutation,
  useGetPriceSettingsQuery,
} from "../../redux/api/priceSettingApi";
import toast from "react-hot-toast";

const PriceSettingForm = ({ editingSetting, setShowForm, refetch }) => {
  const [form, setForm] = useState({
    headName: "",
    type: "fixed",
    amount: "",
    percentage: "",
    dependentHeads: [],
  });

  const { data: priceSettings } = useGetPriceSettingsQuery();
  const [createPriceSetting] = useCreatePriceSettingMutation();
  const [updatePriceSetting] = useUpdatePriceSettingMutation();

  useEffect(() => {
    if (editingSetting) {
      setForm({
        headName: editingSetting.headName,
        type: editingSetting.type,
        amount: editingSetting.amount || "",
        percentage: editingSetting.percentage || "",
        dependentHeads: editingSetting.dependentHeads || [],
      });
    }
  }, [editingSetting]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.type === "fixed" && !form.amount) {
        toast.error("Amount is required for fixed type");
        return;
      }
      if (
        form.type === "percentage" &&
        (!form.percentage || !form.dependentHeads.length)
      ) {
        toast.error("Percentage & dependent heads are required");
        return;
      }

      if (editingSetting) {
        await updatePriceSetting({
          id: editingSetting._id,
          body: form,
        }).unwrap();
        toast.success("Price setting updated");
      } else {
        await createPriceSetting(form).unwrap();
        toast.success("Price setting created");
      }

      refetch(); // 👈 refresh list immediately
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     if (form.type === "fixed" && !form.amount) {
  //       toast.error("Amount is required for fixed type");
  //       return;
  //     }
  //     if (
  //       form.type === "percentage" &&
  //       (!form.percentage || !form.dependentHeads.length)
  //     ) {
  //       toast.error("Percentage & dependent heads are required");
  //       return;
  //     }

  //     if (editingSetting) {
  //       await updatePriceSetting({
  //         id: editingSetting._id,
  //         body: form,
  //       }).unwrap();
  //       toast.success("Price setting updated");
  //     } else {
  //       await createPriceSetting(form).unwrap();
  //       toast.success("Price setting created");
  //     }

  //     setShowForm(false);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Something went wrong");
  //   }
  // };

  return (
    <form onSubmit={handleSubmit} className="border p-3 bg-light">
      <div className="row g-3">
        {/* Head Name */}
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Head Name"
            value={form.headName}
            onChange={(e) => setForm({ ...form, headName: e.target.value })}
            required
          />
        </div>

        {/* Type */}
        <div className="col-md-4">
          <select
            className="form-select"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="fixed">Fixed</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>

        {/* Amount / Percentage */}
        {form.type === "fixed" ? (
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />
          </div>
        ) : (
          <>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Percentage"
                value={form.percentage}
                onChange={(e) =>
                  setForm({ ...form, percentage: e.target.value })
                }
                required
              />
            </div>
            <div className="col-md-8">
              <select
                className="form-select"
                multiple
                value={form.dependentHeads}
                onChange={(e) =>
                  setForm({
                    ...form,
                    dependentHeads: [...e.target.selectedOptions].map(
                      (o) => o.value
                    ),
                  })
                }
              >
                {priceSettings?.heads?.map((head) => (
                  <option key={head._id} value={head._id}>
                    {head.headName}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="col-md-12 d-flex gap-2 mt-2">
          <button className="btn btn-success" type="submit">
            {editingSetting ? "Update" : "Add"} Price Setting
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default PriceSettingForm;
