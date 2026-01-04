const Hero = () => {
  return (
    <section className="hero hero-ivy">
      <div className="container hero-inner">
        <div className="hero-image">
          <div className="hero-img-frame hero-img-frame-rounded">
            <div className="hero-img-placeholder hero-img-large">
              <span>[Hero image]</span>
            </div>
          </div>
        </div>

        <div className="hero-copy">
          <h1>Welcome to Dubai’s most trusted escort directory</h1>
          <p className="hero-text">
            Browse verified independent and agency escorts across Dubai.
          </p>

          <div className="hero-search">
            <div className="hero-search-inner">
              <input placeholder="Search by area (Dubai Marina, JBR…)" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
