import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";
import Tooltip from "../Tooltip/Tooltip";

const CompanyItem = ({ datos, setCompanies }) => {
  const { id, name, created, importedFilesCount } = datos.node;

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBlur = (e) => {
    setIsEditing(false);
    setCompanies((prev) =>
      prev.map((company) =>
        company.node.id === id
          ? {
              ...company,
              node: {
                ...company.node,
                name: e.target.value,
              },
            }
          : company
      )
    );
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
  
    const day = date.getDate();
    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    let hour = date.getHours();
    let minute = date.getMinutes();
    const period = hour >= 12 ? "pm" : "am";
  
    hour = hour % 12;
    if (hour === 0) hour = 12;
  
    minute = minute < 10 ? "0" + minute : minute;
  
    return `${month} ${day} del ${year} a las ${hour}:${minute} ${period}`;
  };  
  
  const formattedDate = formatDate(created);

  return (
    <li className="flex flex-wrap items-center justify-between my-3 p-3 border-2 border-slate-200 rounded-md hover:bg-slate-100 shadow duration-300">
      {isEditing ? (
        <input
          type="text"
          defaultValue={name}
          onBlur={handleBlur}
          className="border-transparent bg-transparent focus:outline-none text-blue-500 font-semibold text-lg"
          autoFocus
        />
      ) : (
        <Link
          to={`/companies/${id}`}
          className="text-blue-500 font-semibold text-lg hover:text-blue-800 duration-300"
        >
          {name}
        </Link>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <p className="flex items-center w-60 pr-3 text-slate-500">
          <Tooltip text={"Fecha de creación"} position={"top"}>
            <IoTime className="mr-3 text-blue-500 text-xl" />
          </Tooltip>
          {formattedDate}
        </p>
        <p className="flex items-center w-28 pr-3 text-slate-500">
          <Tooltip text={"Número de archivos importados"} position={"top"}>
            <FaFileUpload className="mr-3 text-blue-500 text-xl" />
          </Tooltip>
          {importedFilesCount}
        </p>
        <button
          className="px-4 py-1 border-2 rounded-md bg-blue-500 hover:bg-blue-700 duration-300 cursor-pointer"
          onClick={handleEdit}
        >
          <MdOutlineEdit className="text-white" />
        </button>
      </div>
    </li>
  );
};

export default CompanyItem;
