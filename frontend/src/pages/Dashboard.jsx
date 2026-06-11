import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { uploadDocument } from "../api/documentApi.js";
const Dashboard = () => {
  const navigate = useNavigate();           
const [selectedFile, setSelectedFile] =
  useState(null);

const handleFileChange = (e) => {
  setSelectedFile(
    e.target.files[0]
  );
};

const handleUpload = async () => {
  if (!selectedFile) {
    alert("Select PDF First");
    return;
  }

  try {
    const token =
      localStorage.getItem("token");

    const response =
      await uploadDocument(
        selectedFile,
        token
      );

    console.log(response.data);

    alert(
      "Document Uploaded Successfully"
    );
  } catch (error) {
    console.log(error);

    alert("Upload Failed");
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          Document Signature App
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-2">
          Welcome 👋
        </h2>

        <p className="text-gray-600 mb-8">
          Manage your documents and signatures here.
        </p>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">
              Documents
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              0
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">
              Pending
            </h3>
            <p className="text-3xl font-bold text-yellow-500">
              0
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">
              Signed
            </h3>
            <p className="text-3xl font-bold text-green-600">
              0
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">
            Quick Actions
          </h3>

          <div className="space-y-4">
  <input
    type="file"
    accept=".pdf"
    onChange={handleFileChange}
    className="block"
  />

  <button
    onClick={handleUpload}
    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
  >
    Upload PDF
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;