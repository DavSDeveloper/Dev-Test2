import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../../graphql/queries";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import CompanyList from "../../components/CompanyList/CompanyList";
import useAuth from "../../hooks/useAuth";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  const { logout } = useAuth();

  const { loading, error } = useQuery(ME_QUERY, {
    context: {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    },
    onCompleted: (data) => {
      setCompanies(data.me.companies.edges);
    },
  });

  useEffect(() => {
    if (error?.message?.includes("Signature has expired")) {
      alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      logout();
    }
  }, [error, logout]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  // const companies = data.me.companies.edges.map(({ node }) => node);

  return (
    <>
      <Header />
      <CompanyList companies={companies} setCompanies={setCompanies} />
    </>
  );
};

export default Companies;
