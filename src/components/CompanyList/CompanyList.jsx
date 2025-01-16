import { useRef, useState, useEffect } from "react";
import CompanyItem from "../CompanyItem/CompanyItem";

const CompanyList = ({ companies, setCompanies }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef(null);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [search]);

  const filteredCompanies = (e) => {
    setSearch(e.target.value);
  };

  let results = [];
  if (debouncedSearch.length === 0) {
    results = companies;
  } else {
    results = companies.filter((company) =>
      company.node.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }

  if (!companies || companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <img
          src="/not_available.svg"
          alt="Not available"
          className="w-4/12"
        />
        <p className="text-center text-2xl text-blue-500 font-medium">
          No companies available.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="w-full py-9 text-center text-2xl font-bold text-blue-500">
        Companies
      </h1>
      <div className="flex justify-center">
        <input
          type="text"
          value={search}
          onChange={filteredCompanies}
          placeholder="Search companies..."
          className="w-full p-4 mx-10 mb-5 border-2 bg-slate-50 border-blue-500 rounded-md text-lg hover:bg-slate-100 shadow duration-300"
        />
      </div>
      <ul className="list-none p-0 my-5 mx-10">
        {results.map((company) => (
          <CompanyItem
            key={company.node.id}
            datos={company}
            setCompanies={setCompanies}
          />
        ))}
      </ul>
    </>
  );
};

export default CompanyList;
