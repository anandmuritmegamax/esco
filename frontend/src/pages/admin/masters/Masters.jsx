import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import {
  useGetMastersQuery,
  useCreateMasterMutation,
  useDeleteMasterMutation,
} from "../../../redux/api/masterApi";
import toast from "react-hot-toast";

const ALLOWED_TYPES = [
  "bodyTypes",
  "eyeColors",
  "hairColors",
  "skinTones",
  "languages",
  "skills",
  "availableFor",
  "experienceLevels",
];

export default function Masters() {
  const { type } = useParams();

  if (!ALLOWED_TYPES.includes(type)) {
    return <Navigate to="/admin/masters/bodyTypes" replace />;
  }

  const { data, isLoading } = useGetMastersQuery(type);
  const [createMaster] = useCreateMasterMutation();
  const [deleteMaster] = useDeleteMasterMutation();

  const [label, setLabel] = useState("");

  const add = async () => {
    if (!label.trim()) return;

    await createMaster({
      type,
      label,
      value: label.toLowerCase().replace(/\s+/g, "_"),
    }).unwrap();

    setLabel("");
    toast.success("Added");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="card p-4">
      <h3 className="mb-3 text-capitalize">{type} Master</h3>

      <div className="d-flex gap-2 mb-3">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Add new option"
          className="form-control"
        />
        <button onClick={add} className="btn btn-primary">
          Add
        </button>
      </div>

      <ul className="list-group">
        {data?.masters.map((item) => (
          <li
            key={item._id}
            className="list-group-item d-flex justify-content-between"
          >
            {item.label}
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteMaster(item._id)}
            >
              Disable
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
