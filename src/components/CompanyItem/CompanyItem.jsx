import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";

const CompanyItem = (props) => {
  const { id, name } = props.datos;

  const [companyName, setCompanyName] = useState({});

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
    <li
      key={id}
      className="flex items-center justify-between my-3 p-3 border-2 border-slate-200 rounded-md hover:bg-slate-100 shadow duration-300"
    >
      <Link
        to={`/companies/${id}`}
        className="text-blue-500 font-semibold text-lg hover:text-blue-800 duration-300"
      >
        {companyName[id] || name}
      </Link>
      <div className="flex items-center gap-3">
        <button
          className="px-4 py-1 border-2 rounded-md bg-blue-500 hover:bg-blue-700 duration-300 cursor-pointer"
          onClick={() => information(props.datos)}
        >
          <IoMdInformationCircle className="text-white" />
        </button>
        <button
          className="px-4 py-1 border-2 rounded-md bg-blue-500 hover:bg-blue-700 duration-300 cursor-pointer"
          onClick={() => edit(id, name)}
        >
          <MdOutlineEdit className="text-white" />
        </button>
      </div>
    </li>
  );
};

export default CompanyItem;
