import { Link } from "react-router-dom";
import { getImage } from "../../utils/image";

const ModelCard = ({ model }) => {
  const age = model.dateOfBirth
    ? new Date().getFullYear() - new Date(model.dateOfBirth).getFullYear()
    : "";

  return (
    <article className="card">
      <Link to={`/models/${model.stageName}`} className="card-img">
        <img
          src={getImage(model.profileImage)}
          alt={model.stageName}
          loading="lazy"
        />
      </Link>

      <div className="card-body">
        <h3 className="card-name">{model.stageName}</h3>
        <p className="card-meta">
          <span>{model.age} yrs</span> • <span>{model.based_in}</span>
        </p>
      </div>
    </article>
  );
};

export default ModelCard;
