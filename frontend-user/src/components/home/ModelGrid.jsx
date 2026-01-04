import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import ModelCard from "./ModelCard";

const ModelGrid = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    axios
      .get("/models", { params: { status: "approved" } })
      .then((res) => setModels(res.data.models))
      .catch(() => {});
  }, []);

  return (
    <section className="profiles">
      <div className="container">
        <div className="section-head">
          <h2>Featured Models</h2>
          <p>Verified profiles from Dubai</p>
        </div>

        <div className="profiles-grid">
          {models.map((model) => (
            <ModelCard key={model._id} model={model} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelGrid;
