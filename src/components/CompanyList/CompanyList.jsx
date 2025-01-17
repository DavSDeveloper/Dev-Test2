import { Link } from "react-router-dom";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";

const CompanyList = ({ companies }) => {

  const [search, setSearch] = useState("");
  const [companyName, setCompanyName] = useState({});

  if (!companies || companies.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center p-6">
          <img
            src="/public/not_available.svg"
            alt="Not available"
            className="w-4/12"
          />
          <p className="text-center text-2xl text-blue-500 font-medium">
            No companies available.
          </p>
        </div>
      </>
    );
  }

  const filteredCompanies = (e) => {
    setSearch(e.target.value);
  };

  let results = [];

  if (search.length === 0) {
    results = companies;
  } else {
    results = companies.filter((company) => {
      return company.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  const information = (company) => {
    let created = new Date(company.created).toLocaleString("es-CO", {
      timeZone: "America/Bogota",
    });
    alert(
      `Created: ${created}` +
        `\nNumber of files uploaded: ${company.importedFilesCount}`
    );
  };

  const edit = (id, currentName) => {
    const newName = prompt("Enter the new name of the company", currentName);
    if (newName) {
      setCompanyName((prev) => ({
        ...prev,
        [id]: newName,
      }));
    }
  };

  return (
    <>
      <h1 className="w-full py-9 text-center text-2xl font-bold text-blue-500">
        Companies
      </h1>
      <div className="flex justify-center">
        <input
          value={search}
          onChange={filteredCompanies}
          type="text"
          placeholder="Search companies..."
          className="w-full p-4 mx-10 mb-5 border-2 bg-slate-50 border-blue-500 rounded-md text-lg hover:bg-slate-100 shadow duration-300"
        />
      </div>
      <ul className="list-none p-0 my-5 mx-10">
        {results.map((company) => (
          <li
            key={company.id}
            className="flex items-center justify-between my-3 p-3 border-2 border-slate-200 rounded-md hover:bg-slate-100 shadow duration-300"
          >
            <Link
              to={`/companies/${company.id}`}
              className="text-blue-500 font-semibold text-lg hover:text-blue-800 duration-300"
            >
              {companyName[company.id] || company.name}
            </Link>
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-1 border-2 rounded-md bg-blue-500 hover:bg-blue-700 duration-300 cursor-pointer"
                onClick={() => information(company)}
              >
                <IoMdInformationCircle className="text-white" />
              </button>
              <button
                className="px-4 py-1 border-2 rounded-md bg-blue-500 hover:bg-blue-700 duration-300 cursor-pointer"
                onClick={() => edit(company.id, company.name)}
              >
                <MdOutlineEdit className="text-white" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CompanyList;
