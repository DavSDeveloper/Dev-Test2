import Header from "../../components/Header/Header";
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../../graphql/queries";
import Loader from "../../components/Loader/Loader";
import CompanyList from "../../components/CompanyList/CompanyList";
import useAuth from "../../hooks/useAuth";

const Companies = () => {
  const { logout } = useAuth();

  const { data, loading, error } = useQuery(ME_QUERY, {
    context: {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    },
  });

  if (loading) return <Loader />;

  if (error?.message?.includes("Signature has expired")) {
    alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
    logout();
  } else if (error) {
    return <p>Error: {error.message}</p>;
  }
  
  const companies = data.me.companies.edges.map(({ node }) => node);

  return (
    <>
      <Header />
      <CompanyList companies={companies} />
    </>
  );
};

export default Companies;
