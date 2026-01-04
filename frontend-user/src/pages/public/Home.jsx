import Hero from "../../components/home/Hero";
import SearchFilters from "../../components/home/SearchFilters";
import ModelGrid from "../../components/home/ModelGrid";
import Testimonials from "../../components/home/Testimonials";
import About from "../../components/home/About";
import FAQ from "../../components/home/FAQ";
import PublicLayout from "../../components/layout/PublicLayout";

const Home = () => {
  return (
    <PublicLayout>
      <Hero />
      <SearchFilters />
      <ModelGrid />
      <Testimonials />
      <About />
      <FAQ />
    </PublicLayout>
  );
};

export default Home;
