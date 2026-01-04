import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useCreateClientMutation,
  useUpdateClientMutation,
} from "../../../redux/api/clientApi";

const ClientForm = ({ client, onClose, refetch }) => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [createClient] = useCreateClientMutation();
  const [updateClient] = useUpdateClientMutation();

  /* ================= LOAD EDIT DATA ================= */
  useEffect(() => {
    if (client) {
      setForm({
        name: client.name || "",
        username: client.username || "",
        email: client.email || "",
        password: "", // never prefill password
      });
    }
  }, [client]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  /* ================= SUBMIT ================= */
  const submit = async (e) => {
    e.preventDefault();

    try {
      if (client?._id) {
        const payload = { ...form };
        if (!payload.password) delete payload.password;

        await updateClient({
          id: client._id,
          ...payload,
        }).unwrap();

        toast.success("Client updated");
      } else {
        await createClient(form).unwrap();
        toast.success("Client created");
      }

      refetch();
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Action failed");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="mb-3">{client ? "Edit Client" : "Add Client"}</h5>

        <form onSubmit={submit}>
          <div className="mb-2">
            <label>Name</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label>Username</label>
            <input
              className="form-control"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password {client && "(leave blank to keep same)"}</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              minLength={6}
            />
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
