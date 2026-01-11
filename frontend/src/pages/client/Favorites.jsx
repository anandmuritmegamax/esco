import React, { useEffect } from "react";
import {
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "../../redux/api/clientApi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ClientFavorites = () => {
  const { data: favorites, isLoading, error } = useGetFavoritesQuery();
  const [removeFavorite] = useRemoveFavoriteMutation();

  useEffect(() => {
    if (error) {
      toast.error("Failed to load favorites");
    }
  }, [error]);

  const handleRemove = async (modelId) => {
    try {
      await removeFavorite(modelId).unwrap();
      toast.success("Removed from favorites");
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="page-inner">
      <div className="page-header">
        <h3 className="fw-bold mb-3">Favorites</h3>
      </div>
      <div className="row">
        {favorites?.map((model) => (
          <div key={model._id} className="col-md-4">
            <div className="card">
              <img
                src={model.profileImage?.url}
                alt={model.stageName}
                className="card-img-top"
              />
              <div className="card-body">
                <h5>{model.stageName}</h5>
                <Link
                  to={`/model/${model.slug}`}
                  className="btn btn-primary me-2"
                >
                  View
                </Link>
                <button
                  onClick={() => handleRemove(model._id)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientFavorites;
