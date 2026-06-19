import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-3xl font-bold text-blue-700">
          SignFlow
        </h1>

        <Link
          to="/login"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-10 py-20 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h1 className="text-6xl font-bold text-gray-900 leading-tight">
            Secure Digital
            <span className="text-blue-600">
              {" "}Document Signing
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Upload PDFs, place signatures,
            invite signers, track status,
            generate signed documents,
            and maintain complete audit trails.
          </p>

          <div className="flex gap-4 mt-8">

            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Login
            </Link>

          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200"
            alt="Document Signing"
            className="rounded-2xl shadow-2xl"
          />
        </div>

      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-10 py-20">

        <h2 className="text-4xl font-bold text-center mb-14">
          Key Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-xl shadow">
            <div className="text-5xl mb-4">
              📄
            </div>

            <h3 className="text-xl font-bold mb-3">
              PDF Upload
            </h3>

            <p className="text-gray-600">
              Upload and manage documents
              securely in the cloud.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <div className="text-5xl mb-4">
              ✍
            </div>

            <h3 className="text-xl font-bold mb-3">
              Digital Signatures
            </h3>

            <p className="text-gray-600">
              Draw, save, reuse and place
              signatures anywhere in the PDF.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <div className="text-5xl mb-4">
              👥
            </div>

            <h3 className="text-xl font-bold mb-3">
              Invite Signers
            </h3>

            <p className="text-gray-600">
              Send signing requests and
              collaborate with multiple signers.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <div className="text-5xl mb-4">
              📊
            </div>

            <h3 className="text-xl font-bold mb-3">
              Status Tracking
            </h3>

            <p className="text-gray-600">
              Track Pending, Signed and
              Rejected documents in real-time.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <div className="text-5xl mb-4">
              🔒
            </div>

            <h3 className="text-xl font-bold mb-3">
              Audit Trail
            </h3>

            <p className="text-gray-600">
              Monitor every document action
              with timestamps and activity logs.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <div className="text-5xl mb-4">
              📑
            </div>

            <h3 className="text-xl font-bold mb-3">
              Signed PDF Generation
            </h3>

            <p className="text-gray-600">
              Generate final signed PDFs
              ready for download and sharing.
            </p>
          </div>

        </div>

      </section>

      {/* About Project */}
      <section className="bg-white py-20">

        <div className="max-w-5xl mx-auto px-10 text-center">

          <h2 className="text-4xl font-bold mb-8">
            About This Project
          </h2>

          <p className="text-lg text-gray-600 leading-8">
            SignFlow is a full-stack digital
            document signing platform inspired
            by DocuSign and Adobe Sign.
            It allows users to upload PDF
            documents, add signatures,
            save reusable signatures,
            invite signers, track document
            status, generate signed PDFs,
            and maintain complete audit trails.
          </p>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>
          © 2026 SignFlow • Secure Digital
          Document Signature Platform
        </p>
      </footer>

    </div>
  );
}

export default Home;