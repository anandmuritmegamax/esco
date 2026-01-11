import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetModelPortfolioQuery,
  useUploadMediaMutation,
  useDeleteMediaMutation,
} from "../../redux/api/modelApi";
import toast from "react-hot-toast";

const ModelPortfolio = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, refetch } = useGetModelPortfolioQuery(user.id);
  const [uploadMedia, { isLoading: isUploading }] = useUploadMediaMutation();
  const [deleteMedia] = useDeleteMediaMutation();

  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      await uploadMedia(formData).unwrap();
      toast.success("Media uploaded");
      setFile(null);
      refetch();
    } catch (err) {
      toast.error("Failed to upload");
    }
  };

  const handleDelete = async (mediaId) => {
    if (window.confirm("Delete media?")) {
      try {
        await deleteMedia(mediaId).unwrap();
        toast.success("Media deleted");
        refetch();
      } catch (err) {
        toast.error("Failed to delete");
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="page-inner">
      <div className="page-header">
        <h3 className="fw-bold mb-3">Portfolio</h3>
      </div>
      <div className="mb-3">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="btn btn-primary"
        >
          {isUploading ? "Uploading..." : "Upload Media"}
        </button>
      </div>
      <div className="row">
        {data?.portfolio.map((media) => (
          <div key={media._id} className="col-md-3">
            <img src={media.url} alt="portfolio" className="img-fluid" />
            <button
              onClick={() => handleDelete(media._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelPortfolio;
