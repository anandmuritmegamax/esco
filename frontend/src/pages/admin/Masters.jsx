import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetMastersQuery,
  useCreateMasterMutation,
  useDeleteMasterMutation,
} from "../../redux/api/masterApi";

export default function Masters() {
  const { type } = useParams();
  const [label, setLabel] = useState("");

  const { data, isLoading, error } = useGetMastersQuery(type, {
    skip: !type,
  });

  const [createMaster, { isLoading: creating }] = useCreateMasterMutation();

  const [deleteMaster] = useDeleteMasterMutation();

  const allowedTypes = [
    "languages",
    "skills",
    "bodyTypes",
    "eyeColors",
    "hairColors",
    "availableFor",
  ];

  if (!allowedTypes.includes(type)) {
    return <Navigate to="/admin/masters/languages" replace />;
  }

  const add = async () => {
    if (!label.trim()) return;

    await createMaster({
      type,
      label,
      value: label.toLowerCase().replace(/\s+/g, "_"),
    }).unwrap();

    setLabel("");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading masters</p>;

  return (
    <div className="card p-4">
      <h4 className="mb-3 text-capitalize">{type} Master</h4>

      <div className="d-flex gap-2 mb-3">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder={`Add ${type}`}
          className="form-control"
        />
        <button onClick={add} className="btn btn-primary" disabled={creating}>
          Add
        </button>
      </div>

      <ul className="list-group">
        {data?.masters.map((i) => (
          <li
            key={i._id}
            className="list-group-item d-flex justify-content-between"
          >
            {i.label}
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteMaster(i._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
