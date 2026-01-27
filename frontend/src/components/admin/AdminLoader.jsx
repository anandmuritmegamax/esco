import { useSelector } from "react-redux";
import GlobalLoader from "../common/GlobalLoader";

const AdminLoader = () => {
  const queries = useSelector((state) => state.api.queries);
  const mutations = useSelector((state) => state.api.mutations);

  const isLoading =
    Object.values(queries).some((q) => q?.status === "pending") ||
    Object.values(mutations).some((m) => m?.status === "pending");

  if (!isLoading) return null;

  return <GlobalLoader />;
};

export default AdminLoader;
