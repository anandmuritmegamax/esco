const SearchFilters = () => {
  return (
    <section className="search">
      <div className="container">
        <form className="search-form">
          <div className="search-row">
            <div className="field">
              <label>Keyword</label>
              <input placeholder="Model name" />
            </div>

            <div className="field">
              <label>Area</label>
              <select>
                <option>All Dubai</option>
                <option>Dubai Marina</option>
                <option>JBR</option>
                <option>Downtown</option>
              </select>
            </div>

            <div className="field field-button">
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchFilters;
