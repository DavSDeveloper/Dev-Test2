import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";

const CompanyItem = (props) => {
  const { id, name, created, importedFilesCount } = props.datos;

  const [companyName, setCompanyName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBlur = (e) => {
    setIsEditing(false);
    setCompanyName(e.target.value);
  };

  // TODO - Form to edit the company name, calling this function
  // const edit = (id, currentName) => {
  //   const newName = prompt("Enter the new name of the company", currentName);
  //   if (newName) {
  //     setCompanyName((prev) => ({
  //       ...prev,
  //       [id]: newName,
  //     }));
  //   }
  // };

  return (
    <li
      key={id}
      className="flex items-center justify-between my-3 p-3 border-2 border-slate-200 rounded-md hover:bg-slate-100 shadow duration-300"
    >
      {/**
       * TODO - Add a Link component to navigate to the company details page.
       */}
      {/* <Link
        to={`/companies/${id}`}
        className="text-blue-500 font-semibold text-lg hover:text-blue-800 duration-300"
      >
        {companyName[id] || name}
      </Link> */}
      {isEditing ? (
        <input
          type="text"
          defaultValue={companyName}
          onBlur={handleBlur}
          className="border-transparent bg-transparent focus:outline-none text-blue-500 font-semibold text-lg"
          autoFocus
        />
      ) : (
        <Link
          to={`/companies/${id}`}
          className="text-blue-500 font-semibold text-lg hover:text-blue-800 duration-300"
        >
          {companyName}
        </Link>
      )}
      <div className="flex items-center gap-3">
        <p className="flex items-center w-60 pr-3 text-slate-500">
          <IoTime className="mr-3 text-blue-500 text-lg" />
          {new Date(created).toLocaleString("es-CO", {
            timeZone: "America/Bogota",
          })}
        </p>
        <p className="flex items-center w-28 pr-3 text-slate-500">
          <FaFileUpload className="mr-3 text-blue-500 text-lg" />
          {importedFilesCount}
        </p>
        <button
          className="px-4 py-1 border-2 rounded-md bg-blue-500 hover:bg-blue-700 duration-300 cursor-pointer"
          onClick={() => handleEdit()}
        >
          <MdOutlineEdit className="text-white" />
        </button>
      </div>
    </li>
  );
};

export default CompanyItem;
