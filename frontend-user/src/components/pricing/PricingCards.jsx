const PricingCards = ({ plans, onSelect }) => {
  return (
    <div className="row">
      {plans.map((p) => (
        <div key={p._id} className="col-md-4">
          <div className="card p-3 mb-3">
            <h5>{p.name}</h5>
            <h4>${p.price}</h4>
            <ul>
              {p.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <button className="btn btn-primary" onClick={() => onSelect(p._id)}>
              Choose Plan
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingCards;
