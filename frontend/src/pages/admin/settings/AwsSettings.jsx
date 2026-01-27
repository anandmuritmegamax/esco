import { useEffect, useState } from "react";
import {
  useGetAwsSettingsQuery,
  useUpdateAwsSettingsMutation,
} from "../../../redux/api/settingsApi";
import toast from "react-hot-toast";

export default function AwsSettings() {
  const { data } = useGetAwsSettingsQuery();
  const [updateSettings, { isLoading }] = useUpdateAwsSettingsMutation();

  const [form, setForm] = useState({
    "aws.accessKeyId": "",
    "aws.secretAccessKey": "",
    "aws.region": "",
    "aws.s3Bucket": "",
  });

  useEffect(() => {
    if (data?.settings) {
      setForm((prev) => ({ ...prev, ...data.settings }));
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const save = async () => {
    await updateSettings(form).unwrap();
    toast.success("AWS settings saved");
  };

  return (
    <div className="card p-4">
      <h3 className="mb-4">AWS Configuration</h3>

      <div className="mb-3">
        <label>AWS Access Key ID</label>
        <input
          name="aws.accessKeyId"
          value={form["aws.accessKeyId"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>AWS Secret Access Key</label>
        <input
          type="password"
          name="aws.secretAccessKey"
          value={form["aws.secretAccessKey"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>AWS Region</label>
        <input
          name="aws.region"
          placeholder="ap-south-1"
          value={form["aws.region"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-4">
        <label>AWS S3 Bucket Name</label>
        <input
          name="aws.s3Bucket"
          value={form["aws.s3Bucket"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <button className="btn btn-dark" onClick={save} disabled={isLoading}>
        Save AWS Settings
      </button>
    </div>
  );
}
