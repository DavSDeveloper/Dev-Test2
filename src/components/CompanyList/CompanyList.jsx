import { Link } from 'react-router-dom';

const CompanyList = ({ companies }) => {
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

  return (
    <>
      <h1 className="w-full py-9 text-center text-2xl font-bold text-blue-500 border-2 border-slate-200">
        Companies
      </h1>
      <ul className="list-none p-0 my-5 mx-10">
        {companies.map((company) => (
          <li
            key={company.id}
            className="my-3 p-3 border-2 border-slate-200 rounded-md hover:bg-slate-100 shadow duration-300"
          >
            <Link
              to={`/companies/${company.id}`}
              className="text-blue-500 font-semibold text-lg hover:text-blue-800 duration-300"
            >
              {company.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CompanyList;
