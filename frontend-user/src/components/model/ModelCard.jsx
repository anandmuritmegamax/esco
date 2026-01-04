import { Link } from "react-router-dom";
const ModelCard = ({ model }) => {
  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/models/${model.slug}`} className="profile-card">
        <img
          src={
            model.profileImage?.url ||
            "https://via.placeholder.com/300x350?text=No+Image"
          }
          className="card-img-top"
          style={{ height: 300, objectFit: "cover" }}
          alt={model.firstName}
        />

        <div className="card-body">
          <h5 className="card-title">
            {model.stageName || `${model.firstName} ${model.lastName}`}
          </h5>

          <p className="text-muted mb-1">{model.city || "Unknown city"}</p>

          <span className="badge bg-secondary">{model.gender}</span>
        </div>
      </Link>
    </div>
  );
};

export default ModelCard;
