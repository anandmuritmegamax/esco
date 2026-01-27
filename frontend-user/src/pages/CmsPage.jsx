import { useParams } from "react-router-dom";
import { useGetPageBySlugQuery } from "../redux/api/pagesApi";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const CmsPage = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useGetPageBySlugQuery(slug);

  if (isLoading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5">Page not found</div>;

  const page = data.page;

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1 className="mb-3">{page.title}</h1>

        {/* CMS HTML content */}
        <div
          className="cms-content"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
      <Footer />
    </>
  );
};

export default CmsPage;
