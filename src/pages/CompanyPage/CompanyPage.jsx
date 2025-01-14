import { useParams } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import Header from "../../components/Header/Header";

const CompanyPage = () => {
  const { companyId } = useParams();

  const [file, setFile] = useState(null);

  // TODO - In the state set null when there is no CORS blocking
  const [analysisResult, setAnalysisResult] = useState({
    category: "ELECTRONIC_INVOICE",
    data: {
      calculated_total: 59999.8,
      due_date: "2024-12-09",
      extracted_total: 60000.0,
      gross_amount: 50420.0,
      issued_at: "2024-12-09T05:00:00+00:00",
      lines: [
        {
          name: "8145435F DISCO CORNETA C/FINO METAL 4½*0.045*7/8",
          price: 1260.5,
          quantity: 40.0,
          tax: {
            amount: 9579.8,
            name: "IVA",
            percent: 19.0,
          },
        },
      ],
      supplier: {
        name: "SEGAR S.A",
        address: "CRA.27 No.66-30 C.C.SANCANCIO LOC.802, Bogotá, D.c.",
        email: "segarferreteria@yahoo.es",
        phone: "8871779",
      },
      total: 60000.0,
      taxes_total: 9579.8,
      due_date: "2024-12-09",
      total_does_match: true,
    },
    success: true,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file to upload.");

    // TODO - Remove this line when there is no CORS blocking
    setModalOpen(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tenant_id", companyId);

      const uploadResponse = await fetch(import.meta.env.VITE_UPLOADER_URL, {
        method: "POST",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      const analyzeResponse = await fetch(import.meta.env.VITE_DOCUMENTOR_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file: uploadData.url, qr: false }),
      });

      const analyzeData = await analyzeResponse.json();
      setAnalysisResult(analyzeData);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
      alert("An error occurred while uploading or analyzing the file.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center max-w-4xl my-0 mx-auto p-5">
        <h1 className="py-9 text-center text-2xl font-bold text-blue-500">
          Company Details
        </h1>
        <p className="text-blue-500 font-semibold text-lg">
          Company ID:{" "}
          <span className="text-slate-900 font-normal text-lg">
            {companyId}
          </span>
        </p>
        <div className="flex flex-col items-center my-4 mx-0">
          <input
            className="w-11/12 p-2 mb-4 text-base text-slate-900 bg-slate-100 hover:bg-slate-200 focus:ring-2 focus:ring-slate-300 rounded-lg border-2 border-blue-400 shadow-sm duration-300 cursor-pointer"
            type="file"
            onChange={handleFileChange}
          />
          <button
            onClick={handleUpload}
            className="py-2 px-5 bg-blue-500 text-white rounded-md cursor-pointer text-base hover:bg-blue-700 duration-300"
          >
            Upload and Analyze
          </button>
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <h2 className="text-blue-500 text-xl font-semibold">Analysis Result</h2>

          <section className="mb-5">
            <h3 className="text-2xl mb-2 text-blue-600">Supplier Information</h3>
            <p className="text-base text-slate-700 my-1 mx-0">
              <strong className="font-bold">Name:</strong>{" "}
              {analysisResult.data.supplier.name}
            </p>
            <p className="text-base text-slate-700 my-1 mx-0">
              <strong className="font-bold">Address:</strong>{" "}
              {analysisResult.data.supplier.address}
            </p>
            <p className="text-base text-slate-700 my-1 mx-0">
              <strong className="font-bold">Email:</strong>{" "}
              {analysisResult.data.supplier.email}
            </p>
            <p className="text-base text-slate-700 my-1 mx-0">
              <strong className="font-bold">Phone:</strong>{" "}
              {analysisResult.data.supplier.phone}
            </p>
          </section>

          <section className="mb-5">
            <h3 className="text-2xl mb-2 text-blue-600">Invoice Summary</h3>
            <p className="text-base text-slate-700 my-1 mx-0">
              <strong className="font-bold">Calculated Total:</strong> $
              {analysisResult.data.calculated_total.toFixed(2)}
            </p>
            <p className="text-base text-slate-700 my-1 mx-0">
              <strong className="font-bold">Extracted Total:</strong> $
              {analysisResult.data.extracted_total.toFixed(2)}
            </p>
            <p className="text-base text-slate-700 my-1 mx-0">
              <strong className="font-bold">Gross Amount:</strong> $
              {analysisResult.data.gross_amount.toFixed(2)}
            </p>
            <p className="text-base text-slate-700 my-1 mx-0">
              <strong className="font-bold">
                Tax Amount ({analysisResult.data.lines[0].tax.name}):
              </strong>{" "}
              ${analysisResult.data.taxes_total.toFixed(2)}
            </p>
            <p className="text-base text-slate-700 my-1 mx-0">
              <strong className="font-bold">Total Due:</strong> $
              {analysisResult.data.total.toFixed(2)}
            </p>
          </section>

          <section className="mb-5">
            <h3 className="text-2xl mb-2 text-blue-600">Due Date</h3>
            <p className="text-base text-slate-700 my-1 mx-0">
              {new Date(analysisResult.data.due_date).toLocaleDateString()}
            </p>
          </section>

          <section className="mb-5">
            <h3 className="text-2xl mb-2 text-blue-600">Items</h3>
            <table className="w-full border-collapse mt-5">
              <thead>
                <tr>
                  <th className="p-2 text-left border-2 border-slate-200">Name</th>
                  <th className="p-2 text-left border-2 border-slate-200">Unit Price</th>
                  <th className="p-2 text-left border-2 border-slate-200">Quantity</th>
                  <th className="p-2 text-left border-2 border-slate-200">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {analysisResult.data.lines.map((line, index) => (
                  <tr key={index}>
                    <td className="p-2 text-left border-2 border-slate-200 text-base">
                      {line.name}
                    </td>
                    <td className="p-2 text-left border-2 border-slate-200 text-base">
                      ${line.price.toFixed(2)}
                    </td>
                    <td className="p-2 text-left border-2 border-slate-200 text-base">
                      {line.quantity}
                    </td>
                    <td className="p-2 text-left border-2 border-slate-200 text-base">
                      ${(line.price * line.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </Modal>
      </div>
    </>
  );
};

export default CompanyPage;
