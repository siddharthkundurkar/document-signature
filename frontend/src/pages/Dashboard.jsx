import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  uploadDocument,
  getDocuments,
} from "../api/documentApi";

import {
  getStats,
} from "../api/dashboardApi";

const Dashboard = () => {
  const navigate =
    useNavigate();

  const [selectedFile,
    setSelectedFile] =
    useState(null);

  const [documents,
    setDocuments] =
    useState([]);

  const [activities,
    setActivities] =
    useState([]);

  const [stats,
    setStats] =
    useState({
      totalDocs: 0,
      pendingDocs: 0,
      completedDocs: 0,
      rejectedDocs: 0,
      completionRate: 0,
    });

  useEffect(() => {
    fetchDocuments();
    fetchStats();
  }, []);

  const fetchDocuments =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await getDocuments(
            token
          );

        setDocuments(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const fetchStats =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );
const response =
  await getStats(token);

console.log(
  "STATS RESPONSE:",
  response.data
);

setStats(response.data);
        

        setStats(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleFileChange =
    (e) => {
      setSelectedFile(
        e.target.files[0]
      );
    };

  const handleUpload =
    async () => {
      if (!selectedFile) {
        alert(
          "Select PDF First"
        );
        return;
      }

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await uploadDocument(
          selectedFile,
          token
        );

        alert(
          "Document Uploaded Successfully"
        );

        setSelectedFile(
          null
        );

        fetchDocuments();
        fetchStats();
      } catch (error) {
        console.log(error);

        alert(
          "Upload Failed"
        );
      }
    };

  const handleLogout =
    () => {
      localStorage.removeItem(
        "token"
      );

      navigate(
        "/login"
      );
    };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          Document Signature App
        </h1>

        <button
          onClick={
            handleLogout
          }
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
        <div className="grid md:grid-cols-5 gap-6">

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">
              Total Documents
            </h3>

            <p className="text-3xl font-bold text-blue-600">
              {stats.totalDocs}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">
              Pending
            </h3>

            <p className="text-3xl font-bold text-yellow-500">
              {stats.pendingDocs}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">
              Completed
            </h3>

            <p className="text-3xl font-bold text-green-600">
              {stats.completedDocs}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">
              Rejected
            </h3>

            <p className="text-3xl font-bold text-red-600">
              {stats.rejectedDocs}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">
              Completion Rate
            </h3>

            <p className="text-3xl font-bold text-purple-600">
              {stats.completionRate}%
            </p>
          </div>

        </div>

        {/* Upload Section */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow">

          <h3 className="text-xl font-semibold mb-4">
            Quick Actions
          </h3>

          <div className="space-y-4">

            <input
              type="file"
              accept=".pdf"
              onChange={
                handleFileChange
              }
              className="block"
            />

            <button
              onClick={
                handleUpload
              }
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Upload PDF
            </button>

          </div>

        </div>

        {/* Documents */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow">

          <h3 className="text-xl font-semibold mb-4">
            My Documents
          </h3>

          {documents.length === 0 ? (
            <p className="text-gray-500">
              No documents uploaded yet.
            </p>
          ) : (
            <div className="space-y-4">

              {documents.map(
                (doc) => (
                  <div
                    key={doc.id}
                    className="border p-4 rounded flex justify-between items-center"
                  >
                    <div>

                      <div className="flex items-center gap-3">

                        <h4 className="font-semibold">
                          {doc.file_name}
                        </h4>

                        <span
                          className={`px-2 py-1 text-xs rounded-full
                          ${
                            doc.status ===
                            "Completed"
                              ? "bg-green-100 text-green-700"
                              : doc.status ===
                                "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {doc.status ||
                            "Pending"}
                        </span>

                      </div>

                      <p className="text-sm text-gray-500">
                        {new Date(
                          doc.created_at
                        ).toLocaleDateString()}
                      </p>

                    </div>

                    <div className="flex gap-2">

                      <a
                        href={
                          doc.file_url
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        View PDF
                      </a>

                      <button
                        onClick={() =>
                          navigate(
                            `/document/${doc.id}`
                          )
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded"
                      >
                        Add Signature
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

        {/* Recent Activity */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow">

          <h3 className="text-xl font-semibold mb-4">
            Recent Activity
          </h3>

          {activities.length === 0 ? (
            <p className="text-gray-500">
              No recent activity.
            </p>
          ) : (
            <div className="space-y-3">

              {activities.map(
                (item) => (
                  <div
                    key={item.id}
                    className="border-b pb-3"
                  >
                    <p className="font-medium">
                      {item.action}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.actor_email}
                    </p>

                    <p className="text-xs text-gray-400">
                      {new Date(
                        item.created_at
                      ).toLocaleString()}
                    </p>
                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Dashboard;