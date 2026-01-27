import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "../../utils/axios";

import {
  useGetModelPortfolioQuery,
  useUpdateModelProfileMutation,
} from "../../redux/api/modelApi";

/* ================= S3 UPLOAD (SAME AS REGISTER) ================= */
const uploadToS3 = async (file, folder) => {
  const { data } = await axios.get(
    `/s3/presigned-url?fileType=${encodeURIComponent(
      file.type,
    )}&folder=${encodeURIComponent(folder)}`,
  );

  const res = await fetch(data.uploadUrl, {
    method: "PUT",
    body: file,
  });

  if (!res.ok) throw new Error("S3 upload failed");
  return data.fileUrl;
};

const ModelPortfolio = () => {
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, refetch } = useGetModelPortfolioQuery(user.id);
  const [updateProfile, { isLoading: isSaving }] =
    useUpdateModelProfileMutation();

  /* ================= STATE ================= */
  const [profileFile, setProfileFile] = useState(null);
  const [portfolioFiles, setPortfolioFiles] = useState([]);

  /* ================= PROFILE IMAGE UPLOAD ================= */
  const uploadProfileImage = async () => {
    if (!profileFile) {
      toast.error("Please select a profile image");
      return;
    }

    try {
      const url = await uploadToS3(profileFile, "models/profile");

      const payload = {
        profileImage: {
          url,
          type: "image",
          approved: false,
        },
      };

      await updateProfile(payload).unwrap();
      toast.success("Profile image uploaded");
      setProfileFile(null);
      refetch();
    } catch (err) {
      toast.error("Failed to upload profile image");
    }
  };

  /* ================= PORTFOLIO UPLOAD ================= */
  const uploadPortfolio = async () => {
    if (!portfolioFiles.length) {
      toast.error("Please select portfolio files");
      return;
    }

    try {
      const uploadedMedia = [];

      for (const file of portfolioFiles) {
        const url = await uploadToS3(file, "models/portfolio");

        uploadedMedia.push({
          url,
          type: file.type.startsWith("video") ? "video" : "image",
          approved: false,
        });
      }

      const payload = {
        portfolio: [...(data?.portfolio || []), ...uploadedMedia],
      };

      await updateProfile(payload).unwrap();

      toast.success("Portfolio uploaded");
      setPortfolioFiles([]);
      refetch();
    } catch (err) {
      toast.error("Failed to upload portfolio");
    }
  };

  /* ================= DELETE ================= */
  const deleteMedia = async (mediaId) => {
    if (!window.confirm("Delete this media?")) return;

    try {
      const filtered = data.portfolio.filter((m) => m._id !== mediaId);

      await updateProfile({ portfolio: filtered }).unwrap();
      toast.success("Media deleted");
      refetch();
    } catch {
      toast.error("Failed to delete media");
    }
  };

  if (isLoading) return <div className="p-5">Loading portfolio…</div>;

  const profileImage = data?.profileImage;
  const portfolio = data?.portfolio || [];

  /* ================= JSX ================= */
  return (
    <div className="page-inner">
      <div className="page-header">
        <h3 className="fw-bold mb-3">My Media</h3>
      </div>

      {/* ================= PROFILE IMAGE ================= */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5>Profile Image</h5>
          <p className="text-muted small">This is your main display image.</p>

          {profileImage && (
            <div className="mb-3 position-relative d-inline-block">
              <img
                src={profileImage.url}
                alt="Profile"
                className="rounded img-fluid"
                style={{ maxHeight: 220 }}
              />
              <span
                className={`badge position-absolute top-0 end-0 ${
                  profileImage.approved ? "bg-success" : "bg-warning"
                }`}
              >
                {profileImage.approved ? "Approved" : "Pending"}
              </span>
            </div>
          )}

          <label className="form-label">Upload Profile Image</label>
          <input
            type="file"
            accept="image/*"
            className="form-control mb-3"
            onChange={(e) => setProfileFile(e.target.files[0])}
          />

          <button
            className="btn btn-primary"
            onClick={uploadProfileImage}
            disabled={isSaving}
          >
            Upload Profile Image
          </button>
        </div>
      </div>

      {/* ================= PORTFOLIO ================= */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5>Portfolio Gallery</h5>
          <p className="text-muted small">Upload multiple images or videos.</p>

          <input
            type="file"
            multiple
            accept="image/*,video/*"
            className="form-control mb-3"
            onChange={(e) => setPortfolioFiles(Array.from(e.target.files))}
          />

          <button
            className="btn btn-primary mb-4"
            onClick={uploadPortfolio}
            disabled={isSaving}
          >
            Upload Portfolio
          </button>

          <div className="row g-3">
            {portfolio.map((media) => (
              <div key={media._id} className="col-md-3 col-sm-6">
                <div className="card h-100 shadow-sm">
                  <div className="card-body p-2 position-relative">
                    {media.type === "video" ? (
                      <video
                        src={media.url}
                        controls
                        className="w-100 rounded"
                        style={{ height: 180, objectFit: "cover" }}
                      />
                    ) : (
                      <img
                        src={media.url}
                        className="w-100 rounded"
                        style={{ height: 180, objectFit: "cover" }}
                      />
                    )}

                    <span
                      className={`badge position-absolute top-0 start-0 m-2 ${
                        media.approved ? "bg-success" : "bg-warning"
                      }`}
                    >
                      {media.approved ? "Approved" : "Pending"}
                    </span>
                  </div>

                  <div className="card-footer bg-white text-center">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteMedia(media._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {portfolio.length === 0 && (
              <p className="text-muted">No portfolio uploaded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPortfolio;
